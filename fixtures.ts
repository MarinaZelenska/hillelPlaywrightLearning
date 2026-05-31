import { test as base } from '@playwright/test';
import { GaragePage } from './pom/pages/GaragePage';
import { STORAGE_STATE } from './utils/authConstants';

type MyFixtures = {
    userGaragePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
    page: async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    },

    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: STORAGE_STATE,
            httpCredentials: {
                username: process.env.HTTP_CREDENTIALS_USERNAME!,
                password: process.env.HTTP_CREDENTIALS_PASSWORD!,
            },
        });
        const page = await context.newPage();
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage);
        await context.close();
    },
});
