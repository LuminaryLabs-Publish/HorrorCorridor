import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(projectRoot, ".agent", "horror-corridor-domain-tree.md");
const outputPath = path.join(
  projectRoot,
  "src",
  "engine",
  "generated",
  "horrorCorridorDomainBlueprint.json",
);
const checkOnly = process.argv.includes("--check");

const slugify = (value) =>
  value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const source = await readFile(sourcePath, "utf8");
const treeMatch = source.match(/## Natural Domain Tree\s+```text\n([\s\S]*?)\n```/);

if (!treeMatch) {
  throw new Error(`Could not find the Natural Domain Tree in ${sourcePath}`);
}

const tree = treeMatch[1];
const lines = tree.split(/\r?\n/);
const rootMatch = lines[0]?.match(/^game-slice:\s+(.+)$/);

if (!rootMatch) {
  throw new Error("The natural domain tree must begin with a game-slice node.");
}

const rootPath = "n:horror-corridor";
const root = {
  name: rootMatch[1].trim(),
  slug: "horror-corridor",
  path: rootPath,
  parentPath: null,
  sourceDepth: -1,
  states: [],
  kits: [],
  services: [],
};
const domains = [];
const hosts = [];
const proofs = [];
const domainStack = [];
let activeHost = null;

for (const line of lines.slice(1)) {
  const match = line.match(/^((?:\|   |    )*)(?:\+-- |`-- )(domain|state|kit|service|host|proof):\s+(.+)$/);

  if (!match) {
    if (line.trim().length > 0) {
      throw new Error(`Unrecognized tree line: ${line}`);
    }
    continue;
  }

  const depth = match[1].length / 4;
  const kind = match[2];
  const name = match[3].trim();

  if (kind === "domain") {
    activeHost = null;
    domainStack.length = depth;
    const parent = depth === 0 ? root : domainStack[depth - 1];

    if (!parent) {
      throw new Error(`Domain ${name} has no parent at source depth ${depth}.`);
    }

    const slug = slugify(name);
    const domain = {
      name,
      slug,
      path: `${parent.path}:${slug}`,
      parentPath: parent.path,
      sourceDepth: depth,
      states: [],
      kits: [],
      services: [],
    };

    domains.push(domain);
    domainStack[depth] = domain;
    continue;
  }

  if (kind === "host") {
    domainStack.length = 0;
    activeHost = {
      name,
      slug: slugify(name),
      kits: [],
    };
    hosts.push(activeHost);
    continue;
  }

  if (kind === "proof") {
    domainStack.length = 0;
    activeHost = null;
    proofs.push({ name, slug: slugify(name) });
    continue;
  }

  if (kind === "kit" && activeHost) {
    activeHost.kits.push(name);
    continue;
  }

  const owner = depth === 0 ? root : domainStack[depth - 1];

  if (!owner) {
    throw new Error(`${kind} ${name} has no owning domain at source depth ${depth}.`);
  }

  if (kind === "state") owner.states.push(name);
  if (kind === "kit") owner.kits.push(name);
  if (kind === "service") owner.services.push(name);
}

const duplicatePaths = domains
  .map((domain) => domain.path)
  .filter((domainPath, index, all) => all.indexOf(domainPath) !== index);

if (duplicatePaths.length > 0) {
  throw new Error(`Duplicate domain paths: ${Array.from(new Set(duplicatePaths)).join(", ")}`);
}

const naturalDomains = [root, ...domains];
const domainKits = naturalDomains.flatMap((domain) => domain.kits);
const hostKits = hosts.flatMap((host) => host.kits);
const allKits = [...domainKits, ...hostKits];

const blueprint = {
  schemaVersion: 1,
  source: {
    file: ".agent/horror-corridor-domain-tree.md",
    sha256: sha256(tree),
  },
  counts: {
    domains: domains.length,
    states: naturalDomains.reduce((total, domain) => total + domain.states.length, 0),
    kits: allKits.length,
    uniqueKits: new Set(allKits).size,
    domainKits: domainKits.length,
    hostKits: hostKits.length,
    services: naturalDomains.reduce((total, domain) => total + domain.services.length, 0),
    hosts: hosts.length,
    proofs: proofs.length,
    maxCompositionDepth: Math.max(...domains.map((domain) => domain.sourceDepth + 2)),
  },
  root,
  domains,
  hosts,
  proofs,
};
const serialized = `${JSON.stringify(blueprint, null, 2)}\n`;

if (checkOnly) {
  const current = await readFile(outputPath, "utf8").catch(() => "");

  if (current !== serialized) {
    console.error(`Domain blueprint is stale. Run: npm run domain:sync`);
    process.exitCode = 1;
  } else {
    console.log(
      `Domain blueprint is current: ${blueprint.counts.domains} domains, ${blueprint.counts.states} states, ${blueprint.counts.uniqueKits} unique kits.`,
    );
  }
} else {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, serialized, "utf8");
  console.log(
    `Wrote ${path.relative(projectRoot, outputPath)}: ${blueprint.counts.domains} domains, ${blueprint.counts.states} states, ${blueprint.counts.uniqueKits} unique kits.`,
  );
}
