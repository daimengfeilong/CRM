import { query } from '../services/userList'

export default {
  namespace: 'userList',
  state: {
    list:[],
    count: 0,
    things:[],
    pagination:{}
  },
  reducers: {
    save (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    'minus' (state) {
      return {
        ...state,
        count: state.count - 1,
      }
    },
    'addThings'(state,{payLoad}){
      let { things } = state
      if(!things){
        things = []
      }
      console.log(payLoad)

      return{
        ...state,
        things:[...things,payLoad]
      }
    },
    'delete'(state,{payload: id}){
      return{
        ...state,
        things:state.things.filter(item => item.id !== id)
      }
    }
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

