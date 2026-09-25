# docs

Everything an agent (or a person) needs that the code cannot say for itself.
Same layout as valtiberina.travel, so the `/execute-tasks` workflow and habits
carry over between projects.

| Folder | What goes in it | Lifecycle |
|---|---|---|
| `prds/` | Product requirements: the *why* and *what* of a feature, written before any design | Stays while the feature exists |
| `specs/` | Technical design for a PRD: data model, components, edge cases | Stays while the feature exists |
| `plans/` | Working plans for a change that is not a feature (a refactor, an upgrade, a review) | Moves to `archive/plans/` when done |
| `tasks/` | Checklists driven by `/execute-tasks path/to/tasks.md` — `- [ ]` items with a `**Complexity:**` marker (XS/S/M/L) | Moves to `archive/tasks/` when every box is ticked |
| `runbooks/` | Rules that break *silently* and the procedure to follow before touching them. `AGENTS.md` lists when to read each one | Kept current; dated when revised |
| `archive/` | Finished plans and task files, kept for the reasoning | Read-only |

Naming: `kebab-case.md`; a feature's files share a stem across folders
(`prds/redesign.md` → `specs/redesign_spec.md` → `tasks/redesign-tasks.md`).
