import request from '../utils/request';

export function query(data = {}) {
    return request({
        url: '/api/crm/attr/getAttributeList',
        method: 'POST',
        data
    })
}
