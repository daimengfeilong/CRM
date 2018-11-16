import React from 'react'
import { Input, Select, Message } from 'antd'

const InputGroup = Input.Group
const Option = Select.Option

const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/

const num = ({ dispatch, selectedTree3, selectedTree3Item, selectedRange, attrRange, fourAttr }) => {
    const { ranges = {} } = selectedTree3Item
    const { min, max, med } = ranges
    const { datas = [] } = fourAttr
    let rangeDatas = {}

    if (datas.length && datas[0]) {
        let minf = datas.find(item => item.min)
        let maxf = datas.find(item => item.max)

        rangeDatas.min = minf ? minf.min : ''
        rangeDatas.max = maxf ? maxf.max : ''
    }

    const saveAttrListItem = (range = selectedRange) => {
        const { name, id } = selectedTree3Item
        let attrVal = ''
        let nickName = ''

        if (range.value === '101' || range.value === '102') {
            attrVal = `${range.value}|${min},${max}`
            nickName = `${name} | (${range.name}) ${min}-${max}`
        } else {
            attrVal = `${range.value}|${med}`
            nickName = `${name} | (${range.name}) ${med}`
        }

        //保存范围三级属性
        selectedTree3.map(item => {
            if (item.id === id) {
                item.ranges = ranges
            }
        })

        dispatch({
            type: 'tagsEdit/save',
            payload: {
                selectedTree3
            }
        })

        dispatch({
            type: 'tagsEdit/saveAttrListItem',
            payload: {
                nickName,
                attrVal,
                attrName: selectedTree3Item.name,
                attrId: id,
                alid: `AL${Date.now()}`,
            }
        })
    }

    const saveRanges = (val) => {
        const { name, value } = selectedRange

        dispatch({
            type: 'tagsEdit/save',
            payload: {
                selectedTree3Item: {
                    ...selectedTree3Item,
                    ranges: {
                        ...ranges,
                        ...val,
                        name,
                        value
                    }
                }
            }
        })
    }

    const rangeChange = (value) => {
        const range = {
            name: attrRange.find(item => item.value === value).name,
            value            
        }

        if(range.value === '101' || range.value === '102'){
            if(min && max){
                saveAttrListItem(range)
            }
        }else{
            if(med){
                saveAttrListItem(range)
            }
        }

        dispatch({
            type: 'tagsEdit/save',
            payload: {
                selectedRange: range
            }
        })
        
    }

    const blurMin = () => {
        //格式检测
        if (reg.test(min)) {
            //min/max比较
            if (max) {
                if (min < max) {
                    saveAttrListItem()
                } else {
                    Message.error('不能大于最大值')
                }
            }
        } else {
            Message.error('请输入数字类型')
        }

    }

    const blurMax = () => {
        //格式检测
        if (reg.test(max)) {
            //min/max比较
            if (min) {
                if (max > min) {
                    saveAttrListItem()
                } else {
                    Message.error('不能小于最小值')
                }
            }
        } else {
            Message.error('请输入数字类型')
        }
    }

    const blurMed = () => {
        if (selectedRange.value) {
            //格式检测
            if (reg.test(med)) {
                saveAttrListItem()
            } else {
                Message.error('请输入数字类型')
            }
        } else {
            Message.error('请先选择条件')
        }
    }

    const minChange = (e) => {
        const val = Number(e.target.value)

        saveRanges({ min: val, max, med })
    }

    const medChange = (e) => {
        const val = Number(e.target.value)

        saveRanges({ med: val, min, max })
    }

    const maxChange = (e) => {
        const val = Number(e.target.value)

        saveRanges({ max: val, med, min })
    }

    return (
        <>
            <InputGroup compact>
                <Select style={{ width: 100 }} value={selectedRange.value} placeholder="请选择" onChange={rangeChange}>
                    {
                        attrRange.map(item => <Option key={item.value}>{item.name}</Option>)
                    }
                </Select>
                {
                    selectedRange.value === '101' || selectedRange.value === '102' ?
                        <>
                            <Input style={{ width: 100, textAlign: 'center' }} value={ranges.min} onChange={minChange} placeholder="最小值" onBlur={blurMin} />
                            <Input style={{ width: 40, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                            <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} onChange={maxChange} value={ranges.max} placeholder="最大值" onBlur={blurMax} />
                        </>
                        :
                        <Input style={{ width: 240, textAlign: 'center' }} value={ranges.med} onChange={medChange} placeholder="请输入" onBlur={blurMed} />
                }
            </InputGroup>
            <p>
                参考范围：{rangeDatas.min ? `${rangeDatas.min} - ${rangeDatas.max}` : '无'}
            </p>
            <p style={{ color: '#999' }}>*所有数字均不带单位</p>
        </>
    )

}

export default num

