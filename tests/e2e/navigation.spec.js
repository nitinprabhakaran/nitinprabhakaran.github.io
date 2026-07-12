import { test, expect } from '@playwright/test'

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('mobile menu button is visible on small screens', async ({ page }) => {
    // Desktop nav items should be hidden; hamburger button should be visible
    const menuBtn = page.locator('nav button').filter({ hasText: '' }).first()
    await expect(menuBtn).toBeVisible()
  })

  test('mobile menu opens and shows section links', async ({ page }) => {
    // Find and click the hamburger
    const menuBtn = page.locator('nav button').first()
    await menuBtn.click()
    // After opening, section links become visible
    await expect(page.getByRole('link', { name: /about/i }).last()).toBeVisible()
    await expect(page.getByRole('link', { name: /experience/i }).last()).toBeVisible()
  })
})

test.describe('Navigation scroll behaviour', () => {
  test('clicking a nav anchor scrolls to the target section', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /experience/i }).first().click()
    // Allow scroll animation
    await page.waitForTimeout(800)
    const section = page.locator('#experience')
    const box = await section.boundingBox()
    expect(box).not.toBeNull()
    // Section should be near the top of the viewport after scroll
    expect(box.y).toBeLessThan(300)
  })
})

test.describe('Page routing', () => {
  test('navigating to /resume and back works', async ({ page }) => {
    await page.goto('/')
    await page.locator('nav').getByRole('link', { name: /resume/i }).click()
    await expect(page).toHaveURL(/\/resume/)
    await expect(page.getByTestId('resume-name')).toBeVisible()
  })

  test('unknown route falls back gracefully', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist')
    // SPA should still serve index.html (200 or handled by GH Pages 404)
    // At minimum the page should not crash the browser
    expect([200, 404]).toContain(response?.status())
  })
})
