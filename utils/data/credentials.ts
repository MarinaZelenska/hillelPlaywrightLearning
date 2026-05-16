import { faker } from '@faker-js/faker';

export function generateValidRegisterData() {
    const password = `${faker.string.alpha({ length: 1, casing: 'upper' })}${faker.string.alpha({ length: 6, casing: 'lower' })}${faker.number.int({ min: 10, max: 99 })}`;
    return {
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `aqa_${faker.internet.email()}`,
        password,
    };
}

export function generateInvalidCharactersNameData() {
    return {
        name: 'AQA Invalid Name',
        lastName: '%^%',
    };
}

export function generateTooShortNameData() {
    return {
        name: faker.string.alpha({ length: 1 }),
        lastName: faker.string.alpha({ length: 1 }),
    };
}

export function generateInvalidEmailData() {
    return {
        email: '123gmail.com',
    };
}

export function generateInvalidPasswordData() {
    return {
        password: faker.string.alpha({ length: 5, casing: 'lower' }),
    };
}

export function generateMismatchedPasswordsData() {
    const { password } = generateValidRegisterData();
    return {
        password,
        repeatPassword: password + faker.string.alpha({ length: 2 }),
    };
}
