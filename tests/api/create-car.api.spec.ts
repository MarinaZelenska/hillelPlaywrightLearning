import { test, expect, request, APIRequestContext } from "@playwright/test";
import AuthService from "../../utils/api/services/AuthService";
import GarageService from "../../utils/api/services/GarageService";
import { buildCar } from "../../utils/api/factories/carFactory";

test.describe('QAuto API - Adding new car', () => {

    let createdCarId: number;
    let authService: AuthService;
    let garageService: GarageService;
    let sid: string;
    let apiContext: APIRequestContext;

    test.beforeAll(async () => {
        apiContext = await request.newContext({
            baseURL: process.env.BASE_URL,
            httpCredentials: {
                username: process.env.HTTP_CREDENTIALS_USERNAME!,
                password: process.env.HTTP_CREDENTIALS_PASSWORD!,
            }
        });

        authService = new AuthService(apiContext);
        garageService = new GarageService(apiContext);

        sid = await authService.getAuthCookie();
    });

    test('Positive: Create Car', async () => {
        const car = buildCar();
        const response = await garageService.createCar(sid, car);

        expect(response.status()).toBe(201);

        const body = await response.json();
        createdCarId = body.data.id;

        expect(body.data.carBrandId).toBe(car.carBrandId);
        expect(body.data.carModelId).toBe(car.carModelId);
        expect(body.data.mileage).toBe(car.mileage);
    });

    test('Negative: Create Car with invalid carBrandId', async () => {
        const response = await garageService.createCar(sid, buildCar({ carBrandId: 'Tesla' }));

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body.message).toBe('Invalid car brand type');
    });

    test('Negative: Create Car with invalid mileage range', async () => {
        const response = await garageService.createCar(sid, buildCar({ mileage: 1_000_000_000 }));

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body.message).toBe('Mileage has to be from 0 to 999999');
    });

    test.afterAll(async () => {
        if (createdCarId) {
            await garageService.deleteCar(sid, createdCarId);
        }
        await apiContext.dispose();
    });
})