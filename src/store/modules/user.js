import {
    loginAPI,
    registerAPI,
    logoutAPI
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
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAIL: 'LOGOUT_FAIL'
}

export default function userSlice(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case types.LOGIN_SUCCESS:
            state.auth = payload.authorities[0].authority;
            localStorage.setItem('auth', payload.authorities[0].authority)
            state.avatar = payload.avatar;
            localStorage.setItem('avatar', payload.avatar)
            return {...state, payload};
        case types.LOGIN_FAIL:
            return {...state, payload};
        case types.REGISTER_SUCCESS:
            return {...state, payload};
        case types.REGISTER_FAIL:
            return {...state, payload};
        case types.LOGOUT_SUCCESS:
            state.auth = null;
            localStorage.removeItem('auth');
            state.avatar = null;
            localStorage.removeItem('avatar');
            return {...state, payload};
        case types.LOGOUT_FAIL:
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

export const logout = (data) => (dispatch) => {
    return logoutAPI(data).then(response => {
        if (response.data.success) {
            dispatch({
                type: types.LOGOUT_SUCCESS,
                payload: response.data.content
            })
            return Promise.resolve(response.data.content);
        } else {
            dispatch({
                type: types.LOGOUT_FAIL,
                payload: response.data.message
            })
            return Promise.reject(response.data.message);
        }
    }).catch(error => {
        dispatch({
            type: types.LOGOUT_FAIL,
            payload: error
        })
        return Promise.reject(error);
    })
}