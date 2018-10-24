import request from '../utils/request';

export function query() {
    return request({
        url: '/api/crm/class/getClassList',
        method: 'POST',
        data:{
            pageNo:1,
            pageSize:20
        }
    })
}
