import { test as base } from '@playwright/test';

const username = process.env.HTTP_CREDENTIALS_USERNAME;
const password = process.env.HTTP_CREDENTIALS_PASSWORD;

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto(`https://${username}:${password}@qauto.forstudy.space/`);
    await use(page);
  },
});