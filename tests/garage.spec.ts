import { test } from '../fixtures';
import { GaragePage } from '../pom/pages/GaragePage';
import { AddCarForm } from '../pom/forms/AddCarForm'
import { expect } from '@playwright/test';

test.describe('Garage test', () => {

    let garagePage: GaragePage;
    let addCarForm: AddCarForm;

    test.beforeEach(async ({ userGaragePage }) => {
        garagePage = userGaragePage;
        addCarForm = new AddCarForm(garagePage.page);
        await garagePage.openCreateAddCarModal();
    });

    test('Add new car BMW X5', async () => {
        await addCarForm.addNewCar('BMW', 'X5', '999');
        await expect(addCarForm.successMessageLocator).toBeVisible();
        await expect(addCarForm.lastAddedCarName).toHaveText('BMW X5');


    });

    test('Add new car without milage', async () => {
        await addCarForm.addNewCar('BMW', 'X5', '', false);
        await expect(addCarForm.addButtonLocator).toBeDisabled();

    });

    test('Close create car form via Cancel button', async () => {
        await addCarForm.addNewCar('Audi', 'Q7', '', false);
        await addCarForm.clickCancelButton();
        await expect(addCarForm.lastAddedCarName).not.toHaveText('Audi Q7');

    });

})
