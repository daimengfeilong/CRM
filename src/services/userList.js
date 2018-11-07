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
export function queryTagListByClassId(data) {
  return request({
    url: '/apicrm/user/getTagListByClassId',
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
export function queryUserPortraitList(data) {
  return request({
    url: '/api/crm/user/getUserPortraitList',
    method: 'POST',
    data
  })
}
export function queryUserInsuranceInfo (data) { //业务信息-保险

  // "pageNo":1,
  //   "pageSize":10,
  //   "params": {
  //   "idCard": "411002198012264027",
  //     "type":"2"
  // }
  return request({
    url: '/api/crm/user/getUserInsuranceInfo',
    method: 'POST',
    data
  })
}

export function queryUserLoanInfo (data) { //业务-贷款
  // {
  //   "pageNo":1,
  //   "pageSize":10,
  //   "params": {
  //   "idCard": "411002198012264027",
  //     "type":"1"
  // }
  // }
  return request({
    url: '/api/crm/user/getUserLoanInfo',
    method: 'POST',
    data
  })
}

// 保险档案基本信息上面的公共信息
//http://127.0.0.1:6688/crm/user/getUserInfo
//"idCard": "411002198012264027"
export function queryUserInfo (data) {
  return request({
    url: '/api/crm/user/getUserInfo',
    method: 'POST',
    data
  })
}
//根据用户身份证号查询属性列表
export function queryAttrListByIdCard (data) {
  return request({
    url: '/api/crm/user/getAttrListByIdCard',
    method: 'POST',
    data
  })
}


export function queryUserRemark (data) {
  return request({
    url: '/api/crm/user/getUserInfoById',
    method: 'POST',
    data
  })
}

//编辑用户备注信息
export function updateUserRemark (data) {
//   请求：
// {
//   "idCard": "5123022234143",
//   "userId":"123",
//   "description":"123"
// }
  return request({
    url: '/api/crm/user/updateUser',
    method: 'POST',
    data
  })
}
//根据标签类型ID查询用户标签列表s
export function queryTagsByClassId(data){
//   请求：
// {
//   "idCard": "411002198012264027",
//   "type":"1",
//   "classId":"d91a07d0d1d246d6a84835e1dfe94afc70a5"
// }
  return request({
    url: '/api/crm/user/getTagListByClassId',
    method: 'POST',
    data
  })
}
//   请求：
// {
//   "idCard": "411002198012264027",
//   "type":"1",
//   "classId":"d91a07d0d1d246d6a84835e1dfe94afc70a5"
// }
//   String
//   fileType
//   文件类型 ( 必传 )：合同-CONTR;流水单-ORDER;对公凭证-PUBLIC;附件-ATT;视频-VIDEO
//   String
//   attType
//   附件类型 ( 必传 )，文件类型为附件-ATT时，附件类型为（码类：Atta_Type）
// String
//   loanNo
//   订单编号 ( 必传 )
//   String
//   certNo
//   身份证号码 ( 选传 ),如果fileType为附件-ATT时，该字段为必填项
//根据标签类型ID查询用户标签列表
export function queryFileList(data){
  return request({
    url: '/dfs/bycx-dfs-service/aSysFileAtt/getList',
    method: 'POST',
    data
  })
}
export function queryCodes(data={params: {list: [{'type': 'Atta_Type',}],},}){//获取文件码表
  return request({
    url: '/dfs/bycx-rece-service/api/sys/code/mobile/query',
    method: 'POST',
    data
  })
}
