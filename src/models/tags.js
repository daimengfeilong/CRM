import request  from '../utils/request'
import { getQueryString }  from '../utils/utils'

export default{
    namespace: 'tags',
    state:{
        tags:[],
        data:{}
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
        *add({ payload }, { call, put, select }){
            const res = yield request({
                url:'/api/tags/add',
                method:'POST',
                data:payload
            })
            return res
        },
        *query({ payload }, { call, put, select }){
            const res = yield request({
                url : `/api/tags/list`,
                method:'GET'
            })

            yield put({type:'save',payload:{tags:res.data.data}})
        },
        *queryId({ payload }, { call, put, select }){
            const res = yield request({
                url:'/api/tags/query',
                method:'GET',
                data:{
                    _id:payload._id
                }
            })
            
            yield put({type:'save',payload:{data:res.data.data[0]}})
        },
        *del({ payload }, { call, put, select }){
            const state = yield select(state => state.tags.tags)

            const res = yield request({
                url:'/api/tags/del',
                method:'POST',
                data:payload
            })
            if(res.data.code === 1){
                const tags = state.filter(item => item._id != payload._id)
                yield put({type:'save',payload:{tags}})
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname,search }) => {
                if (pathname === '/tags') {
                    dispatch({ type: 'query'});
                }else if(pathname === '/tags/edit'){
                    dispatch({ type: 'save',payload:{data:{}}})
                    if(search.includes('id')){
                        dispatch({ type: 'queryId',payload:{'_id':getQueryString('id')}})
                    }
                }
            });
        },
    },
}