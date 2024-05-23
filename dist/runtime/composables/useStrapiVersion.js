"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrapiVersion = void 0;
const strapiConfig_1 = require("../config/strapiConfig");
const useStrapiVersion = () => {
    var _a;
    return (_a = strapiConfig_1.strapiConfig.version) !== null && _a !== void 0 ? _a : "v4";
};
exports.useStrapiVersion = useStrapiVersion;
