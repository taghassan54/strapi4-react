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
const qs_1 = require("qs");
const axios_1 = __importDefault(require("axios"));
const useStrapiUrl_1 = require("./useStrapiUrl");
const useStrapiToken_1 = require("./useStrapiToken");
const useStrapiClient = () => {
    const { userUrl, adminUrl } = (0, useStrapiUrl_1.useStrapiUrl)();
    const { getToken } = (0, useStrapiToken_1.useStrapiToken)();
    return (url_1, ...args_1) => __awaiter(void 0, [url_1, ...args_1], void 0, function* (url, fetchOptions = {}, isForAdmin = false) {
        try {
            const token = getToken();
            // const headers: AxiosHeaders = new AxiosHeaders()
            //
            // headers.setContentType('application/json')
            // headers.setAccept('application/json')
            //
            //
            // if (token != null) {
            //     headers.Authorization = `Bearer ${token}`
            // }
            //
            // if (token == null) {
            //     headers.setAuthorization(null)
            // }
            const headers = {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token != null ? `Bearer ${adminUrl}` : null,
            };
            // Map params according to strapi v3 and v4 formats
            if (fetchOptions.params) {
                const params = (0, qs_1.stringify)(fetchOptions.params, { encodeValuesOnly: true });
                if (params) {
                    url = `${url}?${params}`;
                }
                delete fetchOptions.params;
            }
            let config = Object.assign({ maxBodyLength: Infinity, url: `${isForAdmin ? adminUrl() : userUrl()}/${url}`, headers: headers }, fetchOptions);
            // const response = yield (0, axios_1.default)(config);
            // const response = yield axios_1.request(config);
            // const response = await axios.request(config)
            const response=yield fetch(`${isForAdmin ? adminUrl() : userUrl()}/${url}`,config)

            return response.data;
        }
        catch (e) {
            // const e: Strapi4Error | Strapi3Error = err.data || defaultErrors(err)[version]
            // nuxt.hooks.callHook('strapi:error', e)
            console.log('====================================');
            console.log("client Error ", e);
            console.log('====================================');
            throw e;
        }
    });
};
exports.useStrapiClient = useStrapiClient;
