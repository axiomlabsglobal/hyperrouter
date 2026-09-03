const fs = require('fs');

let lines = fs.readFileSync('src/i18n/translations.ts', 'utf8').split('\n');

const seenKeys = new Set();
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('export type TranslationDict = {') || line.includes('export const translations: Record<Locale, TranslationDict> = {') || line.includes('  en: {') || line.includes('  ko: {') || line.includes('  ja: {') || line.includes('  de: {') || line.includes('  es: {') || line.includes('  fr: {') || line.includes('};')) {
    newLines.push(line);
    if (line.includes('{')) {
      seenKeys.clear(); // Reset keys for new block
    }
    continue;
  }

  const match = line.match(/^\s*"([^"]+)":/);
  if (match) {
    const key = match[1];
    if (seenKeys.has(key)) {
      console.log('Removed duplicate:', key);
      continue;
    }
    seenKeys.add(key);
  }
  newLines.push(line);
}

fs.writeFileSync('src/i18n/translations.ts', newLines.join('\n'));
