import { add,getAttributeListTree,getAttributeListEnum }  from '../services/tags'
import toTreeData from '../utils/toTreeData'

export default{
    namespace: 'tagsEdit',
    state:{
        attrTree:[],
        showModel:false
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
        }
    },
    effects: {
        *add({ payload }, { call, put, select }){
            const res = yield call(add,payload)
            
            return res
        },
        *getAttributeListTree({ payload }, { call, put, select }){
            const res = yield call(getAttributeListTree,payload)
            const attrTree = toTreeData(res.result)
            
            yield put({type:'save',payload:{attrTree}})
        },
        *getAttributeListEnum({ payload }, { call, put, select }){
            const res = yield call(getAttributeListEnum,payload)
            
            return res
        },
    }
}