import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect(page.locator('h1')).toContainText('Playwright enables reliable web automation for testing, scripting, and AI agents.');
    await page.getByRole('heading', { name: 'Playwright enables reliable' }).click();
    await page.getByRole('link', { name: 'Docs' }).click();
    await page.getByRole('link', { name: 'Trace viewer' }).first().click();
    await page.getByRole('link', { name: 'Command line' }).click();
});