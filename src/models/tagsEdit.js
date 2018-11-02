import { add, getAttributeListTree, getAttributeListEnum } from '../services/tags'
import toTreeData from '../utils/toTreeData'

export default {
    namespace: 'tagsEdit',
    state: {
        attrTree: [],
        selectedTree3: [{ id: '28142K', name: '3个月内手机' }, { id: '111957', name: '行业' }, { id: '25131T', name: '信用卡信用额度' }],
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
        selectedRange:"102",
        attrList:[],
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
            const attrList = yield select(state => state.tagsEdit.attrList)
            
            yield put({ type: 'save', payload: { attrList:[...attrList,payload] } })
        },
    }
}