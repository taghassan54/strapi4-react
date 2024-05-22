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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrapiMedia = void 0;
const ufo_1 = require("ufo");
const axios_1 = __importStar(require("axios"));
const useStrapiToken_1 = require("./useStrapiToken");
const useStrapiUrl_1 = require("./useStrapiUrl");
const react_1 = require("react");
const strapiConfig_1 = require("../config/strapiConfig");
const useStrapi_1 = require("../useStrapi");
const useStrapiMedia = () => {
    const { create } = (0, useStrapi_1.useStrapi)();
    const [selectedFiles, setSelectedFiles] = (0, react_1.useState)([]);
    const [selectedFile, setSelectedFile] = (0, react_1.useState)(null);
    const { getToken } = (0, useStrapiToken_1.useStrapiToken)();
    const { adminUrl, userUrl } = (0, useStrapiUrl_1.useStrapiUrl)();
    const getMediaUrl = (path) => {
        var _a;
        const url = (_a = strapiConfig_1.strapiConfig.url) !== null && _a !== void 0 ? _a : 'http://localhost:1337';
        return (0, ufo_1.joinURL)(url, path);
    };
    const uploadSingleMedia = (formData_1, fileInfo_1, ...args_1) => __awaiter(void 0, [formData_1, fileInfo_1, ...args_1], void 0, function* (formData, fileInfo, isForAdmin = false, onUploadProgress) {
        try {
            if (!formData && !selectedFile) {
                throw 'Please select a file first.';
            }
            if (!formData) {
                formData = new FormData();
                if (selectedFile)
                    formData.append('files', selectedFile);
            }
            if (!formData)
                throw 'Please select at least one file.';
            return yield postFormDataRequest(formData, fileInfo, isForAdmin, onUploadProgress);
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    });
    const uploadMultipleMedia = (formData_2, fileInfo_2, ...args_2) => __awaiter(void 0, [formData_2, fileInfo_2, ...args_2], void 0, function* (formData, fileInfo, isForAdmin = false, onUploadProgress) {
        try {
            if (!formData && selectedFiles.length === 0) {
                throw 'Please select at least one file.';
            }
            if (!formData) {
                formData = new FormData();
                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append('files', selectedFiles[i]);
                }
            }
            if (!formData)
                throw 'Please select at least one file.';
            return yield postFormDataRequest(formData, fileInfo, isForAdmin, onUploadProgress);
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    });
    const updateFileInfo = (fileInfo_3, ...args_3) => __awaiter(void 0, [fileInfo_3, ...args_3], void 0, function* (fileInfo, isForAdmin = false, onUploadProgress) {
        try {
            if (!fileInfo)
                throw 'file Info is required.';
            const path = `upload?id=${fileInfo === null || fileInfo === void 0 ? void 0 : fileInfo.fileId}`;
            return yield create(path, {
                fileInfo
            });
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    });
    const postFormDataRequest = (formData_3, fileInfo_4, ...args_4) => __awaiter(void 0, [formData_3, fileInfo_4, ...args_4], void 0, function* (formData, fileInfo, isForAdmin = false, onUploadProgress, path) {
        const headers = new axios_1.AxiosHeaders();
        headers.setContentType('multipart/form-data');
        const token = getToken();
        if (token != null) {
            headers.Authorization = `Bearer ${token}`;
        }
        if (fileInfo) {
            formData.append('ref', fileInfo.ref);
            formData.append('refId', fileInfo.refId);
            formData.append('field', fileInfo.field);
            if (fileInfo.source)
                formData.append('source', fileInfo.source);
            if (fileInfo.path)
                formData.append('path', fileInfo.path);
        }
        // Using for...of loop to iterate over entries
        for (let [key, value] of formData.entries()) {
            console.log('====================================');
            console.log(key, value);
            console.log('====================================');
        }
        const response = yield axios_1.default.post(`${isForAdmin ? adminUrl() : userUrl()}/${path !== null && path !== void 0 ? path : 'upload'}`, formData, {
            headers: headers,
            onUploadProgress: onUploadProgress,
        });
        console.log('File uploaded successfully:', response.data);
        return response.data;
    });
    return {
        getMediaUrl,
        uploadSingleMedia,
        uploadMultipleMedia,
        setSelectedFiles,
        selectedFiles,
        selectedFile,
        setSelectedFile,
        updateFileInfo
    };
};
exports.useStrapiMedia = useStrapiMedia;
