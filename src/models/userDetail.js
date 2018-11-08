import { queryUserTagClassList,queryUserBasicInfo,queryUserAccountInfo,queryUserPortraitList,queryUserInfo,updateUserRemark,queryUserLoanInfo,queryUserInsuranceInfo
        ,queryUserRemark,queryFileList,queryCodes,queryTagsByClassId} from '../services/userList'
import {queryPortraitId} from '../services/portrait'
import {queryId} from '../services/tags'

export default {
  namespace: 'userDetail',
  state: {
    userTagList:[],
    userNo:'',
    idCard:'',
    userInfo:'',//用户公共信息
    description:'',//用户备注
    userBaseInfo:'',
    accountInfo:'',
    showModel:false,
    userPortraitList:[],
    creditPagination:{
      pageNo:1,
      pageSize:10,
      totalSize:''
    },
    insurePagination:{
      pageNo:1,
      pageSize:10,
      totalSize:''
    },
    creditList:[],
    insureList:[],
    portraitItem:'',
    fileList:[],
    pics:{},
    codes:[],
    tagList:[],
    allData:[],
    checkedValues:[],
    showTagModel:false,
    tagItem:''
  },
  reducers: {
    save (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    saveAll (state, {payload}) {
      let temp=state.allData
      let add=[]
      if (temp.length==0){
        add=payload
      } else {
        add=[...add,...payload]
        add = add.filter(function (item, index, self) {
          return self.indexOf(item) == index;
        });
      }
      return {
        ...state,
        allData:[...state.allData,...add]
      }
    },
    saveFilter (state, {payload}) {
      return {
        ...state,
        allData:state.allData.filter(item => item.classId !== payload.classId)
      }
    },
  },
  effects: {
    *queryUserTagClassList ({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserTagClassList, {idCard:idCard,type:1})
      if (res.code==='0000'&&res.result!== null)
      yield put({type: "save", payload: {userTagList: res.result}})
    },
    *queryTagsByClassId ({payload:classId}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const allData = yield select(state => state.userDetail.allData)
      const res = yield call(queryTagsByClassId, {idCard:idCard,type:1,classId})

      yield put({type: "saveAll", payload:  [...res.result]})
      // if (res.code==='0000'&&res.result!== null){
      //   yield put({type: "save", payload: {tagList: res.result}})
      // }
    },
    *queryAllHash ({payload}, {call, put, select}) {
      const userTagList = yield select(state => state.userDetail.userTagList)
      // let allData = yield select(state => state.userDetail.allData)
      for (let i=0;i<userTagList.length;i++){
        const classId=userTagList[i].classId
        yield put({type: "queryTagsByClassId", payload:classId})
        // res.then(data=> {
        //   if (data.code==='0000') {
        //     const sub = data.result.map((item) => {
        //       var temp = {}
        //       temp.classId = item.classId
        //       temp.tagId = item.tagId
        //       temp.tagName = item.tagName
        //       return temp
        //     })
        //     allData = [...allData, ...sub]
        //     console.log(allData)
        //
        //     put({type: "save", payload: {allData:allData}})
        //   }
        // });
      }
      // console.log(allData)
      // yield put({type: "save", payload: {allData:allData}})
      // const res = yield call(queryTagsByClassId, {idCard:idCard,type:1,classId})
      //
      // return res
      // if (res.code==='0000'&&res.result!== null){
      //   yield put({type: "save", payload: {tagList: res.result}})
      // }
    },

    *queryUserBasicInfo ({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserBasicInfo, {idCard:idCard,type:payload.type})
      if (res.code==='0000'&&res.result!== null)
      yield put({type: "save", payload: {userBaseInfo:res.result}})
    },
    *queryUserAccountInfo ({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserAccountInfo,  {idCard:idCard,type:payload.type})
      if (res.code==='0000'&&res.result!== null)
      yield put({type: "save", payload: {accountInfo: res.result}})
    },
    *queryUserPortraitList({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserPortraitList,  {idCard:idCard,type:1})
      if (res.code==='0000'&&res.result!== null)
      yield put({type: "save", payload: {userPortraitList: res.result}})
    },
    *queryPortraitId({payload:portraitId}, {call, put, select}) {
      const res = yield call(queryPortraitId,{ portraitId})
      if (res.code==='0000'&&res.result!== null)
      yield put({type:'save',payload:{portraitItem:res.result}})
    },
    *queryUserInfo({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const res = yield call(queryUserInfo,  {idCard:idCard,type:1})
      if (res.code === '0000'&&res.result!==null)
      yield put({type: "save", payload: {userInfo: res.result}})
    },
    *updateUserRemark({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const userId = yield select(state => state.userDetail.userNo)
      const res = yield call(updateUserRemark,  {idCard:idCard,description:payload,userId:userId})
      // yield put({type: "save", payload: {userInfo: res.result}})
      return res
    },
    *queryUserRemark({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const userId = yield select(state => state.userDetail.userNo)
      const res = yield call(queryUserRemark,  {idCard:idCard,description:payload,userId:userId})
      if (res.code==='0000'&&res.result!== null)
         yield put({type: "save", payload: {description: res.result.description}})
    },
    *queryUserLoanInfo({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const creditPagination=yield select(state => state.userDetail.creditPagination)
      if (payload.pageNo) {
        creditPagination.pageNo=payload.pageNo
      }
      if (payload.pageSize) {
        creditPagination.pageSize=payload.pageSize
      }
      const  params={pageNo:creditPagination.pageNo,pageSize:creditPagination.pageSize,params:{idCard:idCard,type:1}}
      const res = yield call(queryUserLoanInfo,  params)
      if (res.code === '0000'){
       const {pageNo,pageSize,totalSize}=res
        creditPagination.pageNo=pageNo
        creditPagination.pageSize=pageSize
        creditPagination.totalSize=totalSize
        yield put({type: "save", payload: {creditList: res.result,creditPagination}})
      }
    },
    *queryUserInsuranceInfo({payload}, {call, put, select}) {
      const idCard = yield select(state => state.userDetail.idCard)
      const insurePagination=yield select(state => state.userDetail.insurePagination)
      if (payload.pageNo) {
        insurePagination.pageNo=payload.pageNo
      }
      if (payload.pageSize) {
        insurePagination.pageSize=payload.pageSize
      }
      const  params={pageNo:insurePagination.pageNo,pageSize:insurePagination.pageSize,params:{idCard:idCard,type:2}}
      const res = yield call(queryUserInsuranceInfo,  params)
      if (res.code === '0000') {
        yield put({type: "save", payload: {insureList: res.result}})
      }
    },
    *queryFileList({payload}, {call, put, select}) {
      const certNo = yield select(state => state.userDetail.idCard)
      const loanNo = yield select(state => state.userDetail.userNo)
      const  params={params:{fileType:'ATT',certNo,loanNo}}
      const res = yield call(queryFileList,  params)
      if (res.code === '0000') {
        yield put({type: "save", payload: {fileList: res.result}})
      }
    },
    *queryCodes({payload}, {call, put, select}) {
      const res = yield call(queryCodes)
      if (res.code === '0000') {
        yield put({type: "save", payload: {codes: res.result.Atta_Type}})
      }
    },
    *queryId({payload:tagId}, {call, put, select}) {
      const res = yield call(queryId,{tagId})
      if (res.code === '0000') {
        yield put({type: "save", payload: {tagItem: res.result}})
      }
      console.log(res)
      return res
    },
  }
}

