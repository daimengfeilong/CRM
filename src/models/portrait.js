import { query,add,update,queryPortraitId,delPortrait,queryClassListByTag,querySubLevelClassList }  from '../services/portrait'

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
        },
        listClassTag:[],
        classList:[],
        pagination:{},
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
          let temp=payload.map((item)=>{
            let su={}
            su.tagId=item.id
            su.tagName=item.name
            return su
          })
        return {
          ...state,
          checkedKeys:[],
          portraitItem:{
             ...state.portraitItem,
            tagList:temp
          }
        }
      },
      removeCheckedKeys(state, {payload:id}){
        return {
          ...state,
          checkedKeys:state.checkedKeys.filter(item => item !== id)
        }
      },
      removeTag(state, {payload:tagId}){
        let temp =state.portraitItem.tagList.filter(item => item.tagId !== tagId)
        return {
          ...state,
          checkedKeys:state.checkedKeys.filter(item => item !== tagId),
          portraitItem:{
            ...state.portraitItem,
            tagList:temp
          }
        }
      },
      addPortraitName(state, {payload}){
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
        return {
          ...state,
          portraitItem:{
            ...state.portraitItem,
            classId:payload
          }
        }
      },
      addDescription(state, {payload}){
        return {
          ...state,
          portraitItem:{
            ...state.portraitItem,
            description:payload
          }
        }
      },
      clearItem(state, {payload}){
        return {
          ...state,
          portraitItem:{
            tagList:[]
          }
        }
      },
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
        *add({payload},{call,put,select}){
          const res = yield call(add,payload)
          return res
          },
        *update({payload},{call,put,select}){
          const res = yield call(update,payload)
          return res
        },
        *queryPortraitId({ payload:portraitId }, { call, put, select }){
            const res = yield call(queryPortraitId,{ portraitId})

            yield put({type:'save',payload:{portraitItem:res.result}})

            return res
        },
        *delPortrait({ payload:portraitId }, { call, put, select }){
            const state = yield select(state => state.portrait.list)

            const res = yield call(delPortrait,{portraitId})

            if(res.code === '0000'){
                const list = state.filter(item => item.portraitId !== portraitId)

                yield put({type:'save',payload:{list}})
            }

            return res
        },
      *queryClassListByTag({ payload }, { call, put, select }){
        const res = yield call(queryClassListByTag,payload)
        yield put({type:'save',payload:{listClassTag:res.result}})
      },
      *querySubLevelClassList({ payload }, { call, put, select }){
        const res = yield call(querySubLevelClassList, payload)
        yield put({type:'save',payload:{classList:res.result}})
      }


    }
}
