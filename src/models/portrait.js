import { query,queryClassList,queryTagsList,update,addClass,queryClassId,delClass }  from '../services/portrait'

export default{
    namespace: 'portrait',
    state:{
        list:[],
        tagName:'',
        tagsModal:{
          showTagModel:false,
          expandedKeys:[],
          checkedKeys:[],
          selectedKeys:[],
          autoExpandParent:true,
        },
        tagModalList:[],
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
        showTagModel(state, {payload}){
          return {
            ...state,
            showTagModel:payload
          }
        },
      'inputTas'(state, {payload}){
        return {
          ...state,
          tagName:payload
        }
      },
      'expandedKeys'(state, {payload}){
        return {
          ...state,
          expandedKeys:payload
        }
      },
      'autoExpandParent'(state, {payload}){
          console.log("c:"+payload)
        return {
          ...state,
          autoExpandParent:payload
        }
      },
      'checkedKeys'(state, {payload}){
        return {
          ...state,
          checkedKeys:payload
        }
      },
      'selectedKeys'(state, {payload}){
        return {
          ...state,
          selectedKeys:payload
        }
      },
      'tagModalList'(state, {payload}){
        return {
          ...state,
          tagModalList:payload
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
        *update({payload},{call,put,select}){
          const res = yield call(update,payload)

          yield put({type:'query'})
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
