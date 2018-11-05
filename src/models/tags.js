import { query,queryId,del }  from '../services/tags'

export default{
    namespace: 'tags',
    state:{
        list:[],
        data:{},
        pagination:{},
        showModel:false
    },
    reducers:{
        save(state, {payload}){
            return {
                ...state,
                ...payload
            }
        }
    },
    effects: {
        *query({ payload }, { call, put, select }){
            const res = yield call(query,payload)
            const { totalSize,pageNo,pageSize } = res

            const pagination = {
                total:totalSize,
                current:pageNo,
                pageSize,
            }

            yield put({type:'save',payload:{list:res.result,pagination}})
        },
        *queryId({ payload }, { call, put, select }){
            const res = yield call(queryId,payload)

            yield put({type:'save',payload:{data:res.data.data[0]}})
        },
        *del({ payload }, { call, put, select }){
            const state = yield select(state => state.tags.list)
            const res = yield call(del,payload)

            if(res.code === '0000'){
                const list = state.filter(item => item.tagId !== payload.tagId)

                yield put({type:'save',payload:{list}})
            }
        }
    }
}
