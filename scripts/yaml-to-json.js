import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const yamlContent = fs.readFileSync(path.join(root, 'resume.yaml'), 'utf8')
const data = yaml.load(yamlContent)

const outDir = path.join(root, 'src', 'data')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

fs.writeFileSync(
  path.join(outDir, 'resume.json'),
  JSON.stringify(data, null, 2)
)

console.log('✅ resume.yaml → src/data/resume.json')
