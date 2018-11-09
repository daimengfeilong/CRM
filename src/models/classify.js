import { query,addClass,queryClassId,delClass,updateClass,delSubClass }  from '../services/classify'

export default{
    namespace: 'classify',
    state:{
        list:[],
        classItem:{},
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
        *addClass({ payload }, { call, put, select }){
            const res = yield call(addClass,payload)
            
            return res
        },
        *updateClass({ payload }, { call, put, select }){
            const res = yield call(updateClass,payload)
            
            return res
        },
        *queryClassId({ payload }, { call, put, select }){
            const res = yield call(queryClassId,payload)

            //添加子分类id/编辑/选择状态
            res.result.subClassList.map((item,index) => {
                item.cid = `C${index}`
                item.isEdit = false
                item.isSelected = false
            })

            yield put({type:'save',payload:{classItem:res.result}})

            return res
        },
        *delClass({ payload }, { call, put, select }){
            const { list } = yield select(state => state.classify)
            
            const res = yield call(delClass,payload)

            if(res.code === '0000'){
                const newList = list.filter(item => item.classId !== payload.classId)

                yield put({type:'save',payload:{list:newList}})
            }

            return res
        },
        *handlerDel({ payload },{ call,put,select }){
            const { classItem } = yield select(state => state.classify)
            const {subClassList = []} = classItem
            
            yield put({type:'save',payload:{
                classItem:{
                    ...classItem,
                    subClassList:subClassList.filter(item => item.isSelected !== true)
                }
            }})
        },
        *delSubClass({ payload }, { call, put, select }){
            const {classItem} = yield select(state => state.classify)
            const {subClassList = []} = classItem

            const params = subClassList.filter(item => item.isSelected)
            const res = yield call(delSubClass,{subClassList:params})
            
            return res

        }
    }
}