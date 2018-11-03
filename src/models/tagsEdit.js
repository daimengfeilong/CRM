import { add, getAttributeListTree, getAttributeListEnum, queryId, edit } from '../services/tags'
import toTreeData from '../utils/toTreeData'

export default {
    namespace: 'tagsEdit',
    state: {
        attrItem:{
            tagName:'',
            classId:'',
            description:'',
            attrList:[]
        },
        attrTree: [],
        selectedTree3: [],
        selectedTree3Item: {},
        fourAttr: {},
        attrRange: [
            { value: "101", name: "介于" },
            { value: "102", name: "不介于" },
            { value: "103", name: "等于" },
            { value: "104", name: "不等于" },
            { value: "105", name: "大于" },
            { value: "106", name: "小于" },
            { value: "107", name: "大于等于" },
            { value: "108", name: "小于等于" }
        ],
        selectedRange:{},
        checkedAttrList:[],
        showModel: false
    },
    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    },
    effects: {
        *add({ payload }, { call, put, select }) {
            const res = yield call(add, payload)

            return res
        },
        *edit({ payload }, { call, put, select }) {
            const res = yield call(edit, payload)
            
            return res
        },
        *queryId({ payload }, { call, put, select }) {
            const res = yield call(queryId, payload)
            
            if(res.code === '0000'){
                yield put({ type: 'save', payload: { attrItem: res.result } })
            }
        },
        *saveAttrList({ payload }, { call, put, select }) {
            const attrItem = yield select(state => state.tagsEdit.attrItem)

            yield put({ type: 'save', payload: { attrItem: {...attrItem,attrList:payload.list } } })
        },
        *getAttributeListTree({ payload }, { call, put, select }) {
            const res = yield call(getAttributeListTree, payload)
            const attrTree = toTreeData(res.result)

            yield put({ type: 'save', payload: { attrTree } })
        },
        *getAttributeListEnum({ payload }, { call, put, select }) {
            const res = yield call(getAttributeListEnum, payload)

            yield put({ type: 'save', payload: { fourAttr: res.result } })
        },
        *removeThreeItem({ payload }, { call, put, select }) {
            const state = yield select(state => state.tagsEdit.selectedTree3)
            const selectedTree3 = state.filter(item => item.id != payload.id)

            yield put({ type: 'save', payload: { selectedTree3 } })
        },
        *addAttrListItem({ payload }, { call, put, select }) {
            const attrItem = yield select(state => state.tagsEdit.attrItem)
            const { attrList } = attrItem
            
            yield put({ type: 'save', payload: { attrItem:{...attrItem,attrList:[...attrList,payload]} } })
        },
    }
}