import { test, expect } from '@playwright/test';

test.describe('Admin CMS End-to-End (Read Only)', () => {
  // Mock login by setting a dummy cookie or testing the login UI first
  // For safety in this audit against the live DB, we will just verify the login page renders
  // and the sidebar links exist if we can access the dashboard.
  
  test('Admin Login page renders and validates', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Check for the login form
    await expect(page.locator('h1', { hasText: 'Admin Portal' })).toBeVisible();
    
    // Attempt login with no credentials to trigger validation
    await page.getByRole('button', { name: /Sign In/i }).click();
    
    // Check for error boundary or validation message (assuming basic HTML5 validation or custom state)
    // The inputs should be marked invalid
    const emailInput = page.locator('input[type="email"]');
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBe(false);
  });

  // Note: Testing the actual CMS pages requires authentication. 
  // A standard practice is to use Playwright's APIRequestContext to sign in via Supabase API
  // and inject the session cookie. For this initial audit, we verify the protected route bounces us back.
  
  test('Protected CMS routes redirect unauthenticated users', async ({ page }) => {
    await page.goto('/admin/dashboard/activities');
    // It should redirect to the login page (or throw a 401/403 which Next.js middleware handles)
    await expect(page).toHaveURL(/.*\/admin\/login/);
  });
});
