import { query } from '../services/userList'

export default {
  namespace: 'userList',
  state: {
    list:[],
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
    *query ({payload}, {call, put, select}) {
      const res = yield call(query, payload)
      const {totalSize, pageNo, pageSize} = res
      const pagination = {
        total: totalSize,
        current: pageNo,
        pageSize
      }
      yield put({type: "save", payload: {list: res.result, pagination}})
    }
  }
}

