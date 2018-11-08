import { query,add,update,queryPortraitId,delPortrait,queryClassListByTag,querySubLevelClassList }  from '../services/portrait'

export default{
    namespace: 'portrait',
    state:{
        list:[],
        showTagModel:false,
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
      tagModalList(state, {payload}){
          let temp=payload.map((item)=>{
            let su={}
            su.tagId=item.id
            su.tagName=item.name
            return su
          })
        return {
          ...state,
          portraitItem:{
             ...state.portraitItem,
            tagList:temp
          }
        }
      },
      removeTag(state, {payload:tagId}){
        let temp =state.portraitItem.tagList.filter(item => item.tagId !== tagId)
        return {
          ...state,
          portraitItem:{
            ...state.portraitItem,
            tagList:temp
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
          if (res.code==='0000')
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

        if (res.code==='0000')
          yield put({type:'save',payload:{listClassTag:res.result}})
      },
      *querySubLevelClassList({ payload }, { call, put, select }){
        const res = yield call(querySubLevelClassList, payload)

        if (res.code==='0000')
          yield put({type:'save',payload:{classList:res.result}})
      }
    }
}
