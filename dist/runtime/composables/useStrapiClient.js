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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrapiClient = void 0;
const axios_1 = require("axios");
const qs_1 = require("qs");
const axios_2 = __importDefault(require("axios"));
const useStrapiUrl_1 = require("./useStrapiUrl");
const useStrapiToken_1 = require("./useStrapiToken");
const useStrapiVersion_1 = require("./useStrapiVersion");
const useStrapiClient = () => {
    const { userUrl, adminUrl } = (0, useStrapiUrl_1.useStrapiUrl)();
    const { getToken } = (0, useStrapiToken_1.useStrapiToken)();
    const version = (0, useStrapiVersion_1.useStrapiVersion)();
    const defaultErrors = (err) => ({
        v4: {
            error: {
                status: 500,
                name: 'UnknownError',
                message: err.message,
                details: err
            }
        },
        v3: {
            error: 'UnknownError',
            message: err.message,
            statusCode: 500
        }
    });
    return (url_1, ...args_1) => __awaiter(void 0, [url_1, ...args_1], void 0, function* (url, fetchOptions = {}, isForAdmin = false) {
        try {
            const headers = new axios_1.AxiosHeaders();
            headers.setContentType('application/json');
            headers.setAccept('application/json');
            const token = getToken();
            if (token != null) {
                headers.Authorization = `Bearer ${token}`;
            }
            if (token == null) {
                headers.setAuthorization(null);
            }
            // Map params according to strapi v3 and v4 formats
            if (fetchOptions.params) {
                const params = (0, qs_1.stringify)(fetchOptions.params, { encodeValuesOnly: true });
                if (params) {
                    url = `${url}?${params}`;
                }
                delete fetchOptions.params;
            }
            let config = Object.assign({ maxBodyLength: Infinity, url: `${isForAdmin ? adminUrl() : userUrl()}/${url}`, headers: headers, body: JSON.stringify(fetchOptions.data) }, fetchOptions);
            // const response1 = await fetch(`${isForAdmin ? adminUrl() : userUrl()}/${url}`,config)
            const response = yield axios_2.default.request(config);
            return response.data;
        }
        catch (err) {
            if (err instanceof axios_1.AxiosError) {
                const e = err.data || defaultErrors(err)[version];
                // nuxt.hooks.callHook('strapi:error', e)
                console.log('====================================');
                console.log("client Error ", e);
                console.log('====================================');
                throw e;
            }
            else {
                throw err;
            }
        }
    });
};
exports.useStrapiClient = useStrapiClient;
