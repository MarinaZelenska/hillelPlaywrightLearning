import {test, expect} from "@playwright/test"

import AuthService from "../../utils/api/services/AuthService";

let authService: AuthService;

test.beforeEach(({request}) => {
    authService = new AuthService(request);
})

test.describe('Auth tests', () => {

    test('Sign in', async({request}) => {
        const sid = await authService.getAuthCookie();
        expect(sid).toContain('sid=');
    });

})
