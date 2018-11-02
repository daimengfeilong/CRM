import request from '../utils/request';

export function query(data = {}) {
    return request({
        url: '/api/crm/portrait/getPortraitList',
        method: 'POST',
        data
    })
}

export function add (data) {
  return request({
    url:'/api/crm/portrait/addPortrait',
    method:'POST',
    data
  })
}




export function update (data) {
  return request({
    url:'/api/crm/portrait/updatePortrait',
    method:'POST',
    data
  })
}

export function queryPortraitId(data) {
    return request({
        url: '/api/crm/portrait/getPortraitByPortraitId',
        method: 'POST',
        data:data
    })
}

export function delPortrait(data) {
    return request({
        url: '/api/crm/portrait/delPortrait',
        method: 'POST',
        data:data
    })
}

export function querySubLevelClassList(data={}) {
  return request({
    url: '/api/crm/class/getSubLevelClassList',
    method: 'POST',
    data
  })
}



export function queryClassListByTag (data={}) {
  return request({
    url: '/api/crm/class/getClassListByTag',
    method: 'POST',
    data
  })
}
