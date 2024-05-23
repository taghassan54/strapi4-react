import {AxiosHeaders, AxiosRequestConfig} from "axios";

import {stringify} from 'qs'
import axios from 'axios';
import {useStrapiUrl} from "./useStrapiUrl";
import {useStrapiToken} from "./useStrapiToken";


export const useStrapiClient = () => {

    const {userUrl, adminUrl} = useStrapiUrl()
    const {getToken} = useStrapiToken()

    return async <T>(url: string, fetchOptions: AxiosRequestConfig = {}, isForAdmin = false): Promise<T> => {

        try {

            const token = getToken()


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

            const headers={
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':token!=null? `Bearer ${adminUrl}`:null,
            }

            // Map params according to strapi v3 and v4 formats
            if (fetchOptions.params) {
                const params = stringify(fetchOptions.params, {encodeValuesOnly: true})
                if (params) {
                    url = `${url}?${params}`
                }
                delete fetchOptions.params
            }



            let config = {
                maxBodyLength: Infinity,
                url: `${isForAdmin ? adminUrl() : userUrl()}/${url}`,
                headers: headers,
                body :JSON.stringify(fetchOptions.data),
                ...fetchOptions
            };
            const options:any={}
            Object.entries(config).forEach(([key, value]) => {
                options[key] = value
            })

            // const response = await axios(config)
            // const response = await axios.request(config)

            const response =fetch(`${isForAdmin ? adminUrl() : userUrl()}/${url}`,options)

            // return response.data

            return  await ((await response).json())

        } catch (e) {
            // const e: Strapi4Error | Strapi3Error = err.data || defaultErrors(err)[version]

            // nuxt.hooks.callHook('strapi:error', e)
            console.log('====================================');
            console.log("client Error ", e);
            console.log('====================================');
            throw e
        }
    }

}