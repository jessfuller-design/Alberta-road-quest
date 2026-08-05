# Road Quest Question Database

The database contains 547 questions and preserves the original app fields while allowing optional metadata:

```json
{
  "cat": "Licensing",
  "q": "Question text",
  "a": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
  "correct": 0,
  "why": "Answer explanation"
}
```

## Files

- `questions.js` is loaded by the offline app and exposes `window.ROADQUEST_QUESTIONS`.
- `questions.json` is the editable/importable source database.

## Query helper

The browser also exposes `window.RoadQuestDB`:

- `RoadQuestDB.all()`
- `RoadQuestDB.categories()`
- `RoadQuestDB.byCategory("Highways")`
- `RoadQuestDB.search("right-of-way")`
- `RoadQuestDB.random(20, "Intersections")`

To add questions, place a numbered pack file at the repository root and run `npm run check`. The build merges new IDs into `questions.json`, regenerates `questions.js`, and validates the full bank.


Pack 006 adds 50 questions, IDs 278-327.

- `pack-007-ids-328-377.json`: 50-question expansion covering Chapters 7 and 8.
- `pack-008-ids-378-427.json`: 50-question expansion covering Chapters 9 and 10.
- `pack-009-ids-428-477.json`: 50-question expansion covering zones, signals, parking, intersections, roundabouts, and turns.
- `pack-010-ids-478-527.json`: 50-question expansion covering warning signs, pavement markings, and foundational vehicle control.
- `pack-011-ids-528-547.json`: 20-question licence condition and endorsement code expansion, paired with the in-app Licence Code Decoder.
