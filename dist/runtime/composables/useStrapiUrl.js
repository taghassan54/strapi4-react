"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrapiUrl = void 0;
const useStrapiVersion_1 = require("./useStrapiVersion");
const strapiConfig_1 = require("../config/strapiConfig");
const useStrapiUrl = () => {
    const userUrl = () => {
        var _a, _b;
        const version = (0, useStrapiVersion_1.useStrapiVersion)();
        // return version === 'v3' ? config.strapi.url : `${config.strapi.url}${config.strapi.prefix}`
        return `${(_a = strapiConfig_1.strapiConfig.url) !== null && _a !== void 0 ? _a : 'http://localhost:1337'}/${(_b = strapiConfig_1.strapiConfig.prefix) !== null && _b !== void 0 ? _b : 'api'}`;
    };
    const adminUrl = () => {
        var _a;
        const version = (0, useStrapiVersion_1.useStrapiVersion)();
        // return version === 'v3' ? config.strapi.url : `${config.strapi.url}${config.strapi.prefix}`
        return `${(_a = strapiConfig_1.strapiConfig.url) !== null && _a !== void 0 ? _a : 'http://localhost:1337'}`;
    };
    return {
        userUrl,
        adminUrl
    };
};
exports.useStrapiUrl = useStrapiUrl;
