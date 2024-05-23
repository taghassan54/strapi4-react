"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrapiMedia = exports.useStrapiGraphQL = exports.useStrapiClient = exports.useStrapiToken = exports.useStrapiVersion = exports.useStrapiUrl = exports.useStrapiUser = exports.useStrapiAuth = exports.strapiConfig = exports.useStrapi = void 0;
const useStrapi_1 = require("./runtime/useStrapi");
Object.defineProperty(exports, "useStrapi", { enumerable: true, get: function () { return useStrapi_1.useStrapi; } });
const strapiConfig_1 = require("./runtime/config/strapiConfig");
Object.defineProperty(exports, "strapiConfig", { enumerable: true, get: function () { return strapiConfig_1.strapiConfig; } });
const useStrapiAuth_1 = require("./runtime/composables/useStrapiAuth");
Object.defineProperty(exports, "useStrapiAuth", { enumerable: true, get: function () { return useStrapiAuth_1.useStrapiAuth; } });
const useStrapiUser_1 = require("./runtime/composables/useStrapiUser");
Object.defineProperty(exports, "useStrapiUser", { enumerable: true, get: function () { return useStrapiUser_1.useStrapiUser; } });
const useStrapiUrl_1 = require("./runtime/composables/useStrapiUrl");
Object.defineProperty(exports, "useStrapiUrl", { enumerable: true, get: function () { return useStrapiUrl_1.useStrapiUrl; } });
const useStrapiVersion_1 = require("./runtime/composables/useStrapiVersion");
Object.defineProperty(exports, "useStrapiVersion", { enumerable: true, get: function () { return useStrapiVersion_1.useStrapiVersion; } });
const useStrapiToken_1 = require("./runtime/composables/useStrapiToken");
Object.defineProperty(exports, "useStrapiToken", { enumerable: true, get: function () { return useStrapiToken_1.useStrapiToken; } });
const useStrapiClient_1 = require("./runtime/composables/useStrapiClient");
Object.defineProperty(exports, "useStrapiClient", { enumerable: true, get: function () { return useStrapiClient_1.useStrapiClient; } });
const useStrapiGraphQL_1 = require("./runtime/composables/useStrapiGraphQL");
Object.defineProperty(exports, "useStrapiGraphQL", { enumerable: true, get: function () { return useStrapiGraphQL_1.useStrapiGraphQL; } });
const useStrapiMedia_1 = require("./runtime/composables/useStrapiMedia");
Object.defineProperty(exports, "useStrapiMedia", { enumerable: true, get: function () { return useStrapiMedia_1.useStrapiMedia; } });
/*
* ufo
* axios
* qs
*  */
__exportStar(require("./runtime/types"), exports);
__exportStar(require("./runtime/composables"), exports);
exports.default = useStrapi_1.useStrapi;
