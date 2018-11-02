import request from '../utils/request';

export function query(data) {
    return request({
        url: '/api/crm/user/getUserList',
        method: 'POST',
        data: data
    })
}

export function queryUserTagClassList(data) {
  return request({
    url: '/api/crm/user/getUserTagClassList',
    method: 'POST',
    data
  })
}
export function queryUserBasicInfo(data) {
  return request({
    url: '/api/crm/user/getUserBasicInfo',
    method: 'POST',
    data
  })
}
export function queryUserAccountInfo(data) {
  return request({
    url: '/api/crm/user/getUserAccountInfo',
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

export function updateClass(data) {
    return request({
        url: '/api/crm/class/updateClass',
        method: 'POST',
        data:data
    })
}

export function delSubClass(data) {
    return request({
        url: '/api/crm/class/delSubClassByClassId',
        method: 'POST',
        data:data
    })
}
