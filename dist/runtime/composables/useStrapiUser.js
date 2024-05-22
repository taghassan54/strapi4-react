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
exports.useStrapiUser = void 0;
const strapiConfig_1 = require("../config/strapiConfig");
const js_cookie_1 = __importDefault(require("js-cookie"));
const useStrapiUser = () => {
    let user = { current: null };
    const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return (_a = user.current) !== null && _a !== void 0 ? _a : getLoggedUser();
    });
    const setCurrentUser = (newUser) => {
        if (!newUser)
            return;
        // Convert user object to JSON string for storing in cookie
        const userJson = JSON.stringify(newUser.current);
        // Set cookie for 90 days
        js_cookie_1.default.set(strapiConfig_1.strapiConfig.loggedUserKey, userJson, { expires: 90, path: '', secure: true });
        user = newUser;
    };
    const getLoggedUser = () => {
        const userJson = js_cookie_1.default.get(strapiConfig_1.strapiConfig.loggedUserKey);
        if (userJson) {
            return JSON.parse(userJson);
        }
        return null;
    };
    return { user, getUser, setCurrentUser };
};
exports.useStrapiUser = useStrapiUser;
