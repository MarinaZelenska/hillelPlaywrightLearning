import { test } from '../fixtures';
import { HomePage } from '../pom/pages/HomePage';
import { SignUpForm } from '../pom/forms/SignUpForm'
import {
    generateValidRegisterData,
    generateInvalidCharactersNameData,
    generateTooShortNameData,
    generateInvalidEmailData,
    generateInvalidPasswordData,
    generateMismatchedPasswordsData,
} from '../utils/data/credentials'


test('Check that user can register with valid data', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpForm = new SignUpForm(page);

    const validCredentials = generateValidRegisterData();
    
    await homePage.openSignUpForm();
    await signUpForm.signUpWithCredentials({ ...validCredentials, repeatPassword: validCredentials.password });

    await signUpForm.checkThatUserIsRegistered();

});


test.describe('Negative tests for registration form', () => {


    let homePage: HomePage;
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        await homePage.openSignUpForm();
      });

    test('Check require error messages', async () => {

        await signUpForm.triggerErrorOnInput('name');
        await signUpForm.checkErrorMessageForInput(signUpForm.nameLocator, 'Name required');

        await signUpForm.triggerErrorOnInput('lastName');
        await signUpForm.checkErrorMessageForInput(signUpForm.lastNameLocator, 'Last name required');

        await signUpForm.triggerErrorOnInput('email');
        await signUpForm.checkErrorMessageForInput(signUpForm.emailLocator, 'Email required');

        await signUpForm.triggerErrorOnInput('password');
        await signUpForm.checkErrorMessageForInput(signUpForm.passwordLocator, 'Password required');

        await signUpForm.triggerErrorOnInput('repeatPassword');
        await signUpForm.checkErrorMessageForInput(signUpForm.repeatPasswordLocator, 'Re-enter password required');

        await signUpForm.checkRegisterButtonDisabled(); 
    });

    test('Check invalid name and last name error messages', async () => {
        await signUpForm.signUpWithCredentials({ ...generateInvalidCharactersNameData(), clickRegister: false });

        await signUpForm.checkErrorMessageForInput(signUpForm.nameLocator, 'Name is invalid');
        await signUpForm.checkErrorInputBorderColor(signUpForm.nameLocator);
        await signUpForm.checkErrorMessageForInput(signUpForm.lastNameLocator, 'Last name is invalid');
        await signUpForm.checkErrorInputBorderColor(signUpForm.lastNameLocator);    
    });

    test('Check error with invalid character counts for name and last name', async ({page}) => {
        await signUpForm.signUpWithCredentials({ ...generateTooShortNameData(), clickRegister: false });

        await signUpForm.checkErrorMessageForInput(signUpForm.nameLocator, 'Name has to be from 2 to 20 characters long');
        await signUpForm.checkErrorInputBorderColor(signUpForm.nameLocator);
        await signUpForm.checkErrorMessageForInput(signUpForm.lastNameLocator, 'Last name has to be from 2 to 20 characters long');
        await signUpForm.checkErrorInputBorderColor(signUpForm.lastNameLocator);  

    });

    test('Check error message for invalid email', async () => {
        await signUpForm.signUpWithCredentials({ ...generateInvalidEmailData(), clickRegister: false });

        await signUpForm.checkErrorMessageForInput(signUpForm.emailLocator, 'Email is incorrect');
        await signUpForm.checkErrorInputBorderColor(signUpForm.emailLocator);

    });

    test('Check error message for invalid password and re-password', async () => {
        const errorMessage = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
        
        const invalidPassword = generateInvalidPasswordData();
        await signUpForm.signUpWithCredentials({ ...invalidPassword, repeatPassword: invalidPassword.password, clickRegister: false });

        await signUpForm.checkErrorMessageForInput(signUpForm.passwordLocator, errorMessage);
        await signUpForm.checkErrorInputBorderColor(signUpForm.passwordLocator);
        await signUpForm.checkErrorMessageForInput(signUpForm.repeatPasswordLocator, errorMessage);
        await signUpForm.checkErrorInputBorderColor(signUpForm.repeatPasswordLocator);

    });

    test('Check error message when password and re-password are different', async () => {
        await signUpForm.signUpWithCredentials({ ...generateMismatchedPasswordsData(), clickRegister: false });

        await signUpForm.checkErrorMessageForInput(signUpForm.repeatPasswordLocator, 'Passwords do not match');
        await signUpForm.checkErrorInputBorderColor(signUpForm.repeatPasswordLocator);

    });


  });