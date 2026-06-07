import {test, expect, request} from "@playwright/test"

import GarageService from '../../utils/api/services/GarageService'

let garageService: GarageService;

test.beforeEach(({request}) => {
    garageService = new GarageService(request);
})


test.describe('QAuto API - Car brands', () => {
    
    test('should get all Car Brands', async ({request}) => {
        const response = await garageService.getAllBrands();
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(0);
    })
})