import { queryUserTagClassList,queryUserBasicInfo,queryUserAccountInfo,queryUserPortraitList,queryUserInfo,updateUserRemark,queryUserLoanInfo,queryUserInsuranceInfo
        ,queryUserRemark} from '../services/userList'

export default {
  namespace: 'userDetail',
  state: {
    userTagList:[],
    userNo:'',
    idCard:'',
    userInfo:'',//用户公共信息
    description:'',//用户备注
    userBaseInfo:'',
    accountInfo:'',
    showModel:false,
    userPortraitList:[],
    creditPagination:{
      pageNo:1,
      pageSize:10,
      totalSize:''
    },
    insurePagination:{
      pageNo:1,
      pageSize:10,
      totalSize:''
    },
    creditList:[],
    insureList:[],
  },
  reducers: {
    save (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
  },
  effects: {
    *queryUserTagClassList ({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserTagClassList, {idCard:idCard,type:1})
      yield put({type: "save", payload: {userTagList: res.result}})
    },
    *queryUserBasicInfo ({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserBasicInfo, {idCard:idCard,type:payload.type})
      yield put({type: "save", payload: {userBaseInfo:res.result}})
    },
    *queryUserAccountInfo ({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserAccountInfo,  {idCard:idCard,type:payload.type})
      yield put({type: "save", payload: {accountInfo: res.result}})
    },
    *queryUserPortraitList({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserPortraitList,  {idCard:idCard,type:1})
      yield put({type: "save", payload: {userPortraitList: res.result}})
    },
    *queryUserInfo({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserInfo,  {idCard:idCard,type:1})
      if (res.code === '0000'&&res.result!==null)
      yield put({type: "save", payload: {userInfo: res.result}})
    },
    *updateUserRemark({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const userId = yield select(state => state.userDetail.userNo)
      const res = yield call(updateUserRemark,  {idCard:idCard,description:payload,userId:userId})
      // yield put({type: "save", payload: {userInfo: res.result}})
      return res
    },
    *queryUserRemark({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const userId = yield select(state => state.userDetail.userNo)
      const res = yield call(queryUserRemark,  {idCard:idCard,description:payload,userId:userId})
      if (res.code==='0000'&&res.result!== null)
         yield put({type: "save", payload: {description: res.result.description}})
    },
    *queryUserLoanInfo({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const creditPagination=yield select(state => state.userDetail.creditPagination)
      if (payload.pageNo) {
        creditPagination.pageNo=payload.pageNo
      }
      if (payload.pageSize) {
        creditPagination.pageSize=payload.pageSize
      }
      const  params={pageNo:creditPagination.pageNo,pageSize:creditPagination.pageSize,params:{idCard:idCard,type:1}}
      const res = yield call(queryUserLoanInfo,  params)
      if (res.code === '0000'){
       const {pageNo,pageSize,totalSize}=res
        creditPagination.pageNo=pageNo
        creditPagination.pageSize=pageSize
        creditPagination.totalSize=totalSize
        yield put({type: "save", payload: {creditList: res.result,creditPagination}})
      }
    },
    *queryUserInsuranceInfo({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const insurePagination=yield select(state => state.userDetail.insurePagination)
      if (payload.pageNo) {
        insurePagination.pageNo=payload.pageNo
      }
      if (payload.pageSize) {
        insurePagination.pageSize=payload.pageSize
      }
      const  params={pageNo:insurePagination.pageNo,pageSize:insurePagination.pageSize,params:{idCard:idCard,type:2}}
      const res = yield call(queryUserInsuranceInfo,  params)
      if (res.code === '0000') {
        yield put({type: "save", payload: {insureList: res.result}})
      }
    },
  }
}

