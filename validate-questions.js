const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'questions.json');
const questions = JSON.parse(fs.readFileSync(file, 'utf8'));
const required = ['id', 'cat', 'q', 'a', 'correct', 'why'];
const errors = [];
const ids = new Set();
const normalizedQuestions = new Set();

questions.forEach((item, index) => {
  const label = `Question index ${index}`;
  for (const key of required) {
    if (!(key in item)) errors.push(`${label}: missing ${key}`);
  }
  if (!Number.isInteger(item.id) || item.id < 1) errors.push(`${label}: invalid id`);
  if (ids.has(item.id)) errors.push(`${label}: duplicate id ${item.id}`);
  ids.add(item.id);
  if (!Array.isArray(item.a) || item.a.length !== 4) errors.push(`${label}: answers must contain exactly 4 choices`);
  if (!Number.isInteger(item.correct) || item.correct < 0 || item.correct > 3) errors.push(`${label}: correct must be 0-3`);
  const normalized = String(item.q || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (normalizedQuestions.has(normalized)) errors.push(`${label}: duplicate question text`);
  normalizedQuestions.add(normalized);
});

const sortedIds = [...ids].sort((a, b) => a - b);
for (let i = 1; i < sortedIds.length; i += 1) {
  if (sortedIds[i] !== sortedIds[i - 1] + 1) {
    errors.push(`ID gap between ${sortedIds[i - 1]} and ${sortedIds[i]}`);
  }
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} issue(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validated ${questions.length} questions (IDs ${sortedIds[0]}-${sortedIds.at(-1)}).`);
