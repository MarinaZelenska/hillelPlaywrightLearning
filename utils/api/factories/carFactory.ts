export type CarPayload = {
    carBrandId: number | string;
    carModelId: number;
    mileage: number;
};

export function buildCar(overrides: Partial<CarPayload> = {}): CarPayload {
    return {
        carBrandId: 3,
        carModelId: 11,
        mileage: 133,
        ...overrides
    };
}
