import request from '../utils/request';

export function query(data = {}) {
    return request({
        url: '/api/bycx-crm-service/crm/attr/getAttributeList',
        method: 'POST',
        data
    })
}
