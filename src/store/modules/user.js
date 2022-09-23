import {
    loginAPI,
    registerAPI
} from "@/api/user";

const initialState = {
    userId: 0,
    username: '',
    email: '',
    avatar: '',
    auth: localStorage.getItem('auth')
};
const types = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',
}

export default function userSlice(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case types.LOGIN_SUCCESS:
            state.auth = payload.authorities[0].authority;
            localStorage.setItem('auth', payload.authorities[0].authority)
            return {...state, payload};
        case types.LOGIN_FAIL:
            return {...state, payload};
        case types.REGISTER_SUCCESS:
            return {...state, payload};
        case types.REGISTER_FAIL:
            return {...state, payload};
        default:
            return state;
    }
}

export const login = (data) => (dispatch) => {
    return loginAPI(data).then(response => {
        if (response.data.success) {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: response.data.content
            })
            return Promise.resolve(response.data.content);
        } else {
            dispatch({
                type: types.LOGIN_FAIL,
                payload: response.data.message
            })
            return Promise.reject(response.data.message);
        }
    }).catch(error => {
        dispatch({
            type: types.LOGIN_FAIL,
            payload: error
        })
        return Promise.reject(error);
    })
}

export const register = (data) => (dispatch) => {
    return registerAPI(data).then(response => {
        if (response.data.success) {
            dispatch({
                type: types.REGISTER_SUCCESS,
                payload: response.data.content
            })
            return Promise.resolve(response.data.content);
        } else {
            dispatch({
                type: types.REGISTER_FAIL,
                payload: response.data.message
            })
            return Promise.reject(response.data.message);
        }
    }).catch(error => {
        dispatch({
            type: types.REGISTER_FAIL,
            payload: error
        })
        return Promise.reject(error);
    })
}