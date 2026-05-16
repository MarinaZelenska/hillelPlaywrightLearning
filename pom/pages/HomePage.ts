import {Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';


export class HomePage extends BasePage{

    private readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up' });;

    async openSignUpForm() {
        await this.signUpButton.click()
    }






}