import HttpRequest from "@/util/request";

const api = {
    userPre: '/api/user',
}

export const loginAPI = (data) => {
    return HttpRequest.request({
        url: `${api.userPre}/login`,
        method: 'POST',
        data
    })
}

export const registerAPI = (data) => {
    return HttpRequest.request({
        url: `${api.userPre}/register`,
        method: 'POST',
        data
    })
}

export const logoutAPI = (data) => {
    return HttpRequest.request({
        url: `${api.userPre}/logout`,
        method: 'POST',
        data
    })
}
