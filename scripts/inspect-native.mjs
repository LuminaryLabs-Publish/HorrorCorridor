import { execFile } from "node:child_process";
import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";

const execute = promisify(execFile);
const ENGINE_COMMIT = "bd06da114b7d41d0dadfa641dd9c77a0292dc739";
const project = await realpath(fileURLToPath(new URL("../", import.meta.url)));
const within = (root, candidate) => {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
};

async function canonicalDestination(destination) {
  let current = path.resolve(destination);
  const suffix = [];
  for (;;) {
    try { return path.resolve(await realpath(current), ...suffix); }
    catch (error) {
      if (error.code !== "ENOENT") throw error;
      suffix.unshift(path.basename(current));
      const parent = path.dirname(current);
      if (parent === current) throw error;
      current = parent;
    }
  }
}

async function git(root, ...args) {
  return (await execute("git", ["-C", root, ...args], { timeout: 10000, maxBuffer: 1024 * 1024 })).stdout.trim();
}

async function main() {
  const options = {};
  const args = process.argv.slice(2);
  for (let index = 0; index < args.length; index += 1) {
    if (!["--engine", "--out"].includes(args[index]) || !args[index + 1] || args[index + 1].startsWith("--")) {
      throw new Error("Usage: npm run native:inspect -- --engine /clean/pinned/NexusEngine [--out /external/report-directory]");
    }
    const key = args[index].slice(2);
    if (options[key]) throw new Error(`Duplicate option: --${key}`);
    options[key] = args[++index];
  }
  if (!options.engine) throw new Error("--engine must name a clean checkout of the documented candidate pin.");
  const engine = await realpath(options.engine);
  const output = await canonicalDestination(options.out ?? path.join(os.tmpdir(), "horror-corridor-native-readiness"));
  if (within(project, output) || within(engine, output)) throw new Error("Reports and Build state must be outside both source repositories.");
  const commit = await git(engine, "rev-parse", "HEAD");
  if (commit !== ENGINE_COMMIT) throw new Error(`Unreviewed engine revision: ${commit}. Expected ${ENGINE_COMMIT}.`);
  const changes = await git(engine, "status", "--porcelain", "--untracked-files=all", "--", "src", "bin", "package.json", "package-lock.json");
  if (changes) throw new Error("Engine build sources have local changes. Use an isolated clean checkout; do not reset another task's work.");
  const enginePackage = JSON.parse(await readFile(path.join(engine, "package.json"), "utf8"));
  if (enginePackage.name !== "nexusengine") throw new Error("The supplied checkout is not NexusEngine.");
  const packageJson = JSON.parse(await readFile(path.join(project, "package.json"), "utf8"));
  const { createBuildDomain } = await import(pathToFileURL(path.join(engine, "src/core-domains/build/index.js")).href);
  const build = createBuildDomain({ stateRoot: path.join(output, "build-state") });
  const report = {
    schema: "horror-corridor.native-readiness/1",
    generatedAt: new Date().toISOString(),
    projectCommit: await git(project, "rev-parse", "HEAD"),
    projectHasChanges: Boolean(await git(project, "status", "--porcelain")),
    projectCheckout: "sparse clones inspect only materialized files; this is not a preserved-source audit",
    installedEngineReference: packageJson.dependencies?.nexusengine ?? null,
    candidateEngineCommit: commit,
    enginePinChanged: false,
    requestedTargets: ["android-xr"],
    profile: "strict-native",
    status: "blocked",
    executed: ["source-inspection", "local-toolchain-discovery"],
    notExecuted: ["toolchain-provisioning", "compilation", "apk-packaging", "device-installation", "headset-runtime", "store-submission"],
    toolchains: build.services.toolchainDiscovery.discover(),
    blockers: [],
    inspection: null,
  };
  const before = build.services.sourceFingerprint.fingerprint(await build.services.projectSource.read(project));
  try {
    const inspection = await build.inspect(project);
    const counts = inspection.classification.modules.reduce((result, module) => {
      result[module.mode] = (result[module.mode] ?? 0) + 1;
      return result;
    }, {});
    report.inspection = {
      mode: inspection.classification.mode,
      counts,
      irValidation: inspection.irValidation,
      rustLowering: inspection.rustLowering,
      modules: inspection.classification.modules.map(module => ({ path: module.modulePath, mode: module.mode, reasons: module.reasons })),
    };
    if (!["native", "native-adapter"].includes(inspection.classification.mode)) {
      report.blockers.push({ code: "native-graph-unsupported", message: "The current graph cannot execute fully through the Rust path. No JavaScript fallback was selected or applied." });
    }
  } catch (error) {
    report.blockers.push({ code: "engine-inspection-failed", message: error.message });
  }
  for (const toolchain of report.toolchains.filter(toolchain => !toolchain.available)) {
    report.blockers.push({ code: "toolchain-unavailable", tool: toolchain.command, message: toolchain.error });
  }
  report.blockers.push({ code: "native-provider-unproven", message: "Package validation is not an application loop. Rust gameplay, native scene realization and live OpenXR submission still require implementation and device evidence." });
  const after = build.services.sourceFingerprint.fingerprint(await build.services.projectSource.read(project));
  report.sourceUnchanged = JSON.stringify(before) === JSON.stringify(after);
  if (!report.sourceUnchanged) throw new Error("Source changed during inspection; do not trust this report.");
  await mkdir(output, { recursive: true });
  const filename = path.join(output, "native-readiness.json");
  await writeFile(filename, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ status: report.status, report: filename, blockers: report.blockers, sourceUnchanged: true }, null, 2));
  process.exitCode = 2;
}

main().catch(error => {
  console.error(JSON.stringify({ status: "error", error: error.message }));
  process.exitCode = 1;
});
