export const MEMBER_LOGIN_SUCCESS = 'MEMBER_LOGIN_SUCCESS';
export const MEMBER_LOGOUT_SUCCESS = 'MEMBER_LOGOUT_SUCCESS';
export const MEMBER_UPDATE_ACCOUNT_SUCCESS = 'MEMBER_UPDATE_ACCOUNT_SUCCESS';

export const doLogin = (response) => {
    return {
        type: MEMBER_LOGIN_SUCCESS,
        payload: response,
    };
};

export const doLogout = () => {
    return {
        type: MEMBER_LOGOUT_SUCCESS,
    };
};

export const doUpdateAccount = (response) => {
    return {
        type: MEMBER_UPDATE_ACCOUNT_SUCCESS,
        payload: response,
    }
};