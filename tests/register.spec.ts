import { test } from '../fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


const nameLocator = '#signupName';
const lastNameLocator = '#signupLastName';
const emailLocator = '#signupEmail';
const passwordLocator = '#signupPassword';
const repeatPasswordLocator = '#signupRepeatPassword';
const errorMessageLocator = '.invalid-feedback';

const inputErrorMessageBorderColor = 'rgb(220, 53, 69)'

test('Check that user can register with valid data', async ({ page }) => {
    const email = `aqa_${faker.internet.email()}`;
    const password = `${faker.string.alpha({ length: 1, casing: 'upper' })}${faker.string.alpha({ length: 6, casing: 'lower' })}${faker.number.int({ min: 10, max: 99 })}`;
    const name = faker.person.firstName();
    const lastName =  faker.person.lastName();

    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator(nameLocator).fill(name);
    await page.locator(lastNameLocator).fill(lastName);
    await page.locator(emailLocator).fill(email);
    await page.locator(passwordLocator).fill(password);
    await page.locator(repeatPasswordLocator).fill(password);
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page.locator('.panel-page h1')).toHaveText('Garage');

});


test.describe('Negative tests for registration form', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'Sign up' }).click();
      });

    test('Check require error messages', async ({ page }) => {
        await page.locator(nameLocator).click();
        await page.locator(lastNameLocator).click();
        await page.locator(emailLocator).click();
        await page.locator(passwordLocator).click();
        await page.locator(repeatPasswordLocator).click();
        await page.locator(repeatPasswordLocator).press('Tab');

        await expect(page.locator(`${nameLocator} + ${errorMessageLocator}`)).toHaveText('Name required');
        await expect(page.locator(`${lastNameLocator} + ${errorMessageLocator}`)).toHaveText('Last name required');
        await expect(page.locator(`${emailLocator} + ${errorMessageLocator}`)).toHaveText('Email required');
        await expect(page.locator(`${passwordLocator} + ${errorMessageLocator}`)).toHaveText('Password required');
        await expect(page.locator(`${repeatPasswordLocator} + ${errorMessageLocator}`)).toHaveText('Re-enter password required');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();    
    });

    test('Check invalid name and last name error messages', async ({ page }) => {
        await page.locator(nameLocator).fill('AQA Invalid Name');
        await page.locator(lastNameLocator).fill('%^%');
        await page.locator(lastNameLocator).press('Tab');

        await expect(page.locator(`${nameLocator} + ${errorMessageLocator}`)).toHaveText('Name is invalid');
        await expect(page.locator(nameLocator)).toHaveCSS('border-color', inputErrorMessageBorderColor);    
        await expect(page.locator(`${lastNameLocator} + ${errorMessageLocator}`)).toHaveText('Last name is invalid');
        await expect(page.locator(lastNameLocator)).toHaveCSS('border-color', inputErrorMessageBorderColor);     
    });

    test('Check error with invalid character counts for name and last name', async ({page}) => {
        await page.locator(nameLocator).fill('A');
        await page.locator(lastNameLocator).fill('a');
        await page.locator(lastNameLocator).press('Tab');

        await expect(page.locator(`${nameLocator} + ${errorMessageLocator}`)).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(page.locator(nameLocator)).toHaveCSS('border-color', inputErrorMessageBorderColor);
        await expect(page.locator(`${lastNameLocator} + ${errorMessageLocator}`)).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(page.locator(lastNameLocator)).toHaveCSS('border-color', inputErrorMessageBorderColor);     

    });

    test('Check error message for invalid email', async ({page}) => {
        await page.locator(emailLocator).fill('123gmail.com');
        await page.locator(emailLocator).press('Tab');

        await expect(page.locator(`${emailLocator} + ${errorMessageLocator}`)).toHaveText('Email is incorrect');
        await expect(page.locator(emailLocator)).toHaveCSS('border-color', inputErrorMessageBorderColor);

    });

    test('Check error message for invalid password and re-password', async ({page}) => {
        const errorMessage = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
        await page.locator(passwordLocator).fill('abc');
        await page.locator(repeatPasswordLocator).fill('abc');
        await page.locator(repeatPasswordLocator).press('Tab');

        await expect(page.locator(`${passwordLocator} + ${errorMessageLocator}`)).toHaveText(errorMessage);
        await expect(page.locator(passwordLocator)).toHaveCSS('border-color', inputErrorMessageBorderColor);
        await expect(page.locator(`${repeatPasswordLocator} + ${errorMessageLocator}`)).toHaveText(errorMessage);
        await expect(page.locator(repeatPasswordLocator)).toHaveCSS('border-color', inputErrorMessageBorderColor);

    });

    test('Check error message when password and re-password are different', async ({page}) => {
        await page.locator(passwordLocator).fill('abcABC123123');
        await page.locator(repeatPasswordLocator).fill('abcABC12312345');
        await page.locator(repeatPasswordLocator).press('Tab');

        await expect(page.locator(`${repeatPasswordLocator} + ${errorMessageLocator}`)).toHaveText('Passwords do not match');
        await expect(page.locator(repeatPasswordLocator)).toHaveCSS('border-color', inputErrorMessageBorderColor);

    });


  });