import React from 'react'
import { Input, Select, Message } from 'antd'

const InputGroup = Input.Group
const Option = Select.Option

const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/

class num extends React.Component {

    addAttrListItem(min, max) {
        const { dispatch, selectedTree3, selectedTree3Item, selectedRange } = this.props
        const { name, id } = selectedTree3Item
        let attrVal = ''
        let nickName = ''
        let ranges = { ...selectedRange, min, max }

        if (max) {
            attrVal = `${selectedRange.value}|${min},${max}`
            nickName = `${name} | (${selectedRange.name}) ${min}-${max}`
        } else {
            attrVal = `${selectedRange.value}|${min}`
            nickName = `${name} | (${selectedRange.name}) ${min}`
        }

        console.log(selectedTree3Item);

        //保存范围三级属性
        selectedTree3.map(item => {
            if(item.id === id){
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
                attrName:selectedTree3Item.name,
                attrId: id,
                alid: `AL${Date.now()}`,
            }
        })
    }

    rangeChange = (value) => {
        const { dispatch, attrRange } = this.props

        dispatch({
            type: 'tagsEdit/save',
            payload: {
                selectedRange: {
                    name: attrRange.find(item => item.value === value).name,
                    value
                }
            }
        })
    }

    blurMin = (e) => {
        const min = Number(e.target.value)
        const max = Number(this.refs.max.input.value)

        //格式检测
        if (reg.test(min)) {
            //min/max比较
            if (max) {
                if (min < max) {
                    this.addAttrListItem(min, max)
                } else {
                    Message.error('不能大于最大值')
                }
            }
        } else {
            Message.error('请输入数字类型')
        }

    }

    blurMax = (e) => {
        const max = Number(e.target.value)
        const min = Number(this.refs.min.input.value)

        //格式检测
        if (reg.test(max)) {
            //min/max比较
            if (min) {
                if (max > min) {
                    this.addAttrListItem(min, max)
                } else {
                    Message.error('不能小于最小值')
                }
            }
        } else {
            Message.error('请输入数字类型')
        }
    }

    blurEqual = (e) => {
        const { selectedRange } = this.props
        const value = Number(e.target.value)

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

    render() {
        const { fourAttr, attrRange, selectedRange, selectedTree3Item } = this.props
        const { ranges = {} } = selectedTree3Item
        const { datas = [] } = fourAttr
        
        if(datas.length && datas[0]){
            var { min } = datas.find(item => item.min)
            var { max } = datas.find(item => item.max)
        }

        return (
            <>
                <InputGroup compact>
                    <Select style={{ width: 100 }} value={selectedRange.value} placeholder="请选择" onChange={this.rangeChange}>
                        {
                            attrRange.map(item => <Option key={item.value}>{item.name}</Option>)
                        }
                    </Select>
                    {
                        selectedRange.value === '101' || selectedRange.value === '102' ?
                            <>
                                <Input style={{ width: 100, textAlign: 'center' }} defaultValue={ranges.min} ref="min" placeholder="最小值" onBlur={this.blurMin} />
                                <Input style={{ width: 40, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                                <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} defaultValue={ranges.max} ref="max" placeholder="最大值" onBlur={this.blurMax} />
                            </>
                            :
                            <Input style={{ width: 240, textAlign: 'center' }} defaultValue={ranges.min} ref="med" placeholder="请输入" onBlur={this.blurEqual} />
                    }
                </InputGroup>
                <p>
                    参考范围：{min ? `${min} - ${max}` : '无'}
                </p>
                <p style={{ color: '#999' }}>*所有数字均不带单位</p>
            </>
        )
    }
}

export default num

