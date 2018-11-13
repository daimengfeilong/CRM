import { add, getAttributeListTree, getAttributeListEnum, queryId, edit } from '../services/tags'
import toTreeData from '../utils/toTreeData'

export default {
    namespace: 'tagsEdit',
    state: {
        attrItem: {
            tagName: '',
            classId: '',
            description: '',
            attrList: []
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
        selectedRange: {},
        checkedAttrList: [],
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
            const selectedTree3 = []
            const checkedAttrList = []
            const { result } = res
            const { attrList } = result

            //编辑标签数据回显
            if (res.code === '0000') {
                attrList.map(item => {
                    //过滤重量三级属性
                    if(!selectedTree3.some(s => s.id === item.attrId)){
                        selectedTree3.push({
                            id:item.attrId,
                            name:item.attrName
                        })
                    }
                    //选中四级属性
                    checkedAttrList.push(item.attrVal)
                })
                const selectedTree3Item = selectedTree3[0]

                //查询第一条三级属性
                if(attrList.length){
                    yield put({ type: 'getAttributeListEnum', payload: {attrId:selectedTree3Item.id} })
                }
                yield put({ type: 'save', payload: { attrItem: result, selectedTree3, selectedTree3Item, checkedAttrList } })
            }
        },
        *saveAttrList({ payload }, { call, put, select }) {
            const { attrItem } = yield select(state => state.tagsEdit)

            yield put({ type: 'save', payload: { attrItem: { ...attrItem, attrList: payload.list } } })
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
            const { selectedTree3 } = yield select(state => state.tagsEdit)
            const newSelectedTree3 = selectedTree3.filter(item => item.id != payload.id)

            yield put({ type: 'save', payload: { selectedTree3: newSelectedTree3 } })
        },
        *addAttrListItem({ payload }, { call, put, select }) {
            const { attrItem } = yield select(state => state.tagsEdit)
            const { attrList = [] } = attrItem

            yield put({ type: 'save', payload: { attrItem: { ...attrItem, attrList: [...attrList, payload] } } })
        },
    }
}