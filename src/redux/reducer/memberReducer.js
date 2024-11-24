import { MEMBER_LOGIN_SUCCESS } from "../action/memberAction";
import { MEMBER_LOGOUT_SUCCESS } from "../action/memberAction";
import { MEMBER_UPDATE_ACCOUNT_SUCCESS } from "../action/memberAction";

const INITIAL_STATE = {
    account: {
        token: '',
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        avatar: ''
    },
    isAuthenticated: false,
};

const memberReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MEMBER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    token: action?.payload?.token,
                    id: action?.payload?.Auth?.id,
                    name: action?.payload?.Auth?.name,
                    email: action?.payload?.Auth?.email,
                    phone: action?.payload?.Auth?.phone,
                    address: action?.payload?.Auth?.address,
                    country: action?.payload?.Auth?.country,
                    avatar: action?.payload?.Auth?.avatar,
                },
                isAuthenticated: true,
            };
        case MEMBER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    token: '',
                    id: '',
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    country: '',
                    avatar: ''
                },
                isAuthenticated: false,
            };
        case MEMBER_UPDATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                account: {
                    token: action?.payload?.token,
                    id: action?.payload?.Auth?.id,
                    name: action?.payload?.Auth?.name,
                    email: action?.payload?.Auth?.email,
                    phone: action?.payload?.Auth?.phone,
                    address: action?.payload?.Auth?.address,
                    country: action?.payload?.Auth?.country,
                    avatar: action?.payload?.Auth?.avatar,
                },
                isAuthenticated: true,
            };
        default: return state;
    }
};

export default memberReducer;