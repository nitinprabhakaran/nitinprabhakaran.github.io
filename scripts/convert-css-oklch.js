import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Color from 'colorjs.io'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const OKLCH_RE = /oklch\(([^)]+)\)/g
const OKLAB_RE = /oklab\(([^)]+)\)/g

function toHex(match) {
  try {
    const c = new Color(match)
    return c.to('srgb').toString({ format: 'hex' })
  } catch {
    return match
  }
}

function convertFile(filePath) {
  if (!fs.existsSync(filePath)) return
  let css = fs.readFileSync(filePath, 'utf8')
  const original = css
  css = css.replace(OKLCH_RE, toHex)
  css = css.replace(OKLAB_RE, toHex)
  if (css !== original) {
    fs.writeFileSync(filePath, css)
    console.log(`✅ Converted oklch/oklab → hex in ${path.relative(root, filePath)}`)
  }
}

const distAssets = path.join(root, 'dist', 'assets')
if (fs.existsSync(distAssets)) {
  for (const entry of fs.readdirSync(distAssets)) {
    if (entry.endsWith('.css')) {
      convertFile(path.join(distAssets, entry))
    }
  }
}
