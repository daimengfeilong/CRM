import request from '../utils/request';

export function query() {
    return request({
        url: '/api/crm/tag/getTagList',
        method: 'POST',
        data:{
            pageNo:1,
            pageSize:10
        }
    })
}

export function add(payload) {
    return request({
        url: '/api/tags/add',
        method: 'POST',
        data: payload
    })
}

export function queryId(payload) {
    return request({
        url:'/api/tags/query',
        method:'GET',
        data:{
            _id:payload._id
        }
    })  
}

export function del(payload) {
    return request({
        url:'/api/tags/del',
        method:'POST',
        data:payload,
    })  
}
