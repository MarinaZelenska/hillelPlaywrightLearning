import { APIRequestContext } from "@playwright/test";
import { CarPayload } from "../factories/carFactory";

export default class GarageService {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAllBrands() {
        return this.request.get('/api/cars/brands');
    }

    async deleteCar(sid: string, id: number) {
        return this.request.delete(`/api/cars/${id}`, {
            headers: { cookie: sid }
        });
    }

    async createCar(sid: string, car: CarPayload) {
        return this.request.post('/api/cars', {
            data: car,
            headers: { cookie: sid }
        });
    }
}