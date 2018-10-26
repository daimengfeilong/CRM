import { query,addClass,queryClassId,delClass,updateClass }  from '../services/classify'

export default{
    namespace: 'classify',
    state:{
        list:[],
        classItem:{
            subClassList:[]
        },
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
        delSubClass(state, { payload }){
            const { subClassList } = state.classItem

            //删除子分类
            return {
                ...state,
                classItem:{
                    ...state.classItem,
                    subClassList:subClassList.filter(item => payload.indexOf(item.classId) == -1)
                }
            }
        },
        onEditSubClass(state, { payload }){
            const { subClassList } = state.classItem

            //保存编辑
            subClassList.map(item => {
                if(item.classId == payload.classId){
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
                if(item.classId == payload.classId){
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
                if(item.classId == payload.classId){
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

            //添加子分类编辑/选择状态
            res.result.subClassList.map(item => {
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
        }
    }
}