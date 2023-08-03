import jwt_decode from "jwt-decode";
import { getAccessToken } from 'axios-jwt'

export interface Action { };
export class RequestLoginAction implements Action { }
export class LoginSuccessAction implements Action {
    token: string;
    constructor(token: string) {
        this.token = token
    }
}
export class LogoutAction implements Action { }
export class LoginErrorAction implements Action {
    error: string;
    constructor(error: string) {
        this.error = error
    }
}

export interface UserProfile {
    'access_token': string;
    'email': string;
    'role': string;
    'loading': boolean;
    'errorMessage': string | null;
}

function extractUserInfo() {
    const access_token = getAccessToken()
    var email = ''
    var role = ''
    if (access_token) {
        const token = jwt_decode(access_token) as any
        email = token.identity
        role = token.role
    }
    return {
        'access_token': access_token ?? '',
        'email': email,
        'role': role
    }
}

export const initialState: UserProfile = {
    ...extractUserInfo(),
    loading: false,
    errorMessage: null
};

export const clearState: UserProfile = {
    access_token: '',
    email: '',
    role: '',
    loading: false,
    errorMessage: null
};



export const decodeProfile = (token: string | null): UserProfile => {
    if (token) {
        const decoded = jwt_decode(token) as any
        return {
            ...initialState,
            'access_token': token,
            'email': decoded.identity,
            'role': decoded.role
        }
    } else {
        return initialState
    }
}

export const AuthReducer = (initialState: UserProfile, action: Action) => {
    switch (action.constructor) {
        case RequestLoginAction:
            return {
                ...initialState,
                loading: true,
            };
        case LoginSuccessAction:
            return {
                ...decodeProfile((<LoginSuccessAction>action).token),
                loading: false,
            };
        case LogoutAction:
            return clearState;
        case LoginErrorAction:
            return {
                ...initialState,
                loading: false,
                errorMessage: (<LoginErrorAction>action).error,
            };
        default:
            throw new Error(`Unhandled action type`);
    }
};
