import {createSlice} from '@reduxjs/toolkit';
import {
    loginAPI,
    registerAPI
} from "@/api/user";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: 0,
        username: '',
        email: '',
        auth: null
    },
    reducers: {
        login: (state, action) => {
            return new Promise((resolve, reject) => {
                loginAPI(action.params).then(response => {
                    console.log(response.data)
                    if (response.data.success) {
                        resolve(response.data.content)
                    } else {
                        reject(response.data.message)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        register: (state, action) => {
            return new Promise((resolve, reject) => {
                registerAPI(action.params).then(response => {
                    console.log(response.data)
                    if (response.data.success) {
                        resolve(response.data.content)
                    } else {
                        reject(response.data.message)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
})

export default userSlice.reducer