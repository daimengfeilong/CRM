import { query,queryClassList,queryTagsList,update,addClass,queryClassId,delClass }  from '../services/portrait'

export default{
    namespace: 'portrait',
    state:{
        list:[],
        tagName:'',
        showTagModel:false,
        selectedKeys:[],
        expandedKeys:[],
        autoExpandParent:true,
        checkedKeys:[],
        showModel:false,
        portraitItem:{
          tagList:[]
        }
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
      inputTas(state, {payload}){
        return {
          ...state,
          tagName:payload
        }
      },
      expandedKeys(state, {payload}){
        return {
          ...state,
          expandedKeys:payload
        }
      },
      autoExpandParent(state, {payload}){
          console.log("c:"+payload)
        return {
          ...state,
          autoExpandParent:payload
        }
      },
      checkedKeys(state, {payload}){
        return {
          ...state,
          checkedKeys:payload
        }
      },
      selectedKeys(state, {payload}){
        return {
          ...state,
          selectedKeys:payload
        }
      },
      tagModalList(state, {payload}){
        return {
          ...state,
          checkedKeys:[],
          portraitItem:{
             ...state.portraitItem,
            tagList:payload
          }
        }
      },
      removeCheckedKeys(state, {payload:id}){
        console.log(state.checkedKeys)
        return {
          ...state,
          checkedKeys:state.checkedKeys.filter(item => item !== id)
        }
      },
      removeTag(state, {payload:tagId}){
          console.log(tagId)
        return {
          ...state,
          checkedKeys:state.checkedKeys.filter(item => item !== tagId),
          portraitItem:{
            ...state.portraitItem,
            tagList:state.portraitItem.tagList.filter(item => item.tagId !== tagId)
          }
        }
      },
      addPortraitName(state, {payload}){
        console.log(payload)
        return {
          ...state,
          checkedKeys:[],
          portraitItem:{
            ...state.portraitItem,
            portraitName:payload
          }
        }
      },
      addClassId(state, {payload}){
        console.log(payload)
        return {
          ...state,
          portraitItem:{
            ...state.portraitItem,
            classId:payload
          }
        }
      },
      addDescription(state, {payload}){
        console.log(payload)
        return {
          ...state,
          portraitItem:{
            ...state.portraitItem,
            description:payload
          }
        }
      },
      clearItem(state, {payload}){
        console.log(payload)
        return {
          ...state,
          portraitItem:{
          }
        }
      },
    },
    effects: {
        *query({ payload }, { call, put, select }){
            const res = yield call(query,payload)

            yield put({type:'save',payload:{list:res.result}})
        },
        *update({payload},{call,put,select}){
          const res = yield call(update,payload)

          yield put({type:'clearItem'})
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
