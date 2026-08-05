const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('road-signs.js', 'utf8');
const context = {window: {}};
vm.createContext(context);
vm.runInContext(source, context);
const signs = context.window.ROADQUEST_SIGNS;
const required = ['id', 'name', 'cat', 'shape', 'palette', 'glyph', 'meaning', 'action'];
const errors = [];
const ids = new Set();

if (!Array.isArray(signs)) errors.push('ROADQUEST_SIGNS must be an array');
else signs.forEach((sign, index) => {
  required.forEach(key => { if (!sign[key]) errors.push(`Sign ${index}: missing ${key}`); });
  if (ids.has(sign.id)) errors.push(`Sign ${index}: duplicate id ${sign.id}`);
  ids.add(sign.id);
});

if (errors.length) {
  console.error(`Sign validation failed with ${errors.length} issue(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Validated ${signs.length} road signs.`);
