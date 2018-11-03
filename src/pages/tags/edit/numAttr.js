import React from 'react'
import { Input, Select, Message } from 'antd'

const InputGroup = Input.Group
const Option = Select.Option

const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/

class num extends React.Component {

    addAttrListItem(min, max) {
        const { dispatch, selectedTree3Item, selectedRange } = this.props
        const { name, id } = selectedTree3Item
        let attrName = ''
        let newName = ''

        if (max) {
            attrName = `${selectedRange.value}|${min},${max}`
            newName = `${name} | (${selectedRange.name}) ${min}~${max}`
        } else {
            attrName = `${selectedRange.value}|${min}`
            newName = `${name} | (${selectedRange.name}) ${min}`
        }

        dispatch({
            type: 'tagsEdit/addAttrListItem',
            payload: {
                name: newName,
                alid: `AL${Date.now()}`,
                attrName,
                attrId: id
            }
        })
    }

    render() {
        const { dispatch, fourAttr, attrRange, selectedRange } = this.props
        const { datas = [] } = fourAttr
        const { min } = datas.find(item => item.min)
        const { max } = datas.find(item => item.max)

        const rangeChange = (value) => {
            dispatch({
                type: 'tagsEdit/save',
                payload: {
                    selectedRange: {
                        name: attrRange.find(item => item.value == value).name,
                        value
                    }
                }
            })
        }

        const blurMin = (e) => {
            const min = e.target.value || 0
            const max = this.refs.max.input.value || 0

            //格式检测
            if (reg.test(min)) {
                //min/max比较
                if (max) {
                    if (min >= max) {
                        Message.error('不能大于最大值')
                    } else {
                        this.addAttrListItem(min, max)
                    }
                }
            } else {
                Message.error('请输入数字类型')
            }

        }

        const blurMax = (e) => {
            const max = e.target.value
            const min = this.refs.min.input.value

            //格式检测
            if (reg.test(max)) {
                //min/max比较
                if (min) {
                    if (max <= min) {
                        Message.error('不能小于最小值')
                    } else {
                        this.addAttrListItem(min, max)
                    }
                }
            } else {
                Message.error('请输入数字类型')
            }
        }

        const blurEqual = (e) => {
            const value = e.target.value

            if (selectedRange.value) {
                //格式检测
                if (reg.test(value)) {
                    this.addAttrListItem(value)
                } else {
                    Message.error('请输入数字类型')
                }
            } else {
                Message.error('请先选择条件')
            }
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
                                <Input style={{ width: 100, textAlign: 'center' }} ref="min" placeholder="最小值" onBlur={blurMin} />
                                <Input style={{ width: 40, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                                <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} ref="max" placeholder="最大值" onBlur={blurMax} />
                            </>
                            :
                            <Input style={{ width: 240, textAlign: 'center' }} placeholder="请输入" onBlur={blurEqual} />
                    }
                </InputGroup>
                <p>参考范围{`${min} ~ ${max}`}</p>
                <p style={{ color: '#999' }}>*所有数字均不带单位</p>
            </>
        )
    }
}

export default num

