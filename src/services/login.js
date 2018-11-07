import request from '../utils/request';

export function getPhoneNo(data = {}) {
    return request({
        url: '/dfs/bycx-syst-service/aSysUser/getPhoneNo',
        method: 'POST',
        data
    })
}

export function sendSms(data = {}) {
    return request({
        url: '/dfs/bycx-rece-service/aSysMsgCaptcha/sendSms',
        method: 'POST',
        data
    })
}

export function userLogin(data = {}) {
    return request({
        url: '/dfs/bycx-syst-service/aSysUser/userLogin',
        method: 'POST',
        data
    })
}