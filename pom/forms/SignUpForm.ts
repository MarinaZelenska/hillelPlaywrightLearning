import {Locator} from '@playwright/test'
import { expect } from '@playwright/test';
import { BaseForm } from './BaseForm';




export class SignUpForm extends BaseForm{

    readonly nameLocator: Locator = this.page.locator('#signupName');
    readonly lastNameLocator: Locator = this.page.locator('#signupLastName');
    readonly emailLocator: Locator = this.page.locator('#signupEmail');
    readonly passwordLocator: Locator = this.page.locator('#signupPassword');
    readonly repeatPasswordLocator: Locator = this.page.locator('#signupRepeatPassword');
    readonly errorMessageLocator: Locator = this.page.locator('.invalid-feedback');
    private readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });

    inputErrorMessageBorderColor = 'rgb(220, 53, 69)'; 
    
        async signUpWithCredentials({
            name = '',
            lastName = '',
            email = '',
            password = '',
            repeatPassword = '',
            clickRegister = true
        }: {
            name?: string;
            lastName?: string;
            email?: string;
            password?: string;
            repeatPassword?: string;
            clickRegister?: boolean;
        } = {}) {
            await this.nameLocator.fill(name);
            await this.lastNameLocator.fill(lastName);
            await this.emailLocator.fill(email);
            await this.passwordLocator.fill(password);
            await this.repeatPasswordLocator.fill(repeatPassword);
            await this.repeatPasswordLocator.press('Tab');
            if (clickRegister) {
                await this.registerButton.click();
            }
        };

        async triggerErrorOnInput(input: string){
            const inputs: Record<string, Locator> = {
                name: this.nameLocator,
                lastName: this.lastNameLocator,
                email: this.emailLocator,
                password: this.passwordLocator,
                repeatPassword: this.repeatPasswordLocator,
            };

            await inputs[input].focus();
            await inputs[input].blur();
        }

        async checkErrorMessageForInput(input: Locator, errorMessage: string){
            await expect(
                input.locator('xpath=following-sibling::div[contains(@class, "invalid-feedback")]')
            ).toHaveText(errorMessage);
            
        };

        async checkRegisterButtonDisabled(){
            await expect(this.registerButton).toBeDisabled();  
        };

        async checkErrorInputBorderColor(input: Locator) {
            await expect(input).toHaveCSS('border-color', this.inputErrorMessageBorderColor);
        };

        async checkThatUserIsRegistered()  {
            await expect(this.page.locator('.panel-page h1')).toHaveText('Garage');
        }



}