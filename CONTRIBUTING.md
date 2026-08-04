# Contributing question packs

1. Add a JSON array in `data/` using the next permanent ID range.
2. Keep the backward-compatible fields: `id`, `cat`, `q`, `a`, `correct`, and `why`.
3. Use exactly four answer choices. `correct` is a zero-based index from 0 to 3.
4. Add source metadata and useful tags whenever possible.
5. Run `npm run check` before committing.

Question IDs are permanent and must never be reused or renumbered.
