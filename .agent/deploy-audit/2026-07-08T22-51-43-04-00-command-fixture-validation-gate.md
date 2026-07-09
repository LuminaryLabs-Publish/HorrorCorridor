# HorrorCorridor Command Fixture Validation Gate

**Repository:** `LuminaryLabs-Publish/HorrorCorridor`

**Timestamp:** `2026-07-08T22-51-43-04-00`

## Current package scripts

```txt
npm run dev
npm run build
npm run start
npm run lint
npm run harness:horror-corridor
npm run live-agent
npm run live-agent:sample
npm run review:live-agent
npm run review:object-kit
npm run smoke:protokits
npm run visual:match
npm run validate:live-player
npm run validate:live-player:dev
```

## Missing deploy/fixture script

```txt
node scripts/horror-corridor-command-fixture.mjs
```

The script does not exist yet.

After adding it, add a package script such as:

```json
"fixture:commands": "node scripts/horror-corridor-command-fixture.mjs"
```

## Validation order for the next implementation

```txt
1. node scripts/horror-corridor-command-fixture.mjs
2. npm run lint
3. npm run smoke:protokits
4. npm run harness:horror-corridor
5. npm run validate:live-player:dev
```

## Static safety rule

Do not make Pages/deploy route changes in the command fixture pass unless a package or CI script requires the new fixture command.

## Expected fixture output

```txt
rows passed
rows failed
fixture id
command id
status
reason
publish decision
consumer action
before summary
after summary
final snapshot summary
volatile fields normalized
```

## Current validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
local npm run lint: no
local npm run smoke:protokits: no
local npm run harness:horror-corridor: no
node command fixture: no, script does not exist yet
browser smoke: no
pushed to main: yes
```
