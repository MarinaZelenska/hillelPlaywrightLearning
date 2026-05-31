import { test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../../utils/authConstants';

setup('authenticate user', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('#signinEmail').fill(process.env.USER_EMAIL!);
    await page.locator('#signinPassword').fill(process.env.USER_PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/panel/garage');
    await page.context().storageState({ path: STORAGE_STATE });
});
