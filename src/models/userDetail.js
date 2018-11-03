import { queryUserTagClassList,queryUserBasicInfo,queryUserAccountInfo,queryUserPortraitList,queryUserInfo,updateUserRemark,queryUserLoanInfo,queryUserInsuranceInfo } from '../services/userList'

export default {
  namespace: 'userDetail',
  state: {
    userTagList:[],
    userNo:'',
    idCard:'',
    userInfo:'',
    userBaseInfo:'',
    accountInfo:'',
    showModel:false,
    userPortraitList:[],
    pagination:{},
    description:'',
    creditList:[]
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
      const res = yield call(queryUserBasicInfo, {idCard:idCard,type:1})
      yield put({type: "save", payload: {userBaseInfo: res.result}})
    },
    *queryUserAccountInfo ({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserAccountInfo,  {idCard:idCard,type:1})
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
      yield put({type: "save", payload: {userInfo: res.result}})
    },
    *updateUserRemark({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const userId = yield select(state => state.userDetail.userNo)
      const res = yield call(updateUserRemark,  {idCard:idCard,description:payload,userId:userId})
      // yield put({type: "save", payload: {userInfo: res.result}})
      return res
    },
    *queryUserLoanInfo({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const  params={pageNo:payload.pageNo,pageSize:payload.pageSize,params:{idCard:idCard,type:1}}
      const res = yield call(queryUserLoanInfo,  params)
      yield put({type: "save", payload: {creditList: res.result}})
    },
    *queryUserInsuranceInfo({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const  params={pageNo:payload.pageNo,pageSize:payload.pageSize,params:{idCard:idCard,type:2}}
      const res = yield call(queryUserInsuranceInfo,  params)
      yield put({type: "save", payload: {creditList: res.result}})
    },
  }
}

