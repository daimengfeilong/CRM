import React from 'react'
import { connect } from 'dva'
import { Row, Col, Form, Icon, Input, Button, Message } from "antd"
import { withRouter } from "dva/router"
import Captcha from './captcha'
import './login.less'

import loginBg from '../../assets/login/login_bg.png'
import loginIcon from '../../assets/login/login_icon.png'

const FormItem = Form.Item;

class Login extends React.Component {
    componentDidMount(){
        document.querySelector('body').style.background = '#93defe'
    }

    componentWillUnmount(){
        document.querySelector('body').style.background = '#fff'
    }

    handleSubmit = (e) => {
        const { dispatch,form,phoneNo,history } = this.props

        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err && phoneNo !== 0) {
                dispatch({
                    type:'login/save',
                    payload:{
                        loading:true
                    }
                })
                dispatch({
                    type:'login/userLogin',
                    payload:{
                        params:{
                            ...values
                        }
                    }
                }).then(data => {
                    if(data.code === '0000'){
                        localStorage.setItem('userName',data.result.user.userName)
                        history.push('/userManage')
                    }else{
                        dispatch({
                            type:'login/save',
                            payload:{
                                loading:false
                            }
                        })                            
                    }
                })
            }
        })
    }

    getPhoneNo = () =>{
        const { dispatch,form } = this.props
        const { getFieldsValue } = form

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

    onBlurName = () => {
        const { dispatch,form } = this.props

        form.validateFields((err, values) => {
            if (!err) {
                this.getPhoneNo()
            }
        })            
    }

    onBlurPwd = () => {
        const { dispatch,form } = this.props

        form.validateFields(['loginName'],(err, values) => {
            if (!err) {
                this.getPhoneNo()
            }
        })
    }

    sendSmsCode = () => {
        const { dispatch,form,phoneNo } = this.props

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
                        this.Interval()
                    }else{
                        dispatch({type:'login/getCaptchaSrc'})
                    }
                })
            }
        })
    }
    
    Interval = () => {
        const { dispatch,timeNumSms } = this.props
        //60秒倒计时... 
        let i = timeNumSms

        const timer = window.setInterval(() => {
            dispatch({
                type: 'login/save',
                payload: {
                    timeNumSms: i--
                }
            })
            if(i < 0){
                dispatch({
                    type: 'login/save',
                    payload: {
                        timeNumSms: 60
                    }
                })
                window.clearInterval(timer)
            }
        }, 1000)
    }

    render() {
        const { form, dispatch, phoneNo, timeNumSms, history, captchaSrc, loading } = this.props
        const { getFieldDecorator, getFieldsValue } = form

        const captchaProps = {
            captchaSrc,
            dispatch
        }
      

        return (
            <Row className="login-container">
                <Col span={8} offset={6}>
                    <div className="login-bg">
                        <img src={loginBg} alt="" />
                    </div>
                </Col>
                <Col span={5}>
                    <Form onSubmit={this.handleSubmit} className="login-box">
                        <h3 className="title">CRM系统登录</h3>
                        <FormItem>
                            {getFieldDecorator('loginName', {
                                rules: [
                                    { required: true, message: '请输入帐号' },
                                    { pattern: /^\w{6,16}$/, message: '请输入6-16位账号' }
                                ],
                            })(
                                <Input prefix={<Icon type="user" />} onBlur={this.onBlurName} placeholder="账号" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入密码' },
                                    { pattern: /^\w{6,16}$/, message: '请输入6-16位密码' }
                                ],
                            })(
                                <Input prefix={<Icon type="lock" />} onBlur={this.onBlurPwd} type="password" placeholder="密码" />
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
                                                <Button type="primary" onClick={this.sendSmsCode}>获取验证码</Button>
                                                :
                                                <Button disabled style={{width:'100%'}}>{timeNumSms}s 后重发</Button>
                                            }
                                        </Col>
                                    </Row>
                                </FormItem>
                            </>
                        }
                        <FormItem>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>登录</Button>
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