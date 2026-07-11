import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const outFile = path.join(distDir, 'files', 'Resume_NitinPrabhakaran.pdf')

async function findPort() {
  return new Promise((resolve) => {
    const server = http.createServer()
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port
      server.close(() => resolve(port))
    })
  })
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ does not exist. Run npm run build first.')
    process.exit(1)
  }

  const port = await findPort()
  const server = await createServer({
    root: distDir,
    base: '/',
    server: { port, host: '127.0.0.1' },
  })
  await server.listen()

  const url = `http://127.0.0.1:${port}/resume`
  console.log(`🌐 Serving ${url}`)

  let browser
  try {
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle' })

    // Wait for fonts and layout to settle
    await page.waitForTimeout(1000)

    await page.pdf({
      path: outFile,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })

    console.log(`✅ Generated ${path.relative(root, outFile)}`)
  } finally {
    if (browser) await browser.close()
    await server.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
