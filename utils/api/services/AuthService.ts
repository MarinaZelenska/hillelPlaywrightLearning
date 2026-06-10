import { APIRequestContext } from "@playwright/test";

export default class AuthService {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async signIn(email: string = process.env.USER_EMAIL!, password: string = process.env.USER_PASSWORD!) {
        return this.request.post('/api/auth/signin', {
            data: { email, password, remember: false }
        });
    }

    async getAuthCookie(email: string = process.env.USER_EMAIL!, password: string = process.env.USER_PASSWORD!) {
        const response = await this.signIn(email, password);
        if (response.status() !== 200) {
            throw new Error(`Sign in failed with status ${response.status()}`);
        }
        return response.headers()['set-cookie'].split(';')[0];
    }
}