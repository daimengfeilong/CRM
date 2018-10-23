import request from '../utils/request';

export function login(payload) {
    return request({
        url:'/api/login',
        method:'POST',
        data:payload
    })
}
