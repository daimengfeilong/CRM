import request from '../utils/request';

export function query(data = {}) {
    return request({
        url: '/api/bycx-crm-service/crm/class/getClassList',
        method: 'POST',
        data
    })
}

export function addClass(data) {
    return request({
        url: '/api/bycx-crm-service/crm/class/addClass',
        method: 'POST',
        data:data
    })
}

export function queryClassId(data) {
    return request({
        url: '/api/bycx-crm-service/crm/class/getClassByClassId',
        method: 'POST',
        data:data
    })
}

export function delClass(data) {
    return request({
        url: '/api/bycx-crm-service/crm/class/delClass',
        method: 'POST',
        data:data
    })
}

export function updateClass(data) {
    return request({
        url: '/api/bycx-crm-service/crm/class/updateClass',
        method: 'POST',
        data:data
    })
}

export function delSubClass(data) {
    return request({
        url: '/api/bycx-crm-service/crm/class/delSubClassByClassId',
        method: 'POST',
        data:data
    })
}
