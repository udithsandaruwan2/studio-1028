# Branching & release workflow

Studio 1028 uses a **feature → develop → main** flow. Development always integrates on `develop`. `main` stays protected until you explicitly approve a release.

## Branch roles

```
feature/* ──merge──► develop ──(only when you say)──► main
```

| Branch | Purpose |
|--------|---------|
| **`main`** | Production / stable. Updated **only when you say** to merge or release. |
| **`develop`** | Active integration line. Finished features are merged here automatically. |
| **`feature/*`** (or `fix/*`) | Short-lived branches for every change set. Commits land here first. |

## Rules (always)

1. **Do not work directly on `main`.**
2. **Do not commit feature work directly on `develop`.** Create a feature branch first.
3. **Every change** gets its own branch, with commits on that branch as work progresses.
4. When a feature branch is **finished**, merge it into **`develop`** (do not wait for a separate instruction unless you pause the work).
5. **Never merge into `main`** until you explicitly ask (e.g. “merge develop into main” or “release to main”).

## Day-to-day steps

### Start work

```bash
git checkout develop
git pull origin develop   # when a remote exists
git checkout -b feature/short-description
```

### While working

```bash
# edit files…
git add <files>
git commit -m "Clear message focused on why"
# stay on the feature branch; commit again as needed
```

### Finish a feature (merge into develop)

```bash
git checkout develop
git merge --no-ff feature/short-description
# optional: delete the local feature branch after merge
git branch -d feature/short-description
```

Push `develop` (and the feature branch if you want remote backup) when remotes are in use. Still **do not** merge to `main` unless asked.

### Release to main (only when requested)

```bash
git checkout main
git merge --no-ff develop
git tag -a vX.Y.Z -m "Release vX.Y.Z"   # optional
```

## Branch naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<kebab>` | `feature/studio-landing` |
| Bug fix | `fix/<kebab>` | `fix/nav-overlay` |
| Chore / docs | `chore/<kebab>` or `docs/<kebab>` | `docs/branching-workflow` |

## What agents must do

- Create a feature (or fix/docs) branch for each change set.
- Commit on that branch; do not leave large unfinished work only on `develop`/`main`.
- After the feature is complete, merge into **`develop`** automatically.
- Treat **`main` as locked** until you give an explicit merge/release instruction.
- Prefer this doc and `.cursor/rules/git-branching-workflow.mdc` over ad-hoc branching.

## Diagram

```text
main      ●─────────────────────────────●────  (release only on request)
          │                             ▲
          │                             │ explicit merge
develop   ●────●────●────●────●────●────●────  (integration)
               ▲    ▲         ▲
               │    │         │
feature/a  ────●────┘         │
feature/b  ──────────●────────┘
```
