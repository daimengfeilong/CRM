import request  from '../utils/request'
import {getQueryString}  from '../utils/utils'

export default{
    namespace: 'article',
    state:{
        collapsed:false,
        list:[],
        tags:[],
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
            const res = yield request({
                url:'/api/article/add',
                method:'POST',
                data:payload
            })
            return res
        },
        *query({ payload }, { call, put, select }){
            const res = yield request({
                url:'/api/article/list',
                method:'GET'
            })

            yield put({type:'save',payload:{list:res.data.data}})
        },
        *queryId({ payload }, { call, put, select }){
            const res = yield request({
                url:'/api/article/query',
                method:'GET',
                data:{
                    _id:payload._id
                }
            })            
            yield put({type:'save',payload:{data:res.data.data[0]}})
        },
        *tags({ payload }, { call, put, select }){
            const res = yield request({
                url:'/api/tags/list',
                method:'GET'
            })

            yield put({type:'save',payload:{tags:res.data.data}})
        },
        *del({ payload }, { call, put, select }){
            const state = yield select(state => state.index.list)

            const res = yield request({
                url:'/api/article/del',
                method:'POST',
                data:payload,
            })
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
                    dispatch({ type: 'query'})
                    dispatch({ type: 'tags'})
                }else if(pathname === '/article/edit'){
                    dispatch({ type: 'tags'})
                    dispatch({ type: 'save',payload:{data:{}}})
                    if(search.includes('id')){
                        dispatch({ type: 'queryId',payload:{'_id':getQueryString('id')}})
                    }
                }
            });
        },
    },
}