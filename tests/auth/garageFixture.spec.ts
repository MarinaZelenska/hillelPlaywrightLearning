import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Garage with userGaragePage fixture', () => {

    test('Garage page is visible for authenticated user', async ({ userGaragePage }) => {
        await expect(userGaragePage.page.getByRole('button', { name: 'Add car' })).toBeVisible();
    });

});
