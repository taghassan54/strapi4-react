"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrapiToken = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const strapiConfig_1 = require("../config/strapiConfig");
const useStrapiToken = () => {
    const getToken = () => {
        var _a;
        const token = js_cookie_1.default.get(`${(_a = strapiConfig_1.strapiConfig.cookieName) !== null && _a !== void 0 ? _a : 'strapi_jwt'}`);
        return token === null || token === "null" ? null : token;
    };
    const setToken = (token) => {
        var _a;
        if (token != null) {
            js_cookie_1.default.set(`${(_a = strapiConfig_1.strapiConfig.cookieName) !== null && _a !== void 0 ? _a : 'strapi_jwt'}`, token);
        }
    };
    return {
        getToken,
        setToken
    };
};
exports.useStrapiToken = useStrapiToken;
