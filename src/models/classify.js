import { query,addClass,queryClassId,delClass,updateClass,delSubClass }  from '../services/classify'

export default{
    namespace: 'classify',
    state:{
        list:[],
        classItem:{},
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
        },
        addSubClass(state, {payload}){
            let { subClassList } = state.classItem

            if(!subClassList){
                subClassList = []
            }

            //合并新添加的对象值
            return {
                ...state,
                classItem:{
                    ...state.classItem,
                    subClassList:[...subClassList,payload]
                }
            } 
        },
        onEditSubClass(state, { payload }){
            const { subClassList } = state.classItem

            //保存子类编辑
            subClassList.map(item => {
                if(item.cid == payload.cid){
                    item.className = payload.className
                    item.isEdit = false
                }
            })

            return {
                ...state,
                classItem:{
                    ...state.classItem,
                    subClassList:subClassList
                }
            }
        },
        showEditSubClass(state, { payload }){
            const { subClassList } = state.classItem

            //显示编辑的状态
            subClassList.map(item => {
                if(item.cid == payload.cid){
                    item.isEdit = true
                }
            })

            return {
                ...state,
                classItem:{
                    ...state.classItem,
                    subClassList:subClassList
                }
            }
        },
        onSelectedSubClass(state, { payload }){
            const { subClassList } = state.classItem

            //选择子分类
            subClassList.map(item => {
                if(item.cid == payload.cid){
                    item.isSelected = !item.isSelected
                }
            })

            return {
                ...state,
                classItem:{
                    ...state.classItem,
                    subClassList:subClassList
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
        *updateClass({ payload }, { call, put, select }){
            const res = yield call(updateClass,payload)
            
            return res
        },
        *queryClassId({ payload }, { call, put, select }){
            const res = yield call(queryClassId,payload)

            //添加子分类id/编辑/选择状态
            res.result.subClassList.map(item => {
                item.cid = `C${Math.ceil(Math.random() * 1000)}`
                item.isEdit = false
                item.isSelected = false
            })

            yield put({type:'save',payload:{classItem:res.result}})

            return res
        },
        *delClass({ payload }, { call, put, select }){
            const state = yield select(state => state.classify.list)
            
            const res = yield call(delClass,payload)

            if(res.code == '0000'){
                const list = state.filter(item => item.classId != payload.classId)

                yield put({type:'save',payload:{list}})
            }

            return res
        },
        *handlerDel({ payload },{ call,put,select }){
            const classItem = yield select(state => state.classify.classItem)
            const {subClassList = []} = classItem
            
            yield put({type:'save',payload:{
                classItem:{
                    ...classItem,
                    subClassList:subClassList.filter(item => item.isSelected !== true)
                }
            }})
        },
        *delSubClass({ payload }, { call, put, select }){
            const classItem = yield select(state => state.classify.classItem)
            const {subClassList = []} = classItem

            const params = subClassList.filter(item => item.isSelected)
            const res = yield call(delSubClass,{subClassList:params})
            
            return res

        }
    }
}