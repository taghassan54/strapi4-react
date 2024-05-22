"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrapi4 = void 0;
const useStrapiVersion_1 = require("./composables/useStrapiVersion");
const useStrapiClient_1 = require("./composables/useStrapiClient");
/**
 * @deprecated use `useStrapi` for correct types
 */
const useStrapi4 = () => {
    const client = (0, useStrapiClient_1.useStrapiClient)();
    const version = (0, useStrapiVersion_1.useStrapiVersion)();
    if (version !== 'v4') {
        console.warn('useStrapi4 is only available for v4');
    }
    /**
     * Get a list of {content-type} entries
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {Strapi4RequestParams} [params] - Query parameters
     * @param fetchOptions
     * @param isForAdmin
     * @returns Promise<T>
     */
    const find = (contentType, params, fetchOptions, isForAdmin) => {
        return client(contentType, Object.assign({ method: 'GET', params: params }, fetchOptions), isForAdmin);
    };
    /**
     * Get a specific {content-type} entry
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {string|number} id - ID of entry
     * @param  {Strapi4RequestParams} [params] - Query parameters
     * @param fetchOptions
     * @param isForAdmin
     * @returns Promise<T>
     */
    const findOne = (contentType, id, params, fetchOptions, isForAdmin = false) => {
        if (typeof id === 'object') {
            params = id;
            id = undefined;
        }
        const path = [contentType, id].filter(Boolean).join('/');
        return client(path, Object.assign({ method: 'GET', params }, fetchOptions), isForAdmin);
    };
    /**
     * Create a {content-type} entry
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {Record<string, any>} data - Form data
     * @param fetchOptions
     * @param isForAdmin
     * @returns Promise<T>
     */
    const create = (contentType, data, fetchOptions, isForAdmin = false) => {
        return client(contentType, Object.assign({ method: 'POST', data: data }, fetchOptions), isForAdmin);
    };
    /**
     * Update an entry
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {string|number} id - ID of entry to be updated
     * @param  {Record<string, any>} data - Form data
     * @param fetchOptions
     * @param isForAdmin
     * @returns Promise<T>
     */
    const update = (contentType, id, data, fetchOptions, isForAdmin = false) => {
        if (typeof id === 'object') {
            data = id;
            id = undefined;
        }
        const path = [contentType, id].filter(Boolean).join('/');
        return client(path, Object.assign({ method: 'PUT', data: data }, fetchOptions), isForAdmin);
    };
    /**
     * Delete an entry
     *
     * @param  {string} contentType - Content type's name pluralized
     * @param  {string|number} id - ID of entry to be deleted
     * @param isForAdmin
     * @returns Promise<T>
     */
    const _delete = (contentType, id, fetchOptions, isForAdmin = false) => {
        const path = [contentType, id].filter(Boolean).join('/');
        return client(path, Object.assign({ method: 'DELETE' }, fetchOptions), isForAdmin);
    };
    return {
        find,
        findOne,
        create,
        update,
        delete: _delete
    };
};
exports.useStrapi4 = useStrapi4;
