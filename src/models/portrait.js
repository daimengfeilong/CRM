import { query,addClass,queryClassId,delClass }  from '../services/portrait'

export default{
    namespace: 'portrait',
    state:{
        list:[],
        showModel:false,
        classItem:{}
    },
    reducers:{
        save(state, {payload}){
            return {
                ...state,
                ...payload
            }
        },
        showModel(state, {payload}){
            return {
                ...state,
                showModel:payload
            }
        },
        addSubClass(state, {payload}){
            const { subClassList } = state.classItem

            return {
                ...state,
                classItem:{
                    subClassList:[...subClassList,payload]
                }
            }
        },
        delSubClass(state, { payload }){
            const { subClassList } = state.classItem

            return {
                ...state,
                classItem:{
                    subClassList:subClassList.filter(item => item.classId != payload.classId)
                }
            }
        }
    },
    effects: {
        *query({ payload }, { call, put, select }){
            const res = yield call(query,payload)

            yield put({type:'save',payload:{list:res.result}})
        },
        *addClass({ payload }, { call, put, select }){
            const res = yield call(addClass,payload)

            return res
        },
        *queryClassId({ payload }, { call, put, select }){
            const res = yield call(queryClassId,payload)

            yield put({type:'save',payload:{classItem:res.result}})

            return res
        },
        *delClass({ payload }, { call, put, select }){
            const state = yield select(state => state.portrait.list)

            const res = yield call(delClass,payload)

            if(res.code == '0000'){
                const list = state.filter(item => item.classId != payload.classId)

                yield put({type:'save',payload:{list}})
            }

            return res
        }
    }
}
