import React from 'react'
import { connect } from 'dva'
import { Row, Col, Form, Icon, Input, Button, Message } from "antd"
import { withRouter } from "dva/router"
import Captcha from './captcha'
import './login.less'

import loginBg from '../../assets/login/login_bg.png'
import loginIcon from '../../assets/login/login_icon.png'

const FormItem = Form.Item;
let smsTimer = null;

class Login extends React.Component {
    render() {
        const { form, dispatch, phoneNo, timeNumSms, history, captchaSrc } = this.props
        const { getFieldDecorator, getFieldsValue } = form


        const captchaProps = {
            captchaSrc,
            dispatch
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err && phoneNo !== 0) {
                    dispatch({
                        type:'login/userLogin',
                        payload:{
                            params:{
                                ...values
                            }
                        }
                    }).then(data => {
                        if(data.code === '0000'){
                            history.push('/userManage')
                        }
                    })
                }
            })
        }

        const getPhoneNo = () =>{
            const values = getFieldsValue()

            dispatch({
                type:'login/getPhone',
                payload:{
                    params: {
                        ...values
                    }
                }
            })
        }

        const onBlurName = () => {
            form.validateFields((err, values) => {
                if (!err) {
                    getPhoneNo()
                }
            })            
        }

        const onBlurPwd = () => {
            form.validateFields(['loginName'],(err, values) => {
                if (!err) {
                    getPhoneNo()
                }
            })
        }

        const sendSmsCode = () => {

            form.validateFields(['verificationCode'],(err, values) => {
                if (!err) {

                    dispatch({
                        type:'login/sendSms',
                        payload:{
                            params:{
                                ...values,
                                phone:phoneNo,
                                sourceOsType:'30500005'
                            }
                        }
                    }).then(data => {
                        if(data.code === '0000'){
                            dispatch({type:'login/Interval'})
                        }else{
                            dispatch({type:'login/getCaptchaSrc'})
                            Message.error(data.msg)
                        }
                    })
                }
            })
        }
        
        return (
            <Row className="login-container">
                <Col span={8} offset={6}>
                    <div className="login-bg">
                        <img src={loginBg} alt="" />
                    </div>
                </Col>
                <Col span={5}>
                    <Form onSubmit={handleSubmit} className="login-box">
                        <h3 className="title">CRM系统登录</h3>
                        <FormItem>
                            {getFieldDecorator('loginName', {
                                rules: [
                                    { required: true, message: '请输入帐号' },
                                    { pattern: /^\w{6,16}$/, message: '请输入6-16位账号' }
                                ],
                            })(
                                <Input prefix={<Icon type="user" />} onBlur={onBlurName} placeholder="账号" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入密码' },
                                    { pattern: /^\w{6,16}$/, message: '请输入6-16位密码' }
                                ],
                            })(
                                <Input prefix={<Icon type="lock" />} onBlur={onBlurPwd} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        {
                            phoneNo !== 0 && captchaSrc &&
                            <>                            
                                <FormItem>
                                    <Row>
                                        <Col span={14}>
                                            {getFieldDecorator('verificationCode', {
                                                rules: [
                                                    { required: true, message: '请输入验证码' },
                                                    { type: 'string',min: 4, max: 4, message: '请输入4位图形验证码' }
                                                ],
                                            })(
                                                <Input placeholder="验证码" />
                                            )}
                                        </Col>
                                        <Col span={9} offset={1}>
                                            <Captcha {...captchaProps}></Captcha>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    <Row>
                                        <Col span={14}>
                                            {getFieldDecorator('smsCode', {
                                                rules: [
                                                    { required: true, message: '请输入短信验证码' },
                                                    { type: 'string',min: 6, max: 6, message: '请输入短信验证码' }
                                                ],
                                            })(
                                                <Input placeholder="短信验证码" />
                                            )}
                                        </Col>
                                        <Col span={9} offset={1}>
                                            {
                                                timeNumSms === 60 || timeNumSms === 0 ?
                                                <Button type="primary" onClick={sendSmsCode}>获取验证码</Button>
                                                :
                                                <Button disabled style={{width:'100%'}}>{timeNumSms}s 后重发</Button>
                                            }
                                        </Col>
                                    </Row>
                                </FormItem>
                            </>
                        }
                        <FormItem>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                登录
                            </Button>
                        </FormItem>
                        <div className="login-icon">
                            <img src={loginIcon} />
                        </div>
                    </Form>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state){
    return state.login
}

const LoginForm = Form.create()(Login);

export default withRouter(connect(mapStateToProps)(LoginForm))