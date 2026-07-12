import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

let data
try {
  const yamlContent = fs.readFileSync(path.join(root, 'resume.yaml'), 'utf8')
  data = yaml.load(yamlContent)
} catch (err) {
  console.error('\n❌ Failed to parse resume.yaml:')
  console.error(err.message)
  process.exit(1)
}

const outDir = path.join(root, 'src', 'data')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

fs.writeFileSync(
  path.join(outDir, 'resume.json'),
  JSON.stringify(data, null, 2)
)

console.log('\u2705 resume.yaml \u2192 src/data/resume.json')
