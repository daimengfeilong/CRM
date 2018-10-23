import request from '../utils/request';

export function query() {
    return request({
        url: '/api/article/list',
        method: 'GET'
    })
}

export function add(payload) {
    return request({
        url: '/api/article/add',
        method: 'POST',
        data: payload
    })
}

export function queryId(payload) {
    return request({
        url:'/api/article/query',
        method:'GET',
        data:{
            _id:payload._id
        }
    })  
}

export function del(payload) {
    return request({
        url:'/api/article/del',
        method:'POST',
        data:payload,
    })  
}
