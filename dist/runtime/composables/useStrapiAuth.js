"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrapiAuth = void 0;
const useStrapiUrl_1 = require("./useStrapiUrl");
const useStrapiToken_1 = require("./useStrapiToken");
const useStrapiClient_1 = require("./useStrapiClient");
const useStrapiUser_1 = require("./useStrapiUser");
const useStrapiAuth = () => {
    const { userUrl, adminUrl } = (0, useStrapiUrl_1.useStrapiUrl)();
    let { getToken, setToken } = (0, useStrapiToken_1.useStrapiToken)();
    const { user, setCurrentUser, getUser } = (0, useStrapiUser_1.useStrapiUser)();
    const client = (0, useStrapiClient_1.useStrapiClient)();
    const fetchUser = () => __awaiter(void 0, void 0, void 0, function* () {
        const token = getToken();
        if (token) {
            try {
                const apiUser = yield client('users/me', { method: "get" });
                setCurrentUser({ current: apiUser });
                return { current: apiUser };
            }
            catch (e) {
                console.log('====================================');
                console.log(e);
                console.log('====================================');
                setToken(null);
            }
        }
        return user;
    });
    const fetchAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
        const token = getToken();
        if (token) {
            try {
                const apiUser = yield client('admin/users/me', { method: "get" }, true);
                console.log('====================================');
                console.log("apiUser admin", apiUser);
                console.log('====================================');
                setCurrentUser({ current: apiUser });
                return { current: apiUser };
            }
            catch (e) {
                console.log('====================================');
                console.log(e);
                console.log('====================================');
                setToken(null);
            }
        }
        return user;
    });
    /**
     * Authenticate user & retrieve his JWT
     *
     * @param  {StrapiAuthenticationData} data - User authentication form: `identifier`, `password`
     * @param  {string} data.identifier - The email or username of the user
     * @param  {string} data.password - The password of the user
     * @returns Promise<StrapiAuthenticationResponse>
     */
    const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
        setToken(null);
        const { jwt } = yield client('auth/local', { method: 'post', data: data });
        setToken(jwt);
        const user = yield fetchUser();
        return {
            user,
            jwt
        };
    });
    /**
     * Authenticate admin user & retrieve his JWT
     *
     * @param  {StrapiAuthenticationData} data - User authentication form: `identifier`, `password`
     * @param  {string} data.identifier - The email or username of the user
     * @param  {string} data.password - The password of the user
     * @returns Promise<StrapiAuthenticationResponse>
     */
    const adminLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
        setToken(null);
        const response = yield client('admin/login', {
            method: 'post',
            data: data
        }, true);
        setToken(response.data.token);
        const user = yield fetchAdmin();
        return {
            data: {
                user,
                token: response.data.token
            }
        };
    });
    /**
     * Logout by removing authentication token
     */
    const logout = () => {
        setToken(null);
        setCurrentUser({ current: null });
    };
    /**
     * Register a new user & retrieve JWT
     *
     * @param  {StrapiRegistrationData} data - New user registration form: `username`, `email`, `password`
     * @param  {string} data.username - Username of the new user
     * @param  {string} data.email - Email of the new user
     * @param  {string} data.password - Password of the new user
     * @returns Promise<StrapiAuthenticationResponse>
     */
    const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
        setToken(null);
        const { jwt } = yield client('auth/local/register', { method: 'POST', data: data });
        setToken(jwt);
        const user = yield fetchUser();
        return {
            user,
            jwt
        };
    });
    /**
     * Email a user in order to reset his password
     *
     * @param  {StrapiForgotPasswordData} data - Forgot password form: `email`
     * @param  {string} data.email - Email of the user who forgot his password
     * @returns Promise<void>
     */
    const forgotPassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
        setToken(null);
        yield client('auth/forgot-password', { method: 'POST', data: data });
    });
    /**
     * Reset the user password
     *
     * @param  {StrapiResetPasswordData} data - Reset password form: `code`, `password`, `passwordConfirmation`
     * @param  {string} data.code - Code received by email after calling the `forgotPassword` method
     * @param  {string} data.password - New password of the user
     * @param  {string} data.passwordConfirmation - Confirmation of the new password of the user
     * @returns Promise<StrapiAuthenticationResponse>
     */
    const resetPassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
        setToken(null);
        const { jwt } = yield client('auth/reset-password', { method: 'POST', data: data });
        setToken(jwt);
        const user = yield fetchUser();
        return {
            user,
            jwt
        };
    });
    /**
     * Change the user password
     *
     * @param  {StrapiChangePasswordData} data - Change password form: `currentPassword`, `password`, `passwordConfirmation`
     * @param  {string} data.currentPassword - Current password of the user
     * @param  {string} data.password - New password of the user
     * @param  {string} data.passwordConfirmation - Confirmation of the new password of the user
     * @returns Promise<void>
     */
    const changePassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield client('auth/change-password', { method: 'POST', data: data });
    });
    /**
     * Send programmatically an email to a user in order to confirm his account
     *
     * @param  {StrapiEmailConfirmationData} data - Email confirmation form: `email`
     * @param  {string} data.email - Email of the user who want to be confirmed
     * @returns Promise<void>
     */
    const sendEmailConfirmation = (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield client('auth/send-email-confirmation', { method: 'POST', data: data });
    });
    /**
     * Get the correct URL to authenticate with provider
     *
     * @param  {StrapiAuthProvider} provider - Provider name
     * @returns string
     */
    const getProviderAuthenticationUrl = (provider) => {
        return `${userUrl()}/connect/${provider}`;
    };
    /**
     * Authenticate user with the access_token
     *
     * @param  {StrapiAuthProvider} provider - Provider name
     * @param  {string} access_token - Access token returned by Strapi
     * @returns Promise<StrapiAuthenticationResponse>
     */
    const authenticateProvider = (provider, access_token) => __awaiter(void 0, void 0, void 0, function* () {
        setToken(null);
        const { jwt } = yield client(`auth/${provider}/callback`, {
            method: 'GET',
            params: { access_token }
        });
        setToken(jwt);
        const user = yield fetchUser();
        return {
            user,
            jwt
        };
    });
    const renewToken = () => __awaiter(void 0, void 0, void 0, function* () {
        const token = getToken();
        const response = yield client('admin/renew-token', {
            method: 'post', data: {
                token: token
            }
        }, true);
        console.log('====================================');
        console.log(response);
        console.log('====================================');
    });
    return {
        setToken,
        setCurrentUser,
        fetchUser,
        fetchAdmin,
        login,
        logout,
        register,
        forgotPassword,
        resetPassword,
        changePassword,
        sendEmailConfirmation,
        getProviderAuthenticationUrl,
        authenticateProvider,
        adminLogin,
        renewToken
    };
};
exports.useStrapiAuth = useStrapiAuth;
