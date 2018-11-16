import React from 'react'
import { connect } from 'dva'
import { Form, Input, Row, Col, Select, Button, Message, Spin } from 'antd'
import { withRouter } from 'dva/router'
import Property from './property'
import SelectedAttr from './selectedAttrList'
import ModalTree from '../../../components/modalTree/modal'
import { getQueryString } from '../../../utils/utils'
import '../tags.less'

const FormItem = Form.Item;
const Option = Select.Option
const Textarea = Input.TextArea

class Index extends React.PureComponent {
    componentDidMount() {
        const { dispatch } = this.props
        const id = getQueryString('id')

        if (id) {
            dispatch({ type: 'tagsEdit/queryId', payload: { tagId: id } })
        }

        dispatch({
            type: 'tagsEdit/save', payload: {
                selectedTree3: [],
                fourAttr: {},
                attrItem:{}
            }
        })

        dispatch({ type: 'portrait/querySubLevelClassList' })
        dispatch({ type: 'tagsEdit/getAttributeListTree' })

    }


    back = () => {
        const { history } = this.props

        history.push('/tags')
    }

    submitThen = (data) => {
        const { history } = this.props

        if (data.code === '0000') {
            history.push('/tags')
        }
    }

    submit = () => {
        const { dispatch,form,attrItem } = this.props
        const { attrList = [] } = attrItem
        
        form.validateFields((err, values) => {
            if (!err) {
                if (attrList.length) {
                    if (attrItem.tagId) {
                        dispatch({
                            type: 'tagsEdit/edit',
                            payload: {
                                tagId: attrItem.tagId,
                                ...values,
                                attrList
                            }
                        }).then(data => {
                            this.submitThen(data)
                        })
                    } else {
                        dispatch({
                            type: 'tagsEdit/add',
                            payload: {
                                ...values,
                                attrList
                            }
                        }).then(data => {
                            this.submitThen(data)
                        })
                    }
                } else {
                    Message.error('请先设置属性范围')
                }
            }
        })
    }

    difference = (a,b) => {
        //找出两个数组之间的差集
        const difference = a.concat(b).filter(v => !a.includes(v) || !b.includes(v))

        return difference
    }

    modelSubmit = (tree) => {
        const { dispatch, selectedTree3, attrItem } = this.props
        const { attrList = [] } = attrItem
        const a = tree.map(item => item.id)
        const b = selectedTree3.map(item => item.id)
        let newAttrList = []
        let item1 = {}

        const delAttrIds = this.difference(a,b)

        //保存之前设置的范围参数
        if(selectedTree3.length){
            for(let s of selectedTree3){
                for(let t of tree){
                    if(s.id === t.id){
                        t.ranges = s.ranges
                    }
                }
            }
        }

        //清除所选属性范围
        if(delAttrIds.length && attrList.length){
            attrList.map(item => {
                if(!delAttrIds.includes(item.attrId)){
                    newAttrList.push(item)
                }
            })
        }

        if(tree.length){
            item1 = tree[0]
            dispatch({type:'tagsEdit/getAttributeListEnum',payload:{attrId:item1.id}})
        }else{
            dispatch({ type: 'tagsEdit/save', payload: {fourAttr:{}}})
        }

        dispatch({ type: 'tagsEdit/save', payload: {
                attrItem:{
                    ...attrItem,
                    attrList:newAttrList
                },
                selectedTree3:tree,
                selectedTree3Item:item1
            }
        })
        
    }

    render() {
        const { form,
            showModel,
            dispatch,
            attrTree,
            classList,
            selectedTree3,
            selectedTree3Item,
            fourAttr,
            attrRange,
            selectedRange,
            attrItem,
            checkedAttrList,
            loading
        } = this.props

        const { getFieldDecorator } = form

        const checkedKeys = selectedTree3.map(item => item.id)

        const formItemLayout = {
            labelCol: {
                span: 7,
                style: {
                    textAlign: 'left'
                }
            },
            wrapperCol: {
                span: 16
            },
        }

        const modalProps = {
            showModel,
            title: '增加三级属性',
            tree: attrTree,
            checkedKeys,
            onSubmit: (keys) => this.modelSubmit(keys),
            handleCancel: () => dispatch({ type: 'tagsEdit/save', payload: { showModel: false } })

        }

        const propertyProps = {
            dispatch,
            fourAttr,
            selectedTree3Item,
            selectedTree3,
            attrRange,
            selectedRange,
            attrItem,
            checkedAttrList
        }

        const selectedAttrProps = {
            dispatch,
            attrItem,
            checkedAttrList
        }

        return (
            <Spin spinning={loading}>
                <div className="edit-wrap">
                    <p className="tips">标签构成：标签由四级属性值组成。先选定三级字段范围后，在对应的四级属性值里选取要设置的条件来组成标签。</p>
                    <p className="tips">用户打标签规则：用户同时具备设置的所有三级字段条件，即被打上该标签。</p>
                    <Form style={{ marginTop: 30 }}>
                        <Row className="first-row">
                            <Col span={5}>
                                <FormItem label="标签名称" {...formItemLayout}>
                                    {getFieldDecorator('tagName', {
                                        initialValue: attrItem.tagName,
                                        rules: [
                                            { required: true, message: '请输入标签名称' },
                                            { pattern: /^([0-9\u4e00-\u9fa5]{1,8})$/, message: '请输入1-8个中文或者数字字符' }
                                        ],
                                    })(
                                        <Input placeholder="请输入标签名称" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={5}>
                                <FormItem label="类别" {...formItemLayout}>
                                    {getFieldDecorator('classId', {
                                        initialValue: attrItem.classId,
                                        rules: [
                                            { required: true, message: '请选择类别' }
                                        ],
                                    })(
                                        <Select placeholder="请选择">
                                            {
                                                classList.map((item) => (
                                                    <Option key={item.classId}>{item.className}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Property {...propertyProps}></Property>
                        <SelectedAttr {...selectedAttrProps}></SelectedAttr>
                        <FormItem label="标签说明（规则、用途等）">
                            {getFieldDecorator('description', {
                                initialValue: attrItem.description,
                                rules: [
                                    { max: 100, message: '最多输入100汉字' }
                                ],
                            })(
                                <Textarea rows={5} placeholder="请输入标签说明" />
                            )}
                        </FormItem>
                        <Button type="primary" size="large" onClick={this.submit}>保存</Button>
                        <Button style={{ marginLeft: 15 }} size="large" onClick={this.back}>取消</Button>
                    </Form>
                    <ModalTree {...modalProps}></ModalTree>
                </div>
            </Spin>
        )
    }
}

const indexWrap = Form.create()(Index);

function mapStateToProps(state) {
    return {
        ...state.tagsEdit,
        classList: state.portrait.classList,
        loading: state.loading.global
    }
}

export default withRouter(connect(mapStateToProps)(indexWrap))