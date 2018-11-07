import request from '../utils/request';

export function query(data = {}) {
    return request({
        url: '/api/bycx-crm-service/crm/portrait/getPortraitList',
        method: 'POST',
        data
    })
}

export function add (data) {
  return request({
    url:'/api/bycx-crm-service/crm/portrait/addPortrait',
    method:'POST',
    data
  })
}




export function update (data) {
  return request({
    url:'/api/bycx-crm-service/crm/portrait/updatePortrait',
    method:'POST',
    data
  })
}

export function queryPortraitId(data) {
    return request({
        url: '/api/bycx-crm-service/crm/portrait/getPortraitByPortraitId',
        method: 'POST',
        data:data
    })
}

export function delPortrait(data) {
    return request({
        url: '/api/bycx-crm-service/crm/portrait/delPortrait',
        method: 'POST',
        data:data
    })
}

export function querySubLevelClassList(data={}) {
  return request({
    url: '/api/bycx-crm-service/crm/class/getSubLevelClassList',
    method: 'POST',
    data
  })
}



export function queryClassListByTag (data={}) {
  return request({
    url: '/api/bycx-crm-service/crm/class/getClassListByTag',
    method: 'POST',
    data
  })
}
