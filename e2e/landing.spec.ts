import { test, expect } from '@playwright/test'

test.describe('Landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders hero, product overview, how it works, and footer sections', async ({ page }) => {
    const sections = [
      { testId: 'landing-hero', name: /don't throw it away/i },
      { testId: 'landing-overview', name: /every loop of the lifecycle/i },
      { testId: 'landing-how-it-works', name: /escrow in four steps/i },
    ]

    for (const { testId, name } of sections) {
      const section = page.getByTestId(testId)
      await section.scrollIntoViewIfNeeded()
      await expect(section).toBeVisible()
      // Scroll-reveal animations must settle with the heading in view
      await expect(section.getByRole('heading', { name })).toBeVisible()
    }

    const footer = page.locator('footer[data-testid="landing-footer"]')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeInViewport()
    await expect(footer.getByText(/© \d{4} Veloxous/i)).toBeVisible()
  })

  test('hero CTA links point at the connect and marketplace routes', async ({ page }) => {
    await expect(page.getByTestId('cta-connect')).toHaveAttribute('href', '/connect')
    await expect(page.getByTestId('cta-explore')).toHaveAttribute('href', '/marketplace')
  })

  test('navigates to the marketplace via the primary CTA', async ({ page }) => {
    await page.getByTestId('cta-explore').click()
    await expect(page).toHaveURL(/\/marketplace$/)
  })
})
