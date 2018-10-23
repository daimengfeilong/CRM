import {query,add,queryId,del}  from '../services/article'
import {getQueryString}  from '../utils/utils'

export default{
    namespace: 'article',
    state:{
        collapsed:false,
        list:[],
        data:{}
    },
    reducers:{
        toggle(state, action){
            return {collapsed:!state.collapsed}
        },
        save(state, {payload}){            
            return {
                ...state,
                ...payload,
            }
        }
    },
    effects: {
        *add({ payload }, { call, put, select }){
            const res = yield call(add,payload)

            return res
        },
        *query({ payload }, { call, put, select }){
            const res = yield call(query)

            yield put({type:'save',payload:{list:res.data.data}})
        },
        *queryId({ payload }, { call, put, select }){
            const res = yield call(queryId,payload)
            
            yield put({type:'save',payload:{data:res.data.data[0]}})
        },
        *del({ payload }, { call, put, select }){
            const state = yield select(state => state.article.list)
            const res = yield call(del,payload)
            
            if(res.data.code === 1){
                const list = state.filter(item => item._id != payload._id)
                yield put({type:'save',payload:{list}})
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname,search }) => {
                if (pathname === '/' || pathname === '/article') {
                    // dispatch({ type: 'query'})
                    // dispatch({ type: 'tags/query'})
                }else if(pathname === '/article/edit'){
                    dispatch({ type: 'tags/query'})
                    dispatch({ type: 'save',payload:{data:{}}})
                    if(search.includes('id')){
                        dispatch({ type: 'queryId',payload:{'_id':getQueryString('id')}})
                    }
                }
            });
        },
    },
}