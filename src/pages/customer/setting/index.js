import React from 'react'
import { Row, Col, Button, Form, Card, Select, Input, DatePicker } from 'antd'
import '../customer.less'

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class Index extends React.Component {
    componentDidMount() {
        document.querySelector('#content').style.cssText = "background:#f0f2f5;padding:0"
    }

    componentWillUnmount() {
        document.querySelector('#content').style.cssText = "background:#fff;padding:24px"
    }

    handleSubmit = () => {

    }

    render() {
        const { form } = this.props
        const { getFieldDecorator } = form

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        }
        
        const inlineFormItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }

        const dateFormItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        }

        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '不限'
        })(
            <Select style={{ width: 70 }}>
                <Option value="不限">不限</Option>
                <Option value="大于">大于</Option>
                <Option value="小于">小于</Option>
                <Option value="等于">等于</Option>
            </Select>
        );

        return (
            <div className="customer">
                <div className="cust-box">
                    <Row className="head">
                        <Col span={12}>
                            <span>设置客群范围</span>
                            <Button icon="plus" type="primary" style={{ marginLeft: 10 }}>添加</Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" style={{ float: "right" }}>开始分析</Button>
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: 20 }} hideRequiredMark>
                        <Row>
                            <Col span={7}>
                                <Card
                                    title="条件一"
                                    extra={<Button type="danger">删除</Button>}
                                >
                                    <FormItem
                                        label="办理业务"
                                        colon={false}
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('select', {
                                            rules: [
                                                { required: true, message: 'Please select your country!' },
                                            ],
                                        })(
                                            <Select placeholder="请选择">
                                                <Option value="china">China</Option>
                                                <Option value="usa">U.S.A</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="用户来源"
                                        colon={false}
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('select', {
                                            rules: [
                                                { required: true, message: 'Please select your country!' },
                                            ],
                                        })(
                                            <Select placeholder="请选择">
                                                <Option value="china">China</Option>
                                                <Option value="usa">U.S.A</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        colon={false}
                                    >
                                        <Col span={12}>
                                            <FormItem
                                                label="行为动作"
                                                colon={false}
                                                {...inlineFormItemLayout}
                                            >
                                                {getFieldDecorator('select', {
                                                    rules: [
                                                        { required: true, message: 'Please select your country!' },
                                                    ],
                                                })(
                                                    <Select placeholder="请选择">
                                                        <Option value="china">China</Option>
                                                        <Option value="usa">U.S.A</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={12}>
                                            <FormItem
                                                label="次数"
                                                colon={false}
                                                {...inlineFormItemLayout}
                                            >
                                                {getFieldDecorator('select', {
                                                    rules: [
                                                        { required: true, message: 'Please select your country!' },
                                                    ],
                                                })(
                                                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                    <FormItem
                                        label="时间范围"
                                        colon={false}
                                        {...dateFormItemLayout}
                                        style={{marginTop:30}}
                                    >
                                        {getFieldDecorator('range-picker', rangeConfig)(
                                            <RangePicker />
                                        )}
                                    </FormItem>
                                </Card>
                            </Col>
                            <Col span={7}></Col>
                            <Col span={7}></Col>
                        </Row>
                    </Form>
                </div>
                <div className="cust-box" style={{marginTop:20}}>
                    <h3>已保存画像</h3>
                    <Row>
                        <Col span={2}>
                            <a href="#">2018年现金贷人群</a>
                        </Col>
                        <Col span={2}>
                            <a href="#">2018年现金贷人群</a>
                        </Col>
                        <Col span={2}>
                            <a href="#">2018年现金贷人群</a>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

const IndexForm = Form.create()(Index)

export default IndexForm