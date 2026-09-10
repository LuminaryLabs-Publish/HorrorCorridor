import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Local preservation only. Never stages, cleans, resets, or changes a worktree.
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const git = (cwd, ...args) => execFileSync('git', ['-C', cwd, ...args], { maxBuffer: 64 * 1024 * 1024 });
const text = (cwd, ...args) => git(cwd, ...args).toString().trim();
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const baseline = '539982a8764ade914659e4b912a2d56b6cb5337e';
const common = resolve(root, text(root, 'rev-parse', '--git-common-dir'));
const archive = join(common, 'overhaul-preservation', new Date().toISOString().replaceAll(':', '-'));
mkdirSync(archive, { recursive: true });
const records = [];
for (const block of text(root, 'worktree', 'list', '--porcelain').split('\n\n')) {
  const lines = block.split('\n');
  const path = lines.find(line => line.startsWith('worktree '))?.slice(9);
  if (!path) continue;
  const head = text(path, 'rev-parse', 'HEAD');
  const dirty = git(path, 'status', '--porcelain=v1', '-z');
  const diff = git(path, 'diff', '--binary', 'HEAD');
  const index = records.length;
  const patchPath = join(archive, `${index}.patch`);
  writeFileSync(patchPath, diff, { flag: 'wx' });
  if (hash(readFileSync(patchPath)) !== hash(diff)) throw new Error('Patch readback failed');
  const untracked = git(path, 'ls-files', '--others', '--exclude-standard', '-z').toString().split('\0').filter(Boolean);
  const files = untracked.map((name, number) => {
    const bytes = readFileSync(join(path, name));
    const copy = join(archive, `${index}-untracked-${number}`);
    writeFileSync(copy, bytes, { flag: 'wx' });
    if (hash(readFileSync(copy)) !== hash(bytes)) throw new Error('Untracked readback failed');
    return { name, sha256: hash(bytes), archiveFile: copy };
  });
  records.push({ path, head, branch: lines.find(line => line.startsWith('branch '))?.slice(7) ?? null,
    status: dirty.toString().split('\0').filter(Boolean),
    uniqueCommits: text(path, 'log', '--format=%H %s', `${baseline}..HEAD`).split('\n').filter(Boolean),
    patchPath, patchSha256: hash(diff), untracked: files,
    disposition: diff.length || files.length ? 'preserved-local-unmerged' : 'retained-reference' });
}
const bundle = join(archive, 'repository.bundle');
git(root, 'bundle', 'create', bundle, '--all');
git(root, 'bundle', 'verify', bundle);
const report = { schema: 'horror-corridor.preservation/1', baseline, createdAt: new Date().toISOString(),
  archive, bundle, bundleSha256: hash(readFileSync(bundle)), worktrees: records,
  limits: ['Local backup, not off-device preservation.', 'Restore/build/player proof must pass separately.', 'No worktree is eligible for deletion based on this inventory.'] };
writeFileSync(join(archive, 'manifest.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify(report, null, 2));
