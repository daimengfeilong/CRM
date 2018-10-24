import request from '../utils/request';

export function query(data = {}) {
    return request({
        url: '/api/crm/class/getClassList',
        method: 'POST',
        data
    })
}

export function addClass(data) {
    return request({
        url: '/api/crm/class/addClass',
        method: 'POST',
        data:data
    })
}

export function queryClassId(data) {
    return request({
        url: '/api/crm/class/getClassByClassId',
        method: 'POST',
        data:data
    })
}

export function delClass(data) {
    return request({
        url: '/api/crm/class/delClass',
        method: 'POST',
        data:data
    })
}
