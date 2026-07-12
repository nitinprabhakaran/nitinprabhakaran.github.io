import { test, expect } from '@playwright/test'

test.describe('Resume page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resume')
  })

  test('resume page loads and shows candidate name', async ({ page }) => {
    await expect(page.getByTestId('resume-name')).toBeVisible()
    await expect(page.getByTestId('resume-name')).toHaveText('Nitin Prabhakaran')
  })

  test('download PDF button is visible and enabled', async ({ page }) => {
    const btn = page.getByTestId('download-pdf-btn')
    await expect(btn).toBeVisible()
    await expect(btn).toBeEnabled()
    await expect(btn).toContainText(/Download PDF/i)
  })

  test('download PDF button triggers window.print', async ({ page }) => {
    // Override window.print before the page script runs via addInitScript,
    // then reload so the override is active from the start.
    await page.addInitScript(() => {
      window.__printCalled = false
      window.print = () => { window.__printCalled = true }
    })
    await page.reload()

    await page.getByTestId('download-pdf-btn').click()

    // Poll the browser-side flag – exposeFunction is async across the boundary
    // so we use expect.poll which retries until true or timeout.
    await expect.poll(() => page.evaluate(() => window.__printCalled)).toBe(true)
  })

  test('resume shows Professional Summary section', async ({ page }) => {
    await expect(page.getByText(/Professional Summary/i)).toBeVisible()
    // Summary text snippet
    await expect(page.getByText(/DevOps leader/i)).toBeVisible()
  })

  test('resume shows Experience section with all jobs', async ({ page }) => {
    await expect(page.getByText(/Experience/i).first()).toBeVisible()
    await expect(page.getByText('Envestnet')).toBeVisible()
    await expect(page.getByText('Ameriprise Financial')).toBeVisible()
    await expect(page.getByText('Rakuten')).toBeVisible()
    await expect(page.getByText('Ericsson')).toBeVisible()
  })

  test('resume shows Technical Skills section', async ({ page }) => {
    await expect(page.getByText(/Technical Skills/i)).toBeVisible()
    await expect(page.getByText(/Terraform/i)).toBeVisible()
    await expect(page.getByText(/Kubernetes/i)).toBeVisible()
  })

  test('resume shows Key Projects section', async ({ page }) => {
    await expect(page.getByText(/Key Projects/i)).toBeVisible()
    await expect(page.getByText(/DevOps AI Agents Platform/i)).toBeVisible()
    await expect(page.getByText(/Internal Developer Platform/i)).toBeVisible()
  })

  test('resume shows Certifications section', async ({ page }) => {
    await expect(page.getByText(/Certifications/i).first()).toBeVisible()
    await expect(page.getByText(/Certified Kubernetes Administrator/i)).toBeVisible()
    await expect(page.getByText(/RHCSA|RedHat Certified System Administrator/i).first()).toBeVisible()
  })

  test('resume header contains contact details', async ({ page }) => {
    await expect(page.getByText('nitin3011.np@gmail.com')).toBeVisible()
    await expect(page.getByText('India')).toBeVisible()
    await expect(page.getByRole('link', { name: /linkedin.com/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /github.com/i })).toBeVisible()
  })

  test('resume LinkedIn link points to correct profile', async ({ page }) => {
    const link = page.getByRole('link', { name: /linkedin.com\/in\/nitinprabhakaran/i })
    await expect(link).toHaveAttribute('href', /linkedin.com\/in\/nitinprabhakaran3011/)
  })

  test('resume GitHub link points to correct profile', async ({ page }) => {
    const link = page.getByRole('link', { name: /github.com\/nitinprabhakaran/i })
    await expect(link).toHaveAttribute('href', /github.com\/nitinprabhakaran/)
  })
})
