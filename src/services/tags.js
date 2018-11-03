import request from '../utils/request';

export function query(data = {}) {
    return request({
        url: '/api/crm/tag/getTagList',
        method: 'POST',
        data
    })
}

export function queryId(data = {}) {
    return request({
        url: '/api/crm/tag/getTagByTagId',
        method: 'POST',
        data
    })
}

export function edit(data = {}) {
    return request({
        url: '/api/crm/tag/updateTag',
        method: 'POST',
        data
    })
}

export function add(payload) {
    return request({
        url: '/api/crm/tag/addTag',
        method: 'POST',
        data: payload
    })
}

export function getAttributeListTree(payload = {}) {
    return request({
        url:'/api/crm/attr/getAttributeListTree',
        method:'POST',
        data: payload
    })
}

export function getAttributeListEnum(payload = {}) {
    return request({
        url:'/api/crm/attr/getAttributeListEnum',
        method:'POST',
        data: payload
    })
}

