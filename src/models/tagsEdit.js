import { add, getAttributeListTree, getAttributeListEnum, queryId, edit } from '../services/tags'
import toTreeData from '../utils/toTreeData'

export default {
    namespace: 'tagsEdit',
    state: {
        attrItem: {//接口数据
            tagName: '',
            classId: '',
            description: '',
            attrList: []
        },
        attrTree: [],//属性树
        selectedTree3: [],//三级属性列表
        selectedTree3Item: {},//选中的三级
        fourAttr: {},//四级属性
        attrRange: [//四级属性范围条件
            { value: "101", name: "介于" },
            { value: "102", name: "不介于" },
            { value: "103", name: "等于" },
            { value: "104", name: "不等于" },
            { value: "105", name: "大于" },
            { value: "106", name: "小于" },
            { value: "107", name: "大于等于" },
            { value: "108", name: "小于等于" }
        ],
        selectedRange: {},//选择的范围条件
        checkedAttrList: [],//选中的四级checkBox
        showModel: false//属性树弹窗
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
            const { attrRange } = yield select(item => item.tagsEdit)
            const res = yield call(queryId, payload)
            const selectedTree3 = []
            const checkedAttrList = []
            let selectedRange = {}
            const { result } = res
            const { attrList } = result

            //编辑标签数据回显
            if (res.code === '0000') {
                attrList.map(item => {
                    item.optName = item.attrVal

                    //过滤重量三级属性
                    if(!selectedTree3.some(s => s.id === item.attrId)){
                        let obj = {
                            id:item.attrId,
                            name:item.attrName,
                            ranges:{}
                        }
                        if(item.attrVal.includes('|')){
                            const val = item.attrVal.split('|')
                            const min = Number(val[1].split(',')[0])
                            const max = Number(val[1].split(',')[1])
                            obj.ranges.value = val[0]
                            obj.ranges.name = attrRange.find(item => item.value === val[0]).name

                            if(val[0] === '101' || val[0] === '102'){
                                obj.ranges.min = min
                                obj.ranges.max = max
                            }else{
                                obj.ranges.med = min
                            }
                        }
                        selectedTree3.push(obj)
                    }
                    
                    //选中四级属性
                    checkedAttrList.push(item.attrVal)
                })

                const selectedTree3Item = selectedTree3[0]

                if(attrList.length){
                    const attrItem0 = attrList[0].attrVal

                    //选中范围条件
                    if(attrItem0.includes('|')){
                        const fristAttrVal = attrItem0.split('|')[0]
                        selectedRange = { value: fristAttrVal,name:attrRange.find(item => item.value === fristAttrVal).name }
                    }
                    
                    //查询第一条三级属性
                    yield put({ type: 'getAttributeListEnum', payload: {attrId:selectedTree3Item.id} })
                }

                yield put({ type: 'save', payload: { attrItem: result, selectedTree3, selectedRange, selectedTree3Item, checkedAttrList } })
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
        *saveAttrListItem({ payload }, { call, put, select }) {
            const { attrItem } = yield select(state => state.tagsEdit)
            let { attrList = [] } = attrItem
            let list = []

            //过滤多选
            if(!payload.optName){
                //编辑
                if(attrList.some(item => item.attrId === payload.attrId)){
                    for(let item of attrList){
                        if(item.attrId === payload.attrId){
                            list.push(payload)
                        }else{
                            list.push(item)
                        }
                    }
                }else{
                    //新增
                    list = [...attrList, payload]
                }

            }else{
                list = [...attrList, payload]
            }

            //新增
            yield put({ type: 'save', payload: { attrItem: { ...attrItem, attrList:list } } })
        },
    }
}