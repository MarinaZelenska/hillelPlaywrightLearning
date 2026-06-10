import { test, expect } from '@playwright/test';
import { STORAGE_STATE } from '../utils/authConstants';

test.describe('Profile page - response body mocking', () => {

    test('mocked profile data is displayed on the page', async ({ browser }) => {
        const mockedProfile = {
            status: 'ok',
            data: {
                userId: 1,
                photoFilename: 'default-user.png',
                name: 'Bob',
                lastName: 'Sponge',
                dateBirth: '1992-12-02T00:00:00.000Z',
                country: 'Ukraine',
            }
        };

        const context = await browser.newContext({
            storageState: STORAGE_STATE,
            httpCredentials: {
                username: process.env.HTTP_CREDENTIALS_USERNAME!,
                password: process.env.HTTP_CREDENTIALS_PASSWORD!,
            }
        });

        const page = await context.newPage();

        // Register the interceptor BEFORE navigation so the request is caught
        await page.route('**/api/users/profile', async (route) => {
            const originalResponse = await route.fetch();
            await route.fulfill({
                response: originalResponse,
                json: mockedProfile,
            });
        });

        await page.goto('/panel/profile');

        await expect(page.locator('.profile_name')).toHaveText(`${mockedProfile.data.name} ${mockedProfile.data.lastName}`);
        await expect(page.locator('.profile-info_text').first()).toHaveText('02.12.1992');
        await expect(page.locator('.profile-info_text').nth(1)).toHaveText(mockedProfile.data.country);

        await context.close();
    });

});
