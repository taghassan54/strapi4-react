"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strapiConfig = void 0;
exports.strapiConfig = {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: 'api',
    admin: 'admin',
    version: 'v4',
    cookie: {},
    auth: {},
    cookieName: 'strapi_jwt',
    loggedUserKey: 'loggedUser',
    devtools: false
};
