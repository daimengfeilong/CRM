import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button,Col,Row,Select } from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input
const Option = Select.Option;

const Edit = ({form,dispatch,history,tags,data}) => {

    const { getFieldDecorator } = form;

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                values._id = data._id ? data._id : ''
                
                dispatch({
                    type:'article/add',
                    payload:values
                }).then(res => {
                    if(res.data.code){
                        history.push('/article')
                    }
                })
            }
        });
    }

    return (
        <Row>
            <Col span={10}>        
                <Form onSubmit={handleSubmit}>
                    <FormItem label="标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题' }],
                            initialValue:data.title
                        })(
                            <Input placeholder="标题" />
                        )}
                    </FormItem>
                    <FormItem label="封面">
                        {getFieldDecorator('cover', {
                            rules: [{ required: true, message: '请输入封面地址' }],
                            initialValue:data.cover
                        })(
                            <Input placeholder="封面地址" />
                        )}
                    </FormItem>
                    <FormItem label="标签">
                        {getFieldDecorator('tags', {
                            rules: [{ required: true, message: '请选择标签' }],
                            initialValue:data.tags
                        })(
                            <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="选择标签"
                          >
                                {tags && tags.map(item => <Option key={item.code}>{item.name}</Option>)}
                          </Select>,
                        )}
                    </FormItem>
                    <FormItem label="摘要">
                        {getFieldDecorator('abstract', {
                            rules: [{ required: true, message: '请输入标题' }],
                            initialValue:data.abstract
                        })(
                            <TextArea placeholder="摘要" rows={2} />
                        )}
                    </FormItem>
                    <FormItem label="内容">
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入内容' }],
                            initialValue:data.content
                        })(
                            <TextArea placeholder="内容" rows={10} />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    );
    
}

function mapStateToProps(state) {
    return state.article
}

const editFrom = Form.create()(Edit);

export default connect(mapStateToProps)(editFrom);