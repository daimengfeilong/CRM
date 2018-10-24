import { query }  from '../services/classify'

export default{
    namespace: 'classify',
    state:{
        list:[],
        showModel:true,
        subClass:[
            {
                classId:1,
                className:'test1'
            },
            {
                classId:2,
                className:'test2'
            }
        ]
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
            return {
                ...state,
                subClass:[...state.subClass,payload]
            } 
        },
        delSubClass(state, { payload }){
            return {
                ...state,
                subClass:state.subClass.filter(item => item.classId != payload.classId)
            }
        }
    },
    effects: {
        *query({ payload }, { call, put, select }){
            const res = yield call(query)
            
            yield put({type:'save',payload:{list:res.result}})
        }
    }
}