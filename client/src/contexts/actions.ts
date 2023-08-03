import { Dispatch } from "react";
import { Action, LoginErrorAction, LoginSuccessAction, LogoutAction, RequestLoginAction } from "./reducer";
import { siApi } from '@shared/api/user-client/si-api';
import { AxiosError } from 'axios'
import { setAuthTokens, clearAuthTokens } from 'axios-jwt'

export async function loginUser(dispatch: Dispatch<Action>, email: string, password: string){
    try {
        dispatch(new RequestLoginAction());
        const resp = await siApi.authLoginPost({ email: email, password: password } );

        if (resp.data.access_token) {
            dispatch(new LoginSuccessAction(resp.data.access_token));
            setAuthTokens({
                accessToken: resp.data.access_token,
                refreshToken: resp.data.access_token //TODO Use refresh token
              })
            // localStorage.setItem('token', JSON.stringify(resp.data.access_token));
            return {"access_token": resp.data.access_token};
        }

        dispatch(new LoginErrorAction(resp.statusText));
        return;
    } catch (error) {
        var msg = "Authorization failed"
        if (error instanceof AxiosError && typeof error.response !== 'undefined') {
            if (error.response.status == 401)
                msg = "Bad email or password"
            else if (error.response.status == 0)
                msg = "Server unavailable"
        }    
        dispatch(new LoginErrorAction(msg));
        return {"error": msg}
    }
}

export async function logout(dispatch: Dispatch<Action>) {
    await siApi.authLogoutDelete();
    clearAuthTokens()
    dispatch(new LogoutAction());
}