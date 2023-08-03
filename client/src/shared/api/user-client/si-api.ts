import { DefaultApiFactory } from '../axios-client';
import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor} from 'axios-jwt'

import { BASE_PATH } from '@shared/api/axios-client/base'


import axios from 'axios';
import globalAxios from 'axios';
export const axiosApiInstance = axios.create({ baseURL: BASE_PATH });



const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
    const response = await globalAxios.post(`${BASE_PATH}/auth/refresh`, { token: refreshToken })

    return response.data.access_token
}

applyAuthTokenInterceptor(axiosApiInstance, { requestRefresh})
// export const siApi = new DefaultApi();
export const siApi = DefaultApiFactory(undefined, undefined, axiosApiInstance);

export type { AuthData, LoginData, DefaultApiAuthLoginPostRequest } from "../axios-client";
