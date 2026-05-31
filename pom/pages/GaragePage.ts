import {Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';


export class GaragePage extends BasePage{

    private readonly addCarButton: Locator = this.page.getByRole('button', { name: 'Add car' });

    async navigate() {
        await this.page.goto('/panel/garage');
    }

    async openCreateAddCarModal() {
        await this.addCarButton.click();
    }

}