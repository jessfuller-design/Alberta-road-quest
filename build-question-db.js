const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'data');
const packPattern = /^pack-\d+.*\.json$/;
const packFiles = fs.readdirSync(dataDir).filter(name => packPattern.test(name)).sort();

if (!packFiles.length) {
  console.log('No pack files found; keeping the existing questions database.');
  process.exit(0);
}

const byId = new Map();
const baseFile = path.join(dataDir, 'questions.json');
if (fs.existsSync(baseFile)) {
  for (const question of JSON.parse(fs.readFileSync(baseFile, 'utf8'))) byId.set(question.id, question);
}

for (const packFile of packFiles) {
  const pack = JSON.parse(fs.readFileSync(path.join(dataDir, packFile), 'utf8'));
  if (!Array.isArray(pack)) throw new Error(`${packFile} must contain a JSON array.`);
  for (const question of pack) byId.set(question.id, question);
}

const questions = [...byId.values()].sort((a, b) => a.id - b.id);
fs.writeFileSync(baseFile, JSON.stringify(questions, null, 2) + '\n');
fs.writeFileSync(path.join(dataDir, 'questions.js'), `window.QUESTIONS = ${JSON.stringify(questions, null, 2)};\n`);
console.log(`Built database with ${questions.length} questions from ${packFiles.length} pack(s).`);
