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
exports.useStrapi = void 0;
// import {useStrapiVersion} from "./runtime/composables/useStrapiVersion";
// import {strapiConfig} from "./runtime/config/strapiConfig";
// import {useStrapiUrl} from "./runtime/composables/useStrapiUrl";
// import {useStrapiToken} from "./runtime/composables/useStrapiToken";
// import {useStrapiClient} from "./runtime/composables/useStrapiClient";
// import {useStrapiUser} from "./runtime/composables/useStrapiUser";
// import {useStrapiAuth} from "./runtime/composables/useStrapiAuth";
// import {useStrapiGraphQL} from "./runtime/composables/useStrapiGraphQL";
// import {useStrapiMedia} from "./runtime/composables/useStrapiMedia";
var useStrapi_1 = require("./runtime/useStrapi");
Object.defineProperty(exports, "useStrapi", { enumerable: true, get: function () { return useStrapi_1.useStrapi; } });
__exportStar(require("./runtime/types/index"), exports);
__exportStar(require("./runtime/composables"), exports);
// export {
//     strapiConfig,
//     useStrapiAuth,
//     useStrapiUser,
//     useStrapiUrl,
//     useStrapiVersion,
//     useStrapi,
//     useStrapiToken,
//     useStrapiClient,
//     useStrapiGraphQL,
//     useStrapiMedia
// }
