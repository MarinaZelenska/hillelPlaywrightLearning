
import {Locator} from '@playwright/test'
import { expect } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class AddCarForm extends BaseForm {

    readonly titleLocator = this.page.locator('.modal-title', { hasText: 'Add a car' });
    readonly brandDropdownLocator = this.page.locator('#addCarBrand');
    readonly modelDropdownLocator = this.page.locator('#addCarModel');
    readonly mileageLocator = this.page.locator('#addCarMileage');
    public addButtonLocator = this.page.getByRole('button', { name: 'Add', exact: true});
    readonly cancelButtonLocator = this.page.getByRole('button', { name: 'Cancel' });
    public successMessageLocator = this.page.locator('.alert-success p', {hasText: 'Car added'});
    public lastAddedCarName = this.page.locator('p.car_name.h2').first();


    async selectBrand(brand: string){
        await this.brandDropdownLocator.selectOption(brand);
    };

    async selectModel(model: string){
        await this.modelDropdownLocator.selectOption(model);
    };

    async enterMiliage(miliage: string){
        await this.mileageLocator.fill(miliage);
    };

    async clickAddButton(){
        await this.addButtonLocator.click();
    };

    async clickCancelButton(){
        await this.cancelButtonLocator.click();
    };

    async addNewCar(brand: string, model: string, mileage: string, clickOnAddCarButton = true){
        await this.selectBrand(brand);
        await this.selectModel(model);
        await this.enterMiliage(mileage);
        if (clickOnAddCarButton){
            await this.clickAddButton();
        }
        
    }



   
}