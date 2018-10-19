import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Textarea, Col, Row, message } from 'antd';
import './login.less'

const FormItem = Form.Item;

const Edit = ({ form, dispatch, history }) => {

    const { getFieldDecorator } = form;

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type:'login/login',
                    payload:values
                }).then(res => {
                    const {msg,code,data} = res.data
                    
                    if(code){
                        localStorage.setItem('token',data.token)
                        history.push('/article')
                    }else{
                        message.error(msg);
                    }
                })
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit} className="loginForm">
            <FormItem>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </FormItem>
        </Form>
    );

}

function mapStateToProps(state) {
    return state.login
}

const editFrom = Form.create()(Edit);

export default connect(mapStateToProps)(editFrom);