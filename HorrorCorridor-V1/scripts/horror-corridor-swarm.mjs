#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const HARNESS_ROOT = resolve(APP_ROOT, "HorrorCorridor-Harness");
const CONFIG_PATH = resolve(HARNESS_ROOT, "swarm.config.json");
const REQUEST_SCHEMA_PATH = resolve(HARNESS_ROOT, "schemas", "swarm-request.schema.json");
const WORKER_SCHEMA_PATH = resolve(HARNESS_ROOT, "schemas", "worker-result.schema.json");
const WORKER_PROMPT_PATH = resolve(HARNESS_ROOT, "prompts", "luna-worker.md");
const TERMINAL_TASK_STATES = new Set(["integration_ready", "hold", "rejected", "blocked"]);
const SUCCESS_TASK_STATE = "integration_ready";
const SAFE_VALIDATION_COMMANDS = new Set([
  JSON.stringify(["npx", "tsc", "--noEmit"]),
  JSON.stringify(["npm", "run", "lint"]),
  JSON.stringify(["npm", "run", "build"]),
  JSON.stringify(["npm", "run", "smoke:protokits"]),
  JSON.stringify(["node", "--version"]),
]);
const REQUIRED_LIVE_INTEGRATION_COMMANDS = [
  ["npx", "tsc", "--noEmit"],
  ["npm", "run", "lint"],
  ["npm", "run", "build"],
  ["npm", "run", "smoke:protokits"],
];
const SAFE_ALLOWED_PATH = /^(?:src|public|testing\/object-kits)\/[A-Za-z0-9._/-]+(?:\/\*\*)?$/;

function nowIso() {
  return new Date().toISOString();
}

function normalizePath(value) {
  return value.split(sep).join("/").replace(/^\.\//, "");
}

function expandHome(value) {
  return value === "~" ? homedir() : value.startsWith("~/") ? resolve(homedir(), value.slice(2)) : resolve(value);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeText(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  const temporary = `${path}.tmp-${process.pid}-${randomUUID()}`;
  writeFileSync(temporary, value, "utf8");
  renameSync(temporary, path);
}

function writeJson(path, value) {
  writeText(path, `${JSON.stringify(value, null, 2)}\n`);
}

function appendJsonl(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(value)}\n`, "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function fileSha256(path) {
  return sha256(readFileSync(path));
}

function slug(value, label = "id") {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{1,80}$/.test(normalized)) {
    throw new Error(`${label} must use lowercase letters, numbers, and hyphens.`);
  }
  return normalized;
}

function commandText(command) {
  return command.map((part) => (/^[A-Za-z0-9_./:@=-]+$/.test(part) ? part : JSON.stringify(part))).join(" ");
}

function parseOptions(argv) {
  const positional = [];
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) {
      positional.push(value);
      continue;
    }
    const key = value.slice(2);
    if (["execute", "keep-self-test"].includes(key)) {
      options[key] = true;
      continue;
    }
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) throw new Error(`Missing value for --${key}.`);
    options[key] = next;
    index += 1;
  }
  return { options, positional };
}

function assertOnlyKeys(value, allowed, label) {
  for (const key of Object.keys(value ?? {})) {
    if (!allowed.includes(key)) throw new Error(`${label} has unsupported field ${key}.`);
  }
}

function assertBoundedInteger(value, minimum, maximum, label) {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(`${label} must be an integer from ${minimum} to ${maximum}.`);
  }
}

function validateConfiguration(config) {
  if (!config || typeof config !== "object") throw new Error("Swarm config must be an object.");
  if (config.schemaVersion !== "horror-corridor.swarm-config.v1") throw new Error("Unsupported swarm config schemaVersion.");
  if (!config.provider || config.provider.model !== "gpt-5.6-luna") throw new Error("Swarm config must pin gpt-5.6-luna.");
  if (!['low', 'medium', 'high', 'xhigh', 'max'].includes(config.provider.reasoning)) throw new Error("Swarm config has invalid reasoning.");
  if (config.provider.sandbox !== "workspace-write") throw new Error("Swarm workers must use workspace-write sandboxing.");
  assertBoundedInteger(config.provider.timeoutMs, 60000, 7200000, "provider.timeoutMs");
  assertBoundedInteger(config.controls.taskConcurrency, 1, 64, "controls.taskConcurrency");
  assertBoundedInteger(config.controls.maxActivePredictions, 1, 32, "controls.maxActivePredictions");
  assertBoundedInteger(config.controls.validationConcurrency, 1, 16, "controls.validationConcurrency");
  assertBoundedInteger(config.controls.maxContextTokens, 1000, 100000, "controls.maxContextTokens");
  assertBoundedInteger(config.controls.shardCount, 1, 128, "controls.shardCount");
  assertBoundedInteger(config.controls.runTimeoutMs, 60000, 86400000, "controls.runTimeoutMs");
  if (config.controls.maxActivePredictions > config.controls.taskConcurrency) throw new Error("maxActivePredictions cannot exceed taskConcurrency.");
  if (!config.paths?.runRoot || !config.paths?.worktreeRoot) throw new Error("Swarm config paths are required.");
  if (config.policy?.maxAttempts !== 1 || config.policy?.unknownMutationOutcome !== "hold") {
    throw new Error("Mutation retry policy must remain one attempt with unknown outcomes held.");
  }
  return config;
}

function sanitizedEnvironment(source = process.env) {
  const allowed = ["HOME", "USER", "LOGNAME", "PATH", "SHELL", "TMPDIR", "LANG", "LC_ALL", "TERM", "COLORTERM"];
  const environment = Object.fromEntries(allowed.flatMap((key) => (source[key] ? [[key, source[key]]] : [])));
  return {
    ...environment,
    GIT_TERMINAL_PROMPT: "0",
    GCM_INTERACTIVE: "Never",
    GIT_ASKPASS: "/usr/bin/false",
    SSH_ASKPASS: "/usr/bin/false",
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: "credential.helper",
    GIT_CONFIG_VALUE_0: "",
    GIT_SSH_COMMAND: "ssh -F /dev/null -o BatchMode=yes -o IdentitiesOnly=yes -o IdentityFile=/dev/null",
  };
}

function runProcess(command, args, { cwd, input = "", timeoutMs = 120000, env = process.env } = {}) {
  return new Promise((resolvePromise) => {
    const startedAt = Date.now();
    const child = spawn(command, args, { cwd, env, shell: false, stdio: ["pipe", "pipe", "pipe"] });
    const stdout = [];
    const stderr = [];
    let timedOut = false;
    let settled = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 5000).unref();
    }, timeoutMs);

    child.stdout.on("data", (chunk) => stdout.push(chunk));
    child.stderr.on("data", (chunk) => stderr.push(chunk));
    child.on("error", (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolvePromise({
        command: commandText([command, ...args]),
        durationMs: Date.now() - startedAt,
        error: error.message,
        exitCode: null,
        signal: null,
        stderr: Buffer.concat(stderr).toString("utf8"),
        stdout: Buffer.concat(stdout).toString("utf8"),
        timedOut,
      });
    });
    child.on("close", (exitCode, signal) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolvePromise({
        command: commandText([command, ...args]),
        durationMs: Date.now() - startedAt,
        error: null,
        exitCode,
        signal,
        stderr: Buffer.concat(stderr).toString("utf8"),
        stdout: Buffer.concat(stdout).toString("utf8"),
        timedOut,
      });
    });
    child.stdin.end(input);
  });
}

async function runChecked(command, args, options = {}) {
  const result = await runProcess(command, args, options);
  if (result.exitCode !== 0) {
    const detail = result.stderr.trim() || result.stdout.trim() || result.error || `exit ${result.exitCode}`;
    throw new Error(`${result.command} failed: ${detail}`);
  }
  return result;
}

async function git(args, cwd, timeoutMs = 120000) {
  return runChecked("git", args, { cwd, timeoutMs, env: sanitizedEnvironment() });
}

class Semaphore {
  constructor(limit) {
    this.limit = limit;
    this.active = 0;
    this.waiters = [];
  }

  async acquire() {
    if (this.active < this.limit) {
      this.active += 1;
      return;
    }
    await new Promise((resolveWaiter) => this.waiters.push(resolveWaiter));
    this.active += 1;
  }

  release() {
    this.active -= 1;
    this.waiters.shift()?.();
  }

  async use(callback) {
    await this.acquire();
    try {
      return await callback();
    } finally {
      this.release();
    }
  }
}

function mergeConfiguration(base, request) {
  const controls = { ...base.controls, ...(request.controls ?? {}) };
  return validateConfiguration({ ...base, controls });
}

function validateCommand(command, label) {
  if (!Array.isArray(command) || command.length === 0 || command.some((part) => typeof part !== "string" || !part)) {
    throw new Error(`${label} must be a non-empty array of command arguments.`);
  }
  if (!SAFE_VALIDATION_COMMANDS.has(JSON.stringify(command))) {
    throw new Error(`${label} is not an allowlisted repo validation command: ${commandText(command)}`);
  }
}

function staticPatternPrefix(pattern) {
  return normalizePath(pattern).split(/[*?[]/, 1)[0].replace(/\/$/, "");
}

function patternsOverlap(left, right) {
  const leftPrefix = staticPatternPrefix(left);
  const rightPrefix = staticPatternPrefix(right);
  return leftPrefix === rightPrefix || leftPrefix.startsWith(`${rightPrefix}/`) || rightPrefix.startsWith(`${leftPrefix}/`);
}

function dependencyClosure(taskId, taskById, seen = new Set()) {
  for (const dependency of taskById.get(taskId).dependsOn) {
    if (seen.has(dependency)) continue;
    seen.add(dependency);
    dependencyClosure(dependency, taskById, seen);
  }
  return seen;
}

function validateRequest(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Request must be a JSON object.");
  assertOnlyKeys(raw, ["schemaVersion", "runId", "goal", "controls", "integrationValidation", "tasks"], "Request");
  if (raw.schemaVersion !== "horror-corridor.swarm-request.v1") throw new Error("Unsupported request schemaVersion.");
  if (typeof raw.goal !== "string" || raw.goal.trim().length < 10) throw new Error("Request goal is too short.");
  if (!Array.isArray(raw.tasks) || raw.tasks.length === 0 || raw.tasks.length > 256) {
    throw new Error("Request tasks must contain 1 to 256 tasks.");
  }
  if (raw.runId !== undefined) slug(raw.runId, "runId");
  if (raw.controls !== undefined) {
    if (!raw.controls || typeof raw.controls !== "object" || Array.isArray(raw.controls)) throw new Error("Request controls must be an object.");
    assertOnlyKeys(raw.controls, ["taskConcurrency", "maxActivePredictions", "validationConcurrency", "maxContextTokens", "shardCount", "runTimeoutMs"], "Request controls");
    const bounds = {
      taskConcurrency: [1, 64],
      maxActivePredictions: [1, 32],
      validationConcurrency: [1, 16],
      maxContextTokens: [1000, 100000],
      shardCount: [1, 128],
      runTimeoutMs: [60000, 86400000],
    };
    for (const [key, value] of Object.entries(raw.controls)) assertBoundedInteger(value, bounds[key][0], bounds[key][1], `controls.${key}`);
  }
  const taskIds = new Set();
  const tasks = raw.tasks.map((task, index) => {
    if (!task || typeof task !== "object" || Array.isArray(task)) throw new Error(`tasks[${index}] must be an object.`);
    assertOnlyKeys(task, ["id", "title", "request", "priority", "dependsOn", "allowedPaths", "validation"], `Task ${index}`);
    const id = slug(task.id, `tasks[${index}].id`);
    if (taskIds.has(id)) throw new Error(`Duplicate task id: ${id}`);
    taskIds.add(id);
    if (typeof task.title !== "string" || task.title.trim().length < 3) throw new Error(`Task ${id} needs a title.`);
    if (typeof task.request !== "string" || task.request.trim().length < 10) throw new Error(`Task ${id} needs a concrete request.`);
    if (!Array.isArray(task.allowedPaths) || task.allowedPaths.length === 0) throw new Error(`Task ${id} needs allowedPaths.`);
    const allowedPaths = task.allowedPaths.map((path) => {
      if (typeof path !== "string" || path.startsWith("/") || path.split("/").includes("..")) {
        throw new Error(`Task ${id} has unsafe allowed path: ${path}`);
      }
      const normalized = normalizePath(path);
      if (!SAFE_ALLOWED_PATH.test(normalized) || normalized.includes("//") || normalized.includes("***")) {
        throw new Error(`Task ${id} allowed path must be an exact file or trailing /** scope under src/, public/, or testing/object-kits/: ${path}`);
      }
      if (normalized.split("/").includes("runs")) throw new Error(`Task ${id} cannot grant tracked proof run paths: ${path}`);
      return normalized;
    });
    if (!Array.isArray(task.validation) || task.validation.length === 0) throw new Error(`Task ${id} needs validation commands.`);
    task.validation.forEach((command, commandIndex) => validateCommand(command, `Task ${id} validation[${commandIndex}]`));
    if (task.priority !== undefined) assertBoundedInteger(task.priority, 0, 100, `Task ${id} priority`);
    if (task.dependsOn !== undefined && (!Array.isArray(task.dependsOn) || task.dependsOn.some((value) => typeof value !== "string"))) {
      throw new Error(`Task ${id} dependsOn must be an array of task ids.`);
    }
    return {
      id,
      title: task.title.trim(),
      request: task.request.trim(),
      priority: Number.isInteger(task.priority) ? task.priority : 50,
      dependsOn: [...(task.dependsOn ?? [])],
      allowedPaths,
      validation: task.validation.map((command) => [...command]),
    };
  });
  const taskById = new Map(tasks.map((task) => [task.id, task]));
  for (const task of tasks) {
    for (const dependency of task.dependsOn) {
      if (!taskById.has(dependency)) throw new Error(`Task ${task.id} has unknown dependency ${dependency}.`);
      if (dependency === task.id) throw new Error(`Task ${task.id} cannot depend on itself.`);
    }
  }
  const visiting = new Set();
  const visited = new Set();
  const visit = (taskId) => {
    if (visiting.has(taskId)) throw new Error(`Dependency cycle detected at ${taskId}.`);
    if (visited.has(taskId)) return;
    visiting.add(taskId);
    for (const dependency of taskById.get(taskId).dependsOn) visit(dependency);
    visiting.delete(taskId);
    visited.add(taskId);
  };
  tasks.forEach((task) => visit(task.id));
  for (let leftIndex = 0; leftIndex < tasks.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < tasks.length; rightIndex += 1) {
      const left = tasks[leftIndex];
      const right = tasks[rightIndex];
      const ordered = dependencyClosure(left.id, taskById).has(right.id) || dependencyClosure(right.id, taskById).has(left.id);
      if (ordered) continue;
      const overlap = left.allowedPaths.some((leftPath) => right.allowedPaths.some((rightPath) => patternsOverlap(leftPath, rightPath)));
      if (overlap) throw new Error(`Independent tasks ${left.id} and ${right.id} have overlapping allowedPaths; narrow them or add a dependency.`);
    }
  }
  const integrationValidation = raw.integrationValidation ?? [];
  if (!Array.isArray(integrationValidation) || integrationValidation.length === 0) {
    throw new Error("Request needs at least one integrationValidation command.");
  }
  integrationValidation.forEach((command, index) => validateCommand(command, `integrationValidation[${index}]`));
  return {
    schemaVersion: raw.schemaVersion,
    runId: raw.runId,
    goal: raw.goal.trim(),
    controls: raw.controls ?? {},
    tasks,
    integrationValidation: integrationValidation.map((command) => [...command]),
  };
}

function validateLiveRequest(request) {
  const integrationCommands = new Set(request.integrationValidation.map((command) => JSON.stringify(command)));
  for (const required of REQUIRED_LIVE_INTEGRATION_COMMANDS) {
    if (!integrationCommands.has(JSON.stringify(required))) {
      throw new Error(`Live integrationValidation must include: ${commandText(required)}`);
    }
  }
  for (const task of request.tasks) {
    if (task.validation.some((command) => command[0] === "node")) {
      throw new Error(`Task ${task.id} uses the mock-only Node version probe; live tasks require repo-native validation.`);
    }
  }
}

function renderPrompt(template, values) {
  return template.replace(/{{([A-Z0-9_]+)}}/g, (_match, name) => {
    if (!(name in values)) throw new Error(`Missing prompt variable ${name}.`);
    return String(values[name]);
  });
}

function taskPrompt(request, task, dependencyResults = []) {
  const template = readFileSync(WORKER_PROMPT_PATH, "utf8");
  return renderPrompt(template, {
    GOAL: request.goal,
    TASK_ID: task.id,
    TASK_TITLE: task.title,
    TASK_REQUEST: task.request,
    DEPENDENCY_EVIDENCE: dependencyResults.length
      ? dependencyResults.map((result) => `- ${result.taskId}: ${result.summary} (${result.commit})`).join("\n")
      : "- No task dependencies.",
    ALLOWED_PATHS: task.allowedPaths.map((path) => `\`${path}\``).join(", "),
    VALIDATION_COMMANDS: task.validation.map((command) => `- ${commandText(command)}`).join("\n"),
  });
}

function topologicalTasks(tasks) {
  const taskById = new Map(tasks.map((task) => [task.id, task]));
  const output = [];
  const visited = new Set();
  const visit = (task) => {
    if (visited.has(task.id)) return;
    for (const dependency of task.dependsOn) visit(taskById.get(dependency));
    visited.add(task.id);
    output.push(task);
  };
  [...tasks].sort((left, right) => right.priority - left.priority || left.id.localeCompare(right.id)).forEach(visit);
  return output;
}

function matchesAllowedPath(path, pattern) {
  const normalizedPath = normalizePath(path);
  const normalizedPattern = normalizePath(pattern);
  const escaped = normalizedPattern.replace(/[.+^${}()|\\]/g, "\\$&").replaceAll("**", "§§").replaceAll("*", "[^/]*").replaceAll("§§", ".*").replaceAll("?", ".");
  return new RegExp(`^${escaped}$`).test(normalizedPath);
}

function eventWriter(context) {
  let sequence = context.existingEventCount ?? 0;
  return (input) => {
    sequence += 1;
    const event = {
      runId: context.runId,
      eventId: `event-${String(sequence).padStart(6, "0")}`,
      timestamp: nowIso(),
      layer: input.layer ?? "orchestrator",
      actorId: input.actorId ?? "swarm-orchestrator",
      actionId: input.actionId ?? null,
      decisionId: input.decisionId ?? null,
      attempt: input.attempt ?? 1,
      artifactRefs: input.artifactRefs ?? [],
      type: input.type,
      taskId: input.taskId ?? null,
      detail: input.detail ?? null,
    };
    appendJsonl(resolve(context.runRoot, "events.jsonl"), event);
    appendJsonl(resolve(context.runRoot, "queue.jsonl"), {
      runId: event.runId,
      eventId: event.eventId,
      timestamp: event.timestamp,
      taskId: event.taskId,
      type: event.type,
    });
    const shardKey = input.taskId ?? "orchestrator";
    const shard = Number.parseInt(createHash("sha256").update(shardKey).digest("hex").slice(0, 8), 16) % context.config.controls.shardCount;
    appendJsonl(resolve(context.runRoot, "shards", `events-${String(shard).padStart(3, "0")}.jsonl`), event);
    return event;
  };
}

function workerStatePath(context, taskId) {
  return resolve(context.runRoot, "workers", taskId, "state.json");
}

function readWorkerState(context, taskId) {
  const path = workerStatePath(context, taskId);
  return existsSync(path) ? readJson(path) : { taskId, status: "inbox", attempt: 0 };
}

function writeWorkerState(context, taskId, state) {
  writeJson(workerStatePath(context, taskId), { ...state, taskId, updatedAt: nowIso() });
}

function lockPaths(context, task) {
  return task.allowedPaths.map((path) => {
    const hash = createHash("sha256").update(path).digest("hex").slice(0, 16);
    return resolve(context.runRoot, "locks", `${hash}.lock`);
  });
}

function acquireLocks(context, task) {
  const acquired = [];
  try {
    mkdirSync(resolve(context.runRoot, "locks"), { recursive: true });
    for (const path of lockPaths(context, task)) {
      mkdirSync(path);
      writeJson(resolve(path, "LOCK.json"), { runId: context.runId, taskId: task.id, createdAt: nowIso(), allowedPaths: task.allowedPaths });
      acquired.push(path);
    }
    return acquired;
  } catch (error) {
    for (const path of acquired) rmSync(path, { recursive: true, force: true });
    throw new Error(`Task ${task.id} could not acquire its scope locks: ${error.message}`);
  }
}

function releaseLocks(paths) {
  for (const path of paths) rmSync(path, { recursive: true, force: true });
}

async function changedAppPaths(context, worktreeRoot) {
  const diff = await git(["diff", "--name-only", "HEAD", "--", context.appRelative], worktreeRoot);
  const untracked = await git(["ls-files", "--others", "--exclude-standard", "--", context.appRelative], worktreeRoot);
  const gitPaths = [...diff.stdout.split(/\r?\n/), ...untracked.stdout.split(/\r?\n/)].filter(Boolean);
  return Array.from(new Set(gitPaths)).map((gitPath) => {
    const normalized = normalizePath(gitPath);
    const prefix = `${context.appRelative}/`;
    if (!normalized.startsWith(prefix)) return { appPath: null, gitPath: normalized };
    return { appPath: normalized.slice(prefix.length), gitPath: normalized };
  });
}

function isPathWithin(path, parent) {
  const resolvedPath = resolve(path);
  const resolvedParent = resolve(parent);
  return resolvedPath === resolvedParent || resolvedPath.startsWith(`${resolvedParent}${sep}`);
}

function gitPathToAppPath(context, gitPath) {
  const normalized = normalizePath(gitPath);
  const prefix = `${context.appRelative}/`;
  return normalized.startsWith(prefix) ? normalized.slice(prefix.length) : null;
}

async function verifyResumedWorker(context, task, state) {
  if (!state.commit || !state.branch || !state.validationHash || !state.patchHash) {
    throw new Error(`Worker ${task.id} resume state is missing commit or artifact identity.`);
  }
  const branchHead = (await git(["rev-parse", state.branch], context.repoRoot)).stdout.trim();
  if (branchHead !== state.commit) throw new Error(`Worker ${task.id} branch no longer points at its accepted commit.`);
  await git(["merge-base", "--is-ancestor", context.baseSha, state.commit], context.repoRoot);
  const changed = (await git(["diff-tree", "--no-commit-id", "--name-only", "-r", state.commit], context.repoRoot)).stdout.split(/\r?\n/).filter(Boolean);
  const appPaths = changed.map((path) => gitPathToAppPath(context, path));
  if (appPaths.some((path) => !path || !task.allowedPaths.some((pattern) => matchesAllowedPath(path, pattern)))) {
    throw new Error(`Worker ${task.id} accepted commit no longer satisfies its allowedPaths.`);
  }
  const workerDir = resolve(context.runRoot, "workers", task.id);
  const expectedWorktree = resolve(context.worktreeRunRoot, task.id);
  if (!existsSync(expectedWorktree) || realpathSync(state.worktree) !== realpathSync(expectedWorktree)) {
    throw new Error(`Worker ${task.id} worktree identity changed after acceptance.`);
  }
  const worktreeStatus = (await git(["status", "--porcelain"], expectedWorktree)).stdout.trim();
  if (worktreeStatus) throw new Error(`Worker ${task.id} worktree is no longer clean.`);
  const validationPath = resolve(workerDir, "validation.json");
  const patchPath = resolve(workerDir, "diff.patch");
  if (!existsSync(validationPath) || !existsSync(patchPath)) throw new Error(`Worker ${task.id} accepted artifacts are missing.`);
  if (fileSha256(validationPath) !== state.validationHash || fileSha256(patchPath) !== state.patchHash) {
    throw new Error(`Worker ${task.id} accepted artifacts changed after validation.`);
  }
  const validation = readJson(validationPath);
  if (validation.status !== "passed") throw new Error(`Worker ${task.id} validation artifact is not passing.`);
  const resumeValidation = await runValidationCommands(context, task.validation, resolve(expectedWorktree, context.appRelative), resolve(workerDir, "resume-validation"), "resume");
  if (resumeValidation.status !== "passed") throw new Error(`Worker ${task.id} failed resume revalidation.`);
  return state;
}

async function verifyResumedIntegration(context, integration) {
  if (!integration.commit || !integration.branch || !integration.validationHash) throw new Error("Integration resume state is incomplete.");
  const branchHead = (await git(["rev-parse", integration.branch], context.repoRoot)).stdout.trim();
  if (branchHead !== integration.commit) throw new Error("Integration branch moved after acceptance.");
  await git(["merge-base", "--is-ancestor", context.baseSha, integration.commit], context.repoRoot);
  const expectedWorktree = resolve(context.worktreeRunRoot, context.config.git.integrationBranchSuffix);
  if (!existsSync(expectedWorktree) || realpathSync(integration.worktree) !== realpathSync(expectedWorktree)) {
    throw new Error("Integration worktree identity changed after acceptance.");
  }
  const worktreeStatus = (await git(["status", "--porcelain"], expectedWorktree)).stdout.trim();
  if (worktreeStatus) throw new Error("Integration worktree is no longer clean.");
  const validationPath = resolve(context.runRoot, "integration", "validation.json");
  if (!existsSync(validationPath) || fileSha256(validationPath) !== integration.validationHash) {
    throw new Error("Integration validation artifact is missing or changed.");
  }
  if (readJson(validationPath).status !== "passed") throw new Error("Integration validation artifact is not passing.");
  const resumeValidation = await runValidationCommands(context, context.request.integrationValidation, resolve(expectedWorktree, context.appRelative), resolve(context.runRoot, "integration", "resume-validation"), "resume");
  if (resumeValidation.status !== "passed") throw new Error("Integration branch failed resume revalidation.");
  return integration;
}

function validateWorkerResult(value) {
  if (!value || typeof value !== "object" || !["completed", "blocked"].includes(value.status)) throw new Error("Worker result has invalid status.");
  if (typeof value.summary !== "string" || !value.summary.trim()) throw new Error("Worker result needs a summary.");
  if (!Array.isArray(value.filesChanged) || !Array.isArray(value.validations) || !Array.isArray(value.blockers)) {
    throw new Error("Worker result arrays are malformed.");
  }
  return value;
}

async function runValidationCommands(context, commands, cwd, artifactDir, label) {
  mkdirSync(artifactDir, { recursive: true });
  const results = [];
  for (let index = 0; index < commands.length; index += 1) {
    const command = commands[index];
    const executableCommand = command[0] === "npx" && command[1] === "tsc"
      ? [resolve(cwd, "node_modules", ".bin", "tsc"), ...command.slice(2)]
      : command;
    const result = await context.validationSemaphore.use(() => runProcess(executableCommand[0], executableCommand.slice(1), {
      cwd,
      timeoutMs: context.config.provider.timeoutMs,
      env: sanitizedEnvironment(),
    }));
    const record = {
      command: commandText(command),
      executedCommand: commandText(executableCommand),
      durationMs: result.durationMs,
      exitCode: result.exitCode,
      signal: result.signal,
      timedOut: result.timedOut,
      status: result.exitCode === 0 ? "passed" : "failed",
    };
    writeText(resolve(artifactDir, `${String(index + 1).padStart(2, "0")}-${label}.stdout.log`), result.stdout);
    writeText(resolve(artifactDir, `${String(index + 1).padStart(2, "0")}-${label}.stderr.log`), result.stderr);
    results.push(record);
    if (record.status !== "passed") break;
  }
  return { status: results.length === commands.length && results.every((result) => result.status === "passed") ? "passed" : "failed", results };
}

async function prepareWorktree(context, task, dependencyResults) {
  const worktreeRoot = resolve(context.worktreeRunRoot, task.id);
  const branch = `${context.config.git.workerBranchPrefix}/${context.runId}/${task.id}`;
  if (existsSync(worktreeRoot)) throw new Error(`Worktree path already exists: ${worktreeRoot}`);
  await git(["worktree", "add", "-b", branch, worktreeRoot, context.baseSha], context.repoRoot, 300000);
  for (const dependency of dependencyResults) {
    await git(["cherry-pick", dependency.commit], worktreeRoot, 300000);
  }
  const worktreeAppRoot = resolve(worktreeRoot, context.appRelative);
  linkSharedDependencies(context, worktreeAppRoot);
  return { branch, worktreeAppRoot, worktreeRoot };
}

function linkSharedDependencies(context, worktreeAppRoot) {
  if (context.mock || !context.config.policy.requireSharedDependencies) return;
  const source = resolve(context.appRoot, "node_modules");
  const target = resolve(worktreeAppRoot, "node_modules");
  if (!existsSync(source)) throw new Error("Shared dependencies are missing. Run `npm ci` in HorrorCorridor-V1 before live swarm execution.");
  if (!existsSync(target)) symlinkSync(source, target, "dir");
}

async function invokeLuna(context, task, prompt, workerDir, worktreeAppRoot) {
  const finalPath = resolve(workerDir, "final.json");
  const stdoutPath = resolve(workerDir, "events.jsonl");
  const stderrPath = resolve(workerDir, "stderr.log");
  const binary = context.options.codexPath ?? context.config.provider.binary;
  const args = [
    "-a", "never",
    "--disable", "multi_agent",
    "exec",
    "--ignore-user-config",
    "--sandbox", context.config.provider.sandbox,
    "--ephemeral",
    "--color", "never",
    "-C", worktreeAppRoot,
    "--json",
    "--output-schema", WORKER_SCHEMA_PATH,
    "--output-last-message", finalPath,
    "--model", context.config.provider.model,
    "--config", `model_reasoning_effort=${JSON.stringify(context.config.provider.reasoning)}`,
    "-",
  ];
  writeJson(resolve(workerDir, "command.json"), {
    command: commandText([binary, ...args]),
    model: context.config.provider.model,
    reasoning: context.config.provider.reasoning,
    sandbox: context.config.provider.sandbox,
  });
  const result = await context.predictionSemaphore.use(() => runProcess(binary, args, {
    cwd: worktreeAppRoot,
    input: prompt,
    timeoutMs: context.config.provider.timeoutMs,
    env: sanitizedEnvironment(),
  }));
  writeText(stdoutPath, result.stdout);
  writeText(stderrPath, result.stderr);
  if (result.exitCode !== 0) {
    return { process: result, result: null, unknownMutation: true };
  }
  if (!existsSync(finalPath)) throw new Error(`Luna worker ${task.id} did not write final.json.`);
  return { process: result, result: validateWorkerResult(readJson(finalPath)), unknownMutation: false };
}

async function invokeMockWorker(context, task, workerDir, worktreeAppRoot) {
  context.mockActive += 1;
  context.peakMockActive = Math.max(context.peakMockActive, context.mockActive);
  try {
    await new Promise((resolveWait) => setTimeout(resolveWait, 40));
    const outside = context.mockBehavior?.[task.id] === "scope-violation";
    const target = outside ? resolve(worktreeAppRoot, "src", "outside", `${task.id}.txt`) : resolve(worktreeAppRoot, "src", task.id, "result.txt");
    writeText(target, `mock worker ${task.id}\n`);
    const result = {
      status: "completed",
      summary: `Mocked ${task.title}`,
      filesChanged: [normalizePath(relative(worktreeAppRoot, target))],
      validations: [],
      blockers: [],
    };
    writeJson(resolve(workerDir, "final.json"), result);
    writeText(resolve(workerDir, "events.jsonl"), `${JSON.stringify({ type: "mock.completed", taskId: task.id })}\n`);
    writeText(resolve(workerDir, "stderr.log"), "");
    return { process: { exitCode: 0, durationMs: 40, timedOut: false }, result, unknownMutation: false };
  } finally {
    context.mockActive -= 1;
  }
}

async function executeTask(context, task, dependencyResults) {
  const workerDir = resolve(context.runRoot, "workers", task.id);
  mkdirSync(workerDir, { recursive: true });
  const locks = acquireLocks(context, task);
  writeWorkerState(context, task.id, { status: "active", attempt: 1, startedAt: nowIso() });
  context.event({ type: "task.active", taskId: task.id, layer: "workflow", actionId: `run-${task.id}` });
  try {
    const worktree = await prepareWorktree(context, task, dependencyResults);
    const expectedHead = (await git(["rev-parse", "HEAD"], worktree.worktreeRoot)).stdout.trim();
    const prompt = taskPrompt(context.request, task, dependencyResults);
    const approximateTokens = Math.ceil(prompt.length / 4);
    if (approximateTokens > context.config.controls.maxContextTokens) {
      throw new Error(`Task ${task.id} prompt is approximately ${approximateTokens} tokens, above maxContextTokens.`);
    }
    writeText(resolve(workerDir, "prompt.md"), prompt);
    writeJson(resolve(workerDir, "worktree.json"), { ...worktree, expectedHead, approximatePromptTokens: approximateTokens });
    const invocation = context.mock
      ? await context.predictionSemaphore.use(() => invokeMockWorker(context, task, workerDir, worktree.worktreeAppRoot))
      : await invokeLuna(context, task, prompt, workerDir, worktree.worktreeAppRoot);
    if (invocation.unknownMutation) {
      const decision = { decisionId: `worker-${task.id}-unknown`, gateId: "worker-execution", outcome: "hold", reason: "Codex exited unsuccessfully; mutation outcome may be unknown and was not replayed.", process: invocation.process };
      writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
      writeWorkerState(context, task.id, { status: "hold", attempt: 1, decisionId: decision.decisionId, worktree });
      context.event({ type: "task.hold", taskId: task.id, layer: "workflow", decisionId: decision.decisionId });
      return { taskId: task.id, status: "hold", branch: worktree.branch, worktree: worktree.worktreeRoot };
    }
    if (invocation.result.status === "blocked") {
      const decision = { decisionId: `worker-${task.id}-blocked`, gateId: "worker-execution", outcome: "blocked", blockers: invocation.result.blockers };
      writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
      writeWorkerState(context, task.id, { status: "blocked", attempt: 1, decisionId: decision.decisionId, worktree });
      context.event({ type: "task.blocked", taskId: task.id, layer: "workflow", decisionId: decision.decisionId });
      return { taskId: task.id, status: "blocked", branch: worktree.branch, worktree: worktree.worktreeRoot };
    }
    const actualHead = (await git(["rev-parse", "HEAD"], worktree.worktreeRoot)).stdout.trim();
    if (actualHead !== expectedHead) throw new Error(`Worker ${task.id} changed git history; worker git operations are forbidden.`);
    const changed = await changedAppPaths(context, worktree.worktreeRoot);
    if (changed.length === 0) throw new Error(`Worker ${task.id} produced no file changes.`);
    const violations = changed.filter((entry) => !entry.appPath || !task.allowedPaths.some((pattern) => matchesAllowedPath(entry.appPath, pattern)));
    writeJson(resolve(workerDir, "changed-files.json"), { changed, violations });
    if (violations.length > 0) {
      const decision = { decisionId: `worker-${task.id}-scope`, gateId: "worker-path-scope", outcome: "rejected", violations };
      writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
      writeWorkerState(context, task.id, { status: "rejected", attempt: 1, decisionId: decision.decisionId, worktree });
      context.event({ type: "task.rejected", taskId: task.id, layer: "workflow", decisionId: decision.decisionId });
      return { taskId: task.id, status: "rejected", branch: worktree.branch, worktree: worktree.worktreeRoot };
    }
    const validation = await runValidationCommands(context, task.validation, worktree.worktreeAppRoot, resolve(workerDir, "validation"), "worker");
    writeJson(resolve(workerDir, "validation.json"), validation);
    if (validation.status !== "passed") {
      const decision = { decisionId: `worker-${task.id}-validation`, gateId: "worker-validation", outcome: "blocked", validation };
      writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
      writeWorkerState(context, task.id, { status: "blocked", attempt: 1, decisionId: decision.decisionId, worktree });
      context.event({ type: "task.blocked", taskId: task.id, layer: "workflow", decisionId: decision.decisionId });
      return { taskId: task.id, status: "blocked", branch: worktree.branch, worktree: worktree.worktreeRoot };
    }
    await git(["add", "--", context.appRelative], worktree.worktreeRoot);
    await git(["commit", "-m", `${context.config.git.commitPrefix}(${task.id}): ${task.title}`], worktree.worktreeRoot, 300000);
    const commit = (await git(["rev-parse", "HEAD"], worktree.worktreeRoot)).stdout.trim();
    const patch = await git(["show", "--binary", "--format=", commit], worktree.worktreeRoot, 300000);
    const patchPath = resolve(workerDir, "diff.patch");
    const validationPath = resolve(workerDir, "validation.json");
    writeText(patchPath, patch.stdout);
    const result = {
      taskId: task.id,
      status: SUCCESS_TASK_STATE,
      summary: invocation.result.summary,
      branch: worktree.branch,
      commit,
      changedFiles: changed.map((entry) => entry.appPath),
      worktree: worktree.worktreeRoot,
      validation,
      validationHash: fileSha256(validationPath),
      patchHash: fileSha256(patchPath),
    };
    const decision = { decisionId: `worker-${task.id}-promote`, gateId: "worker-validation", outcome: "pass", commit, changedFiles: result.changedFiles };
    writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
    writeWorkerState(context, task.id, { ...result, attempt: 1, decisionId: decision.decisionId });
    context.event({ type: "task.integration_ready", taskId: task.id, layer: "workflow", decisionId: decision.decisionId, artifactRefs: [`workers/${task.id}/diff.patch`] });
    return result;
  } catch (error) {
    const decision = { decisionId: `worker-${task.id}-error`, gateId: "worker-execution", outcome: "blocked", reason: error.message };
    writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
    writeWorkerState(context, task.id, { status: "blocked", attempt: 1, decisionId: decision.decisionId, error: error.message });
    context.event({ type: "task.blocked", taskId: task.id, layer: "workflow", decisionId: decision.decisionId, detail: error.message });
    return { taskId: task.id, status: "blocked", error: error.message };
  } finally {
    releaseLocks(locks);
  }
}

async function createIntegration(context, results) {
  const worktreeRoot = resolve(context.worktreeRunRoot, context.config.git.integrationBranchSuffix);
  const branch = `${context.config.git.workerBranchPrefix}/${context.runId}/${context.config.git.integrationBranchSuffix}`;
  context.event({ type: "integration.active", actionId: "create-integration" });
  try {
    await git(["worktree", "add", "-b", branch, worktreeRoot, context.baseSha], context.repoRoot, 300000);
    for (const task of topologicalTasks(context.request.tasks)) {
      const result = results.find((entry) => entry.taskId === task.id);
      await git(["cherry-pick", result.commit], worktreeRoot, 300000);
    }
    const integrationAppRoot = resolve(worktreeRoot, context.appRelative);
    linkSharedDependencies(context, integrationAppRoot);
    const validation = await runValidationCommands(context, context.request.integrationValidation, integrationAppRoot, resolve(context.runRoot, "integration", "validation"), "integration");
    const validationPath = resolve(context.runRoot, "integration", "validation.json");
    writeJson(validationPath, validation);
    if (validation.status !== "passed") {
      const decision = { decisionId: "integration-validation", gateId: "integration-validation", outcome: "hold", branch, validation };
      writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
      context.event({ type: "integration.hold", decisionId: decision.decisionId });
      return { status: "hold", branch, worktree: worktreeRoot, validation };
    }
    const commit = (await git(["rev-parse", "HEAD"], worktreeRoot)).stdout.trim();
    const decision = { decisionId: "integration-accepted", gateId: "integration-validation", outcome: "pass", branch, commit, humanApprovalRequired: true };
    writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
    context.event({ type: "integration.accepted", decisionId: decision.decisionId, artifactRefs: ["integration/validation.json"] });
    return { status: "integrated", branch, commit, worktree: worktreeRoot, validation, validationHash: fileSha256(validationPath), promotion: "Human review is required before merging or pushing the default branch." };
  } catch (error) {
    const decision = { decisionId: "integration-conflict", gateId: "integration-validation", outcome: "hold", reason: error.message, branch, worktree: worktreeRoot };
    writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
    context.event({ type: "integration.hold", decisionId: decision.decisionId, detail: error.message });
    return { status: "hold", branch, worktree: worktreeRoot, error: error.message };
  }
}

async function initializeRun({ request, config, options, repoRoot = null, appRoot = APP_ROOT, runRoot = null, worktreeRoot = null, requireClean = false }) {
  if (options.execute && !options.mock) validateLiveRequest(request);
  const discoveredRepoRoot = repoRoot ?? (await git(["rev-parse", "--show-toplevel"], appRoot)).stdout.trim();
  const appRelative = normalizePath(relative(discoveredRepoRoot, appRoot));
  if (!appRelative || appRelative.startsWith("..")) throw new Error("App root must be inside the git repository.");
  const baseSha = (await git(["rev-parse", "HEAD"], discoveredRepoRoot)).stdout.trim();
  const status = (await git(["status", "--porcelain"], discoveredRepoRoot)).stdout.trim();
  if (requireClean && status) throw new Error("Live swarm execution requires a clean base worktree.");
  if (options.execute && !options.mock && config.policy.requireSharedDependencies && !existsSync(resolve(appRoot, "node_modules"))) {
    throw new Error("Live swarm execution requires dependencies. Run `npm ci` in HorrorCorridor-V1 first.");
  }
  const codexProbe = options.execute && !options.mock
    ? await runChecked(options.codexPath ?? config.provider.binary, ["--version"], { cwd: appRoot, timeoutMs: 30000, env: sanitizedEnvironment() })
    : null;
  const runId = slug(request.runId ?? `run-${nowIso().replaceAll(/[:.TZ]/g, "-").replace(/-+$/, "")}`, "runId");
  const resolvedRunRoot = runRoot ?? resolve(expandHome(config.paths.runRoot), runId);
  const resolvedWorktreeRunRoot = resolve(worktreeRoot ?? expandHome(config.paths.worktreeRoot), runId);
  if (existsSync(resolve(resolvedRunRoot, "manifest.json"))) throw new Error(`Run already exists: ${resolvedRunRoot}`);
  mkdirSync(resolve(resolvedRunRoot, "inputs", "tasks"), { recursive: true });
  request.tasks.forEach((task) => writeJson(resolve(resolvedRunRoot, "inputs", "tasks", `${task.id}.json`), task));
  writeJson(resolve(resolvedRunRoot, "inputs", "request.json"), request);
  const manifest = {
    schemaVersion: "horror-corridor.swarm-run.v1",
    runId,
    goal: request.goal,
    authorityClass: "orchestrator",
    layers: ["orchestrator", "workflow", "chain"],
    proofClass: options.mock ? "integrated-mock" : options.execute ? "live" : "dry-run",
    profileId: `${config.provider.model}-${config.provider.reasoning}`,
    promptVersion: "luna-worker.v1",
    startedAt: nowIso(),
    repoRoot: discoveredRepoRoot,
    appRoot,
    appRelative,
    baseSha,
    baseDirty: Boolean(status),
    requestPath: "inputs/request.json",
    requestHash: sha256(JSON.stringify(request)),
    configHash: sha256(JSON.stringify(config)),
    promptHash: fileSha256(WORKER_PROMPT_PATH),
    workerSchemaHash: fileSha256(WORKER_SCHEMA_PATH),
    taskCount: request.tasks.length,
    controls: config.controls,
    provider: {
      binary: options.codexPath ?? config.provider.binary,
      codexVersion: codexProbe?.stdout.trim() ?? null,
      model: config.provider.model,
      reasoning: config.provider.reasoning,
      sandbox: config.provider.sandbox,
    },
    worktreeRoot: resolvedWorktreeRunRoot,
    approval: { execute: Boolean(options.execute || options.mock), mergeDefaultBranch: false, push: false },
  };
  writeJson(resolve(resolvedRunRoot, "manifest.json"), manifest);
  return { manifest, runId, runRoot: resolvedRunRoot, repoRoot: discoveredRepoRoot, appRoot, appRelative, baseSha, worktreeRunRoot: resolvedWorktreeRunRoot };
}

function createContext(initialized, request, config, options = {}) {
  const context = {
    ...initialized,
    request,
    config,
    options,
    predictionSemaphore: new Semaphore(config.controls.maxActivePredictions),
    validationSemaphore: new Semaphore(config.controls.validationConcurrency),
    mock: Boolean(options.mock),
    mockBehavior: options.mockBehavior ?? {},
    mockActive: 0,
    peakMockActive: 0,
  };
  context.event = eventWriter(context);
  return context;
}

async function executeRun(context) {
  context.event({ type: "run.active", actionId: "execute-run" });
  const deadline = Date.now() + context.config.controls.runTimeoutMs;
  const results = [];
  const pending = new Set(context.request.tasks.map((task) => task.id));
  for (const task of context.request.tasks) {
    const state = readWorkerState(context, task.id);
    if (state.status === SUCCESS_TASK_STATE) {
      results.push(await verifyResumedWorker(context, task, state));
      pending.delete(task.id);
      context.event({ type: "task.resume-skip", taskId: task.id, layer: "workflow", detail: "Validated commit already exists." });
    } else if (state.status === "active") {
      writeWorkerState(context, task.id, { ...state, status: "hold", reason: "Interrupted active mutation was not replayed." });
      pending.delete(task.id);
      results.push({ ...state, taskId: task.id, status: "hold" });
    } else if (TERMINAL_TASK_STATES.has(state.status)) {
      pending.delete(task.id);
      results.push(state);
    }
  }
  const taskById = new Map(context.request.tasks.map((task) => [task.id, task]));
  while (pending.size > 0) {
    if (Date.now() > deadline) {
      for (const taskId of pending) {
        const decision = { decisionId: `worker-${taskId}-run-timeout`, gateId: "run-budget", outcome: "blocked", reason: "Run wall-clock budget exhausted before task start." };
        writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
        writeWorkerState(context, taskId, { status: "blocked", attempt: 0, decisionId: decision.decisionId });
        context.event({ type: "task.blocked", taskId, decisionId: decision.decisionId });
        results.push({ taskId, status: "blocked" });
      }
      pending.clear();
      break;
    }
    const failedDependencies = [...pending].filter((taskId) => taskById.get(taskId).dependsOn.some((dependency) => {
      const dependencyResult = results.find((entry) => entry.taskId === dependency);
      return dependencyResult && dependencyResult.status !== SUCCESS_TASK_STATE;
    }));
    for (const taskId of failedDependencies) {
      const task = taskById.get(taskId);
      const decision = { decisionId: `worker-${taskId}-dependency`, gateId: "dependency-gate", outcome: "blocked", dependencies: task.dependsOn };
      writeJson(resolve(context.runRoot, "decisions", `${decision.decisionId}.json`), decision);
      writeWorkerState(context, taskId, { status: "blocked", attempt: 0, decisionId: decision.decisionId });
      context.event({ type: "task.blocked", taskId, layer: "orchestrator", decisionId: decision.decisionId });
      results.push({ taskId, status: "blocked" });
      pending.delete(taskId);
    }
    const ready = [...pending]
      .map((taskId) => taskById.get(taskId))
      .filter((task) => task.dependsOn.every((dependency) => results.some((entry) => entry.taskId === dependency && entry.status === SUCCESS_TASK_STATE)))
      .sort((left, right) => right.priority - left.priority || left.id.localeCompare(right.id));
    if (ready.length === 0) {
      if (pending.size > 0) throw new Error(`Queue deadlock: ${[...pending].join(", ")}`);
      break;
    }
    const wave = ready.slice(0, context.config.controls.taskConcurrency);
    const waveResults = await Promise.all(wave.map((task) => {
      pending.delete(task.id);
      const dependencies = task.dependsOn.map((dependency) => results.find((entry) => entry.taskId === dependency));
      return executeTask(context, task, dependencies);
    }));
    results.push(...waveResults);
  }
  const allReady = results.length === context.request.tasks.length && results.every((result) => result.status === SUCCESS_TASK_STATE);
  const previousFinalPath = resolve(context.runRoot, "final-report.json");
  const previousFinal = existsSync(previousFinalPath) ? readJson(previousFinalPath) : null;
  const integration = allReady
    ? previousFinal?.integration?.status === "integrated"
      ? await verifyResumedIntegration(context, previousFinal.integration)
      : await createIntegration(context, results)
    : { status: "blocked", reason: "One or more workers did not reach integration_ready." };
  const validationReport = {
    createdAt: nowIso(),
    status: integration.status === "integrated" ? "passed" : "failed",
    requestContract: "passed",
    taskCount: context.request.tasks.length,
    integrationValidation: integration.validation ?? null,
    malformedJsonlCount: countMalformedJsonl(context.runRoot),
  };
  if (validationReport.malformedJsonlCount > 0) validationReport.status = "failed";
  writeJson(resolve(context.runRoot, "validation-report.json"), validationReport);
  const finalReport = {
    runId: context.runId,
    status: validationReport.status === "passed" ? "integrated" : integration.status,
    proofClass: context.manifest.proofClass,
    goal: context.request.goal,
    results,
    integration,
    controls: context.config.controls,
    peakActiveMockPredictions: context.mock ? context.peakMockActive : null,
    promotion: "Review the integration branch. Merge or push only through an explicit human-owned git action.",
    completedAt: nowIso(),
  };
  writeJson(resolve(context.runRoot, "outputs.json"), { results, integration });
  writeJson(resolve(context.runRoot, "report.json"), finalReport);
  writeText(resolve(context.runRoot, "report.md"), renderReport(finalReport));
  writeJson(resolve(context.runRoot, "final-report.json"), finalReport);
  context.event({ type: "run.completed", decisionId: integration.status === "integrated" ? "integration-accepted" : null, detail: finalReport.status });
  return finalReport;
}

function countMalformedJsonl(runRoot) {
  const paths = [];
  const visit = (directory) => {
    if (!existsSync(directory)) return;
    for (const entry of readFileSystemDirectory(directory)) {
      if (entry.isDirectory()) visit(resolve(directory, entry.name));
      else if (entry.name.endsWith(".jsonl")) paths.push(resolve(directory, entry.name));
    }
  };
  visit(runRoot);
  let malformed = 0;
  for (const path of paths) {
    for (const line of readFileSync(path, "utf8").split(/\r?\n/).filter(Boolean)) {
      try { JSON.parse(line); } catch { malformed += 1; }
    }
  }
  return malformed;
}

function readFileSystemDirectory(path) {
  return readdirSync(path, { withFileTypes: true });
}

function renderReport(report) {
  const workers = report.results.map((result) => `- ${result.taskId}: ${result.status}${result.commit ? ` (${result.commit.slice(0, 12)})` : ""}`).join("\n");
  return `# HorrorCorridor Luna Swarm Report\n\n- Run: \`${report.runId}\`\n- Status: \`${report.status}\`\n- Proof: \`${report.proofClass}\`\n- Integration branch: \`${report.integration.branch ?? "none"}\`\n\n## Workers\n\n${workers}\n\n## Promotion\n\n${report.promotion}\n`;
}

async function planRun(context) {
  context.event({ type: "run.planned", actionId: "plan-run" });
  for (const task of context.request.tasks) {
    const prompt = taskPrompt(context.request, task, []);
    const approximateTokens = Math.ceil(prompt.length / 4);
    if (approximateTokens > context.config.controls.maxContextTokens) throw new Error(`Task ${task.id} exceeds maxContextTokens.`);
    writeText(resolve(context.runRoot, "workers", task.id, "prompt.md"), prompt);
    writeWorkerState(context, task.id, { status: "ready", attempt: 0, approximatePromptTokens: approximateTokens });
  }
  const report = {
    runId: context.runId,
    status: "planned",
    proofClass: "dry-run",
    taskCount: context.request.tasks.length,
    controls: context.config.controls,
    runRoot: context.runRoot,
    worktreeRoot: context.worktreeRunRoot,
    liveCommandRequired: true,
  };
  writeJson(resolve(context.runRoot, "validation-report.json"), { status: "passed", requestContract: "passed", promptRendering: "passed" });
  writeJson(resolve(context.runRoot, "outputs.json"), { prompts: context.request.tasks.map((task) => `workers/${task.id}/prompt.md`) });
  writeJson(resolve(context.runRoot, "report.json"), report);
  writeText(resolve(context.runRoot, "report.md"), `# HorrorCorridor Luna Swarm Plan\n\n- Run: \`${report.runId}\`\n- Status: \`planned\`\n- Tasks: \`${report.taskCount}\`\n- Live workers invoked: \`no\`\n\nInspect the rendered worker prompts before starting a separate live run with \`--execute\`.\n`);
  writeJson(resolve(context.runRoot, "final-report.json"), report);
  return report;
}

async function loadExistingContext(runRoot, config, options) {
  const manifest = readJson(resolve(runRoot, "manifest.json"));
  if (manifest.requestPath !== "inputs/request.json") throw new Error("Run manifest requestPath is not canonical.");
  if (!options.mock) {
    const expectedRepoRoot = (await git(["rev-parse", "--show-toplevel"], APP_ROOT)).stdout.trim();
    if (realpathSync(manifest.repoRoot) !== realpathSync(expectedRepoRoot) || realpathSync(manifest.appRoot) !== realpathSync(APP_ROOT)) {
      throw new Error("Run manifest does not target the canonical HorrorCorridor checkout.");
    }
    const configuredRunRoot = expandHome(config.paths.runRoot);
    const configuredWorktreeRoot = expandHome(config.paths.worktreeRoot);
    if (!isPathWithin(realpathSync(runRoot), realpathSync(configuredRunRoot))) throw new Error("Run root is outside the configured HorrorCorridor harness run root.");
    if (!isPathWithin(manifest.worktreeRoot, configuredWorktreeRoot)) throw new Error("Manifest worktree root is outside the configured harness worktree root.");
    if (normalizePath(relative(manifest.repoRoot, manifest.appRoot)) !== manifest.appRelative) throw new Error("Manifest appRelative identity drifted.");
    if (!/^[0-9a-f]{40,64}$/.test(manifest.baseSha)) throw new Error("Manifest baseSha is malformed.");
  }
  const request = validateRequest(readJson(resolve(runRoot, "inputs", "request.json")));
  if (manifest.requestHash !== sha256(JSON.stringify(request))) throw new Error("Run request changed after initialization. Start a new run.");
  if (manifest.goal !== request.goal || manifest.taskCount !== request.tasks.length || (request.runId && manifest.runId !== request.runId)) {
    throw new Error("Run manifest identity no longer matches its immutable request.");
  }
  if (options.execute && !options.mock) validateLiveRequest(request);
  const mergedConfig = mergeConfiguration(config, request);
  if (manifest.configHash !== sha256(JSON.stringify(mergedConfig))) {
    throw new Error("Harness configuration drifted since this run started. Start a new run instead of resuming with changed immutable configuration.");
  }
  if (manifest.promptHash !== fileSha256(WORKER_PROMPT_PATH) || manifest.workerSchemaHash !== fileSha256(WORKER_SCHEMA_PATH)) {
    throw new Error("Worker prompt or output schema drifted since this run started. Start a new run.");
  }
  if (options.execute && !options.mock) {
    const currentSha = (await git(["rev-parse", "HEAD"], manifest.repoRoot)).stdout.trim();
    const currentStatus = (await git(["status", "--porcelain"], manifest.repoRoot)).stdout.trim();
    if (currentSha !== manifest.baseSha) throw new Error("Base branch HEAD drifted since this run started; resume is blocked.");
    if (currentStatus) throw new Error("Live resume requires a clean base worktree.");
    if (mergedConfig.policy.requireSharedDependencies && !existsSync(resolve(manifest.appRoot, "node_modules"))) {
      throw new Error("Live resume requires dependencies. Run `npm ci` in HorrorCorridor-V1 first.");
    }
    await runChecked(options.codexPath ?? mergedConfig.provider.binary, ["--version"], { cwd: manifest.appRoot, timeoutMs: 30000, env: sanitizedEnvironment() });
  }
  const initialized = {
    manifest,
    runId: manifest.runId,
    runRoot,
    repoRoot: manifest.repoRoot,
    appRoot: manifest.appRoot,
    appRelative: manifest.appRelative,
    baseSha: manifest.baseSha,
    worktreeRunRoot: manifest.worktreeRoot,
    existingEventCount: existsSync(resolve(runRoot, "events.jsonl")) ? readFileSync(resolve(runRoot, "events.jsonl"), "utf8").split(/\r?\n/).filter(Boolean).length : 0,
  };
  return createContext(initialized, request, mergedConfig, options);
}

async function selfTest(keep) {
  const expectRejected = (label, callback) => {
    try {
      callback();
    } catch {
      return;
    }
    throw new Error(`Self-test expected ${label} to be rejected.`);
  };
  const minimalTask = { id: "safe-task", title: "Safe task", request: "Create one safe scoped implementation change.", dependsOn: [], allowedPaths: ["src/safe-task/**"], validation: [["node", "--version"]] };
  const minimalRequest = { schemaVersion: "horror-corridor.swarm-request.v1", goal: "Exercise deterministic request contract rejection paths.", tasks: [minimalTask], integrationValidation: [["node", "--version"]] };
  expectRejected("unsafe validator", () => validateRequest({ ...minimalRequest, tasks: [{ ...minimalTask, validation: [["git", "push"]] }] }));
  expectRejected("broad worker scope", () => validateRequest({ ...minimalRequest, tasks: [{ ...minimalTask, allowedPaths: ["**"] }] }));
  expectRejected("zero prediction budget", () => validateRequest({ ...minimalRequest, controls: { maxActivePredictions: 0 } }));
  expectRejected("missing integration gate", () => validateRequest({ ...minimalRequest, integrationValidation: [] }));
  expectRejected("mock-only live validation", () => validateLiveRequest(validateRequest(minimalRequest)));
  const root = mkdtempSync(resolve(tmpdir(), "horror-corridor-swarm-self-test-"));
  const repoRoot = resolve(root, "repo");
  const appRoot = resolve(repoRoot, "HorrorCorridor-V1");
  mkdirSync(appRoot, { recursive: true });
  writeText(resolve(appRoot, "AGENTS.md"), "# Self test\n");
  writeText(resolve(appRoot, "package.json"), "{\"private\":true}\n");
  await runChecked("git", ["init", "-b", "main"], { cwd: repoRoot, env: sanitizedEnvironment() });
  await runChecked("git", ["config", "user.name", "HorrorCorridor Harness Self Test"], { cwd: repoRoot, env: sanitizedEnvironment() });
  await runChecked("git", ["config", "user.email", "harness-self-test@example.invalid"], { cwd: repoRoot, env: sanitizedEnvironment() });
  await runChecked("git", ["add", "."], { cwd: repoRoot, env: sanitizedEnvironment() });
  await runChecked("git", ["commit", "-m", "self-test base"], { cwd: repoRoot, env: sanitizedEnvironment() });
  const baseConfig = readJson(CONFIG_PATH);
  const request = validateRequest({
    schemaVersion: "horror-corridor.swarm-request.v1",
    runId: "self-test-happy",
    goal: "Prove bounded concurrent mock workers and integration artifacts.",
    controls: { taskConcurrency: 2, maxActivePredictions: 2, validationConcurrency: 1, maxContextTokens: 4000, shardCount: 4 },
    tasks: ["alpha", "beta"].map((id) => ({ id, title: `Build ${id}`, request: `Create the isolated ${id} self-test output.`, dependsOn: [], allowedPaths: [`src/${id}/**`], validation: [["node", "--version"]] })),
    integrationValidation: [["node", "--version"]],
  });
  const config = mergeConfiguration(baseConfig, request);
  const initialized = await initializeRun({ request, config, options: { mock: true, execute: true }, repoRoot, appRoot, runRoot: resolve(root, "runs", request.runId), worktreeRoot: resolve(root, "worktrees"), requireClean: true });
  const context = createContext(initialized, request, config, { mock: true, execute: true });
  const happy = await executeRun(context);
  if (happy.status !== "integrated" || happy.results.length !== 2 || happy.peakActiveMockPredictions < 2) {
    throw new Error("Happy-path concurrency self-test failed.");
  }
  const resumedContext = await loadExistingContext(initialized.runRoot, config, { mock: true, execute: true });
  const originalCommits = happy.results.map((result) => result.commit).join(",");
  const resumed = await executeRun(resumedContext);
  if (resumed.results.map((result) => result.commit).join(",") !== originalCommits) throw new Error("Resume replayed validated mutations.");
  const acceptedValidationPath = resolve(initialized.runRoot, "workers", "alpha", "validation.json");
  const acceptedValidation = readFileSync(acceptedValidationPath, "utf8");
  writeText(acceptedValidationPath, `${acceptedValidation.trim()} `);
  let tamperRejected = false;
  try {
    const tamperedContext = await loadExistingContext(initialized.runRoot, config, { mock: true, execute: true });
    await executeRun(tamperedContext);
  } catch {
    tamperRejected = true;
  }
  writeText(acceptedValidationPath, acceptedValidation);
  if (!tamperRejected) throw new Error("Resume accepted a tampered validation artifact.");
  const acceptedRequestPath = resolve(initialized.runRoot, "inputs", "request.json");
  const acceptedRequest = readFileSync(acceptedRequestPath, "utf8");
  const changedRequest = JSON.parse(acceptedRequest);
  changedRequest.goal = `${changedRequest.goal} tampered`;
  writeJson(acceptedRequestPath, changedRequest);
  let requestTamperRejected = false;
  try {
    await loadExistingContext(initialized.runRoot, config, { mock: true, execute: true });
  } catch {
    requestTamperRejected = true;
  }
  writeText(acceptedRequestPath, acceptedRequest);
  if (!requestTamperRejected) throw new Error("Resume accepted a tampered request artifact.");

  const failureRequest = validateRequest({
    schemaVersion: "horror-corridor.swarm-request.v1",
    runId: "self-test-scope-failure",
    goal: "Prove out-of-scope changes are rejected and dependencies block.",
    controls: { taskConcurrency: 2, maxActivePredictions: 2, validationConcurrency: 1, maxContextTokens: 4000, shardCount: 4 },
    tasks: [
      { id: "escape", title: "Attempt escape", request: "Exercise the deterministic scope rejection gate.", dependsOn: [], allowedPaths: ["src/safe/**"], validation: [["node", "--version"]] },
      { id: "dependent", title: "Blocked dependent", request: "Prove failed dependency propagation is deterministic.", dependsOn: ["escape"], allowedPaths: ["src/dependent/**"], validation: [["node", "--version"]] },
    ],
    integrationValidation: [["node", "--version"]],
  });
  const failureConfig = mergeConfiguration(baseConfig, failureRequest);
  const failureInitialized = await initializeRun({ request: failureRequest, config: failureConfig, options: { mock: true, execute: true }, repoRoot, appRoot, runRoot: resolve(root, "runs", failureRequest.runId), worktreeRoot: resolve(root, "worktrees"), requireClean: true });
  const failureContext = createContext(failureInitialized, failureRequest, failureConfig, { mock: true, execute: true, mockBehavior: { escape: "scope-violation" } });
  const failure = await executeRun(failureContext);
  if (!failure.results.some((result) => result.taskId === "escape" && result.status === "rejected") || !failure.results.some((result) => result.taskId === "dependent" && result.status === "blocked")) {
    throw new Error("Failure-path self-test did not reject scope escape and block its dependent.");
  }
  const result = { status: "passed", root, happyRun: initialized.runRoot, failureRun: failureInitialized.runRoot, concurrency: happy.peakActiveMockPredictions, contractRejections: 5, tamperRejected, requestTamperRejected, malformedJsonlCount: countMalformedJsonl(resolve(root, "runs")) };
  if (result.malformedJsonlCount !== 0) throw new Error("Self-test found malformed JSONL.");
  if (!keep) rmSync(root, { recursive: true, force: true });
  return result;
}

function usage() {
  return `HorrorCorridor Luna swarm harness\n\nCommands:\n  check <request.json>\n  plan <request.json> [--run-root <dir>]\n  run <request.json> --execute [--codex-path <path>] [--run-root <dir>] [--worktree-root <dir>]\n  resume <run-root> --execute [--codex-path <path>]\n  status <run-root>\n  self-test [--keep-self-test]\n\nLive workers are never started without --execute. The harness never merges or pushes the default branch.\n`;
}

async function main() {
  const { positional, options } = parseOptions(process.argv.slice(2));
  const command = positional[0] ?? "help";
  if (["help", "--help", "-h"].includes(command)) {
    process.stdout.write(usage());
    return;
  }
  if (command === "self-test") {
    process.stdout.write(`${JSON.stringify(await selfTest(Boolean(options["keep-self-test"])), null, 2)}\n`);
    return;
  }
  const baseConfig = readJson(CONFIG_PATH);
  if (command === "status") {
    const runRoot = resolve(positional[1] ?? options["run-root"] ?? "");
    const reportPath = resolve(runRoot, "final-report.json");
    if (!existsSync(reportPath)) throw new Error(`No final report found at ${reportPath}`);
    process.stdout.write(readFileSync(reportPath, "utf8"));
    return;
  }
  if (command === "resume") {
    if (!options.execute) throw new Error("resume requires --execute; unknown mutations are never replayed automatically.");
    const runRoot = resolve(positional[1] ?? options["run-root"] ?? "");
    const context = await loadExistingContext(runRoot, baseConfig, { execute: true, codexPath: options["codex-path"] });
    process.stdout.write(`${JSON.stringify(await executeRun(context), null, 2)}\n`);
    return;
  }
  if (!["check", "plan", "run"].includes(command)) throw new Error(`Unknown command: ${command}\n\n${usage()}`);
  const requestPath = resolve(positional[1] ?? "");
  if (!existsSync(requestPath)) throw new Error(`Request file not found: ${requestPath}`);
  const request = validateRequest(readJson(requestPath));
  const config = mergeConfiguration(baseConfig, request);
  if (command === "check") {
    process.stdout.write(`${JSON.stringify({ status: "passed", requestPath, schemaPath: REQUEST_SCHEMA_PATH, taskCount: request.tasks.length, controls: config.controls, provider: config.provider }, null, 2)}\n`);
    return;
  }
  if (command === "run" && !options.execute) throw new Error("run requires --execute. Use plan for a no-model dry run.");
  if (command === "run" && (options["run-root"] || options["worktree-root"])) {
    throw new Error("Live runs must use the configured external run and worktree roots; custom roots are plan-only.");
  }
  const planSuffix = nowIso().replaceAll(/[:.TZ]/g, "-").replace(/-+$/, "");
  const operationRequest = command === "plan"
    ? { ...request, runId: `${request.runId ?? "swarm"}-plan-${planSuffix}` }
    : request;
  const runId = operationRequest.runId ?? undefined;
  const explicitRunRoot = options["run-root"] ? resolve(options["run-root"]) : runId ? resolve(expandHome(config.paths.runRoot), runId) : null;
  const initialized = await initializeRun({
    request: operationRequest,
    config,
    options: { execute: command === "run", codexPath: options["codex-path"] },
    runRoot: explicitRunRoot,
    worktreeRoot: options["worktree-root"] ? resolve(options["worktree-root"]) : null,
    requireClean: command === "run",
  });
  const context = createContext(initialized, operationRequest, config, { execute: command === "run", codexPath: options["codex-path"] });
  const report = command === "plan" ? await planRun(context) : await executeRun(context);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});
