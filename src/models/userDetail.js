import { queryUserTagClassList,queryUserBasicInfo } from '../services/userList'

export default {
  namespace: 'userDetail',
  state: {
    userTagList:[],
    userNo:'',
    idCard:'',
    userBaseInfo:'',
    pagination:{}
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
      const res = yield call(queryUserTagClassList, payload)
      yield put({type: "save", payload: {userTagList: res.result}})
    },
    *saveIdCardAndUserNo({payload},{call, put, select}){
      yield put({type: "save", payload})
    },
    *queryUserBasicInfo ({payload}, {call, put, select}) {
      const res = yield call(queryUserBasicInfo, payload)
      yield put({type: "save", payload: {userBaseInfo: res.result}})
    },
  }
}

