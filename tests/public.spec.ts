import { test, expect } from '@playwright/test';

test.describe('Public Pages End-to-End', () => {
  test('Home page renders correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check if Navbar is present
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for "Join ITSA" primary CTA
    await expect(page.locator('text=Join ITSA').first()).toBeVisible();
    
    // Check for footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('About page renders correctly', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Activities page renders correctly', async ({ page }) => {
    await page.goto('/activities');
    await expect(page.locator('text=Events & Activities').first()).toBeVisible();
  });

  test('Academic Bank dropdown navigates correctly', async ({ page }) => {
    await page.goto('/');
    
    // Hover over Academic Bank to reveal dropdown
    const academicBankBtn = page.getByRole('button', { name: /Academic Bank/i });
    await academicBankBtn.hover();
    
    // Click on Lecture Slides
    const slidesLink = page.getByRole('link', { name: /Lecture Slides/i });
    await expect(slidesLink).toBeVisible();
    await slidesLink.click();
    
    // Verify navigation
    await expect(page).toHaveURL(/.*\/academic-bank\/slides/);
  });
});
