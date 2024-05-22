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
exports.strapiConfig = exports.useStrapi = void 0;
const useStrapi_1 = require("./runtime/useStrapi");
Object.defineProperty(exports, "useStrapi", { enumerable: true, get: function () { return useStrapi_1.useStrapi; } });
const strapiConfig_1 = require("./runtime/config/strapiConfig");
Object.defineProperty(exports, "strapiConfig", { enumerable: true, get: function () { return strapiConfig_1.strapiConfig; } });
/*
* ufo
* axios
* qs
*  */
__exportStar(require("./runtime/types"), exports);
__exportStar(require("./runtime/composables"), exports);
exports.default = useStrapi_1.useStrapi;
