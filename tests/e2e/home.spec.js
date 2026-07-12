import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    // Ensure React has mounted and rendered at least one child into #root
    await page.waitForSelector('#root > *', { timeout: 20000 })
  })

  test('page title contains name', async ({ page }) => {
    await expect(page).toHaveTitle(/Nitin/i)
  })

  test('hero section is visible with name and role', async ({ page }) => {
    // profile.name is rendered inside <h1><span>…</span></h1>
    await expect(page.locator('h1').filter({ hasText: /Nitin Prabhakaran/i })).toBeVisible()
  })

  test('navbar is visible and contains expected links', async ({ page }) => {
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link', { name: /about/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /experience/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /skills/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /certifications/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /projects/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /contact/i })).toBeVisible()
  })

  test('navbar RESUME link navigates to /resume', async ({ page }) => {
    const resumeLink = page.locator('nav').getByRole('link', { name: /resume/i })
    await expect(resumeLink).toHaveAttribute('href', /\/resume/)
  })

  test('about section is present', async ({ page }) => {
    await expect(page.locator('#about')).toBeVisible()
  })

  test('experience section renders at least one company entry', async ({ page }) => {
    const section = page.locator('#experience')
    await expect(section).toBeVisible()
    // Company names visible in the timeline
    await expect(section.getByText('Envestnet')).toBeVisible()
    await expect(section.getByText('Ericsson')).toBeVisible()
    // Ericsson multi-position: both roles should be visible
    await expect(section.getByText('DevOps Engineer')).toBeVisible()
    await expect(section.getByText('Implementation Engineer')).toBeVisible()
  })

  test('skills section is present and shows skill categories', async ({ page }) => {
    const section = page.locator('#skills')
    await expect(section).toBeVisible()
    await expect(section.getByText(/cloud/i).first()).toBeVisible()
  })

  test('certifications section shows all cert cards', async ({ page }) => {
    const section = page.locator('#certifications')
    await expect(section).toBeVisible()
    // CKA cert should be present
    await expect(section.getByText(/Certified Kubernetes Administrator/i)).toBeVisible()
  })

  test('certification cards have valid href attributes', async ({ page }) => {
    const section = page.locator('#certifications')
    const certLinks = section.locator('a')
    const count = await certLinks.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const href = await certLinks.nth(i).getAttribute('href')
      expect(href).toBeTruthy()
      expect(href.length).toBeGreaterThan(0)
    }
  })

  test('projects section is present and shows project names', async ({ page }) => {
    const section = page.locator('#projects')
    await expect(section).toBeVisible()
    await expect(section.getByText(/DevOps AI Agents/i)).toBeVisible()
  })

  test('contact section shows email and LinkedIn', async ({ page }) => {
    const section = page.locator('#contact')
    await expect(section).toBeVisible()
    await expect(section.getByText(/nitin3011.np@gmail.com/i)).toBeVisible()
    await expect(section.getByRole('link', { name: /linkedin/i })).toBeVisible()
  })

  test('contact links have correct href', async ({ page }) => {
    const section = page.locator('#contact')
    const linkedinLink = section.getByRole('link', { name: /linkedin/i })
    const href = await linkedinLink.getAttribute('href')
    expect(href).toContain('linkedin.com')
  })
})
