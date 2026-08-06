import { readFileSync, writeFileSync } from 'node:fs'

const SOURCE_DIR = 'C:/Users/human/Documents/카카오톡 받은 파일/K-Tour-AI_백엔드전달_v2/data'

const translations = JSON.parse(readFileSync(`${SOURCE_DIR}/display_translations.json`, 'utf8'))
const overrides = JSON.parse(readFileSync(`${SOURCE_DIR}/display_translation_overrides.json`, 'utf8'))

const merged = {}
for (const record of translations.records) {
  merged[record.keyframe_id] = structuredClone(record.translations)
}

for (const override of overrides.records) {
  const target = merged[override.keyframe_id]
  if (!target) {
    throw new Error(`Override references unknown keyframe_id: ${override.keyframe_id}`)
  }
  for (const [lang, fields] of Object.entries(override.translations)) {
    Object.assign(target[lang], fields)
  }
}

writeFileSync('src/data/segmentTranslations.json', JSON.stringify(merged, null, 2) + '\n')
console.log(`Wrote ${Object.keys(merged).length} translation records to src/data/segmentTranslations.json`)
