import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox,Textarea,Col,Row,message } from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input

const Edit = ({form,dispatch,history,data}) => {

    const { getFieldDecorator } = form;

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                values._id = data._id ? data._id : ''
                
                dispatch({
                    type:'tags/add',
                    payload:values
                }).then(res => {
                    if(res.data.code){
                        history.push('/tags')
                    }else{
                        message.error(res.data.msg);
                    }
                })
            }
        });
    }

    return (
        <Row>
            <Col span={10}>        
                <Form onSubmit={handleSubmit}>
                    <FormItem label="名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入标签名称' }],
                            initialValue:data.name
                        })(
                            <Input placeholder="标签名称" />
                        )}
                    </FormItem>
                    <FormItem label="LOGO">
                        {getFieldDecorator('logo', {
                            rules: [{ required: true, message: '请输入LOGO地址' }],
                            initialValue:data.logo
                        })(
                            <Input placeholder="LOGO" />
                        )}
                    </FormItem>
                    <FormItem label="码值">
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入码值' }],
                            initialValue:data.code
                        })(
                            <Input placeholder="码值(20180001 - n)" />
                        )}
                    </FormItem>
                    <FormItem label="颜色">
                        {getFieldDecorator('color', {
                            rules: [{ required: true, message: '请输入颜色' }],
                            initialValue:data.color
                        })(
                            <Input placeholder="十六进制" />
                        )}
                    </FormItem>
                    <FormItem label="描述">
                        {getFieldDecorator('describe', {
                            rules: [{ required: true, message: '请输入描述' }],
                            initialValue:data.describe
                        })(
                            <TextArea placeholder="描述" rows={2} />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    );
    
}

function mapStateToProps(state) {
    return state.tags
}

const editFrom = Form.create()(Edit);

export default connect(mapStateToProps)(editFrom);