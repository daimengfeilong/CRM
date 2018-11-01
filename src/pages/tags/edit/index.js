import React from 'react'
import { connect } from 'dva'
import { Form, Input, Row, Col, Select, Button,Message } from 'antd'
import { withRouter } from 'dva/router'
import Property from './property'
import '../tags.less'

const FormItem = Form.Item;
const Option = Select.Option
const Textarea = Input.TextArea

class Index extends React.PureComponent {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch({type:'portrait/querySubLevelClassList'})
        dispatch({type:'tagsEdit/getAttributeListTree'})
        dispatch({type:'tagsEdit/getAttributeListEnum',payload:{attrId:"24173P"}})
    }

    formItemLayout = {
        labelCol: {
            span: 6,
            style:{
                textAlign:'left'
            }
        },
        wrapperCol: {
            span: 17
        },
    }


    render() {
        const { form,showModel,dispatch,attrTree,classList,history } = this.props
        const { getFieldDecorator } = form

        const propertyProps = {
            showModel,
            dispatch,
            attrTree
        }

        const submit = () => {
            form.validateFields((err, values) => {
                if(!err){
                    const attr = values.attr.split(',')
                    const attrList = []
                    
                    attr.map((item,index) => {
                        attrList.push({
                            attrId:index,
                            attrName:item
                        })
                    })
                    
                    dispatch({
                        type:'tagsEdit/add',
                        payload:{
                            ...values,
                            attrList
                        }
                    }).then(data => {
                        if(data.code == '0000'){
                            history.push('/tags')
                        }else{
                            Message.error(data.msg)
                        }
                    })
                }
            })
        }

        return (
            <div className="edit-wrap">
                <p className="tips">标签构成：标签由四级属性值组成。先选定三级字段范围后，在对应的四级属性值里选取要设置的条件来组成标签。</p>
                <p className="tips">用户打标签规则：用户同时具备设置的所有三级字段条件，即被打上该标签。</p>
                <Form style={{ marginTop: 30 }}>
                    <Row className="first-row">
                        <Col span={5}>
                            <FormItem label="标签名称" {...this.formItemLayout}>
                                {getFieldDecorator('tagName', {
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
                            <FormItem label="类别" {...this.formItemLayout}>
                                {getFieldDecorator('classId', {
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
                    <FormItem label="已设置的属性范围">
                        {getFieldDecorator('attr', {
                            rules: [
                                { required: true, message: '请选择属性范围' }
                            ],
                        })(
                            <Textarea rows={5} placeholder="请选择属性范围" />
                        )}
                    </FormItem>
                    <FormItem label="标签说明（规则、用途等）">
                        {getFieldDecorator('description', {
                            rules: [
                                { max: 100, message: '最多输入100汉字' }
                            ],
                        })(
                            <Textarea rows={5} placeholder="请输入标签说明" />
                        )}
                    </FormItem>
                    <Button type="primary" size="large" onClick={submit}>保存</Button>
                    <Button style={{ marginLeft: 15 }} size="large">取消</Button>
                </Form>
            </div>
        )
    }
}

const indexWrap = Form.create()(Index);

function mapStateToProps(state){
    return {
        ...state.tagsEdit,
        classList:state.portrait.classList
    }
}

export default withRouter(connect(mapStateToProps)(indexWrap))