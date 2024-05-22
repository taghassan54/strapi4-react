import Cookies from 'js-cookie';
import {strapiConfig} from "../config/strapiConfig";

export const useStrapiToken = () => {
    const getToken = (): null | string | undefined => {
        const token = Cookies.get(`${strapiConfig.cookieName ?? 'strapi_jwt'}`)
        return token === null || token === "null" ?   null:token;
    }
    const setToken = (token: string | null) => {
        if (token != null) {
            Cookies.set(`${strapiConfig.cookieName ?? 'strapi_jwt'}`, token)
        }
    }
    return {
        getToken,
        setToken
    }
}
