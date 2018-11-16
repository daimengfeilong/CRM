import React from 'react'
import { connect } from 'dva'
import { Row, Col, Form, Icon, Input, Button, Message } from "antd"
import { withRouter } from "dva/router"
import Captcha from './captcha'
import './login.less'

import loginBg from '../../assets/login/login_bg.png'
import loginIcon from '../../assets/login/login_icon.png'

const FormItem = Form.Item;
let timer = null

class Login extends React.Component {
    componentDidMount(){
        const { dispatch } = this.props

        dispatch({
            type:'login/save',
            payload:{
                phoneNo: 0,
                captchaSrc: '',
                timeNum: 60,
                loading: false,
                smsLoading: false,
            }
        })

        document.querySelector('body').style.background = '#93defe'
    }

    componentWillUnmount(){
        window.clearInterval(timer)
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
                        Message.error(data.msg)
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

        if(values.loginName && values.password){
            dispatch({
                type:'login/getPhone',
                payload:{
                    params: {
                        ...values
                    }
                }
            })
        }
    }


    sendSmsCode = () => {
        const { dispatch,form,phoneNo } = this.props

        form.validateFields(['verificationCode'],(err, values) => {
            if (!err) {
                dispatch({
                    type:'login/save',
                    payload:{
                        smsLoading:true
                    }
                })
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
                        dispatch({
                            type:'login/save',
                            payload:{
                                smsLoading:false
                            }
                        })
                        dispatch({type:'login/getCaptchaSrc'})
                        Message.error(data.msg)
                    }
                })
            }
        })
    }
    
    Interval = () => {
        const { dispatch,timeNum } = this.props
        //60秒倒计时... 
        let i = timeNum

        timer = window.setInterval(() => {
            dispatch({
                type: 'login/save',
                payload: {
                    timeNum: i--
                }
            })
            if(i < 0){
                dispatch({
                    type: 'login/save',
                    payload: {
                        timeNum: 60,
                        smsLoading:false
                    }
                })
                window.clearInterval(timer)
            }
        }, 1000)
    }

    render() {
        const { form, dispatch, phoneNo, timeNum, captchaSrc, loading, smsLoading } = this.props
        const { getFieldDecorator } = form

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
                                <Input prefix={<Icon type="user" />} onBlur={this.getPhoneNo} placeholder="账号" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入密码' },
                                    { pattern: /^\w{6,16}$/, message: '请输入6-16位密码' }
                                ],
                            })(
                                <Input prefix={<Icon type="lock" />} onBlur={this.getPhoneNo} type="password" placeholder="密码" />
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
                                                timeNum === 60 || timeNum === 0 ?
                                                <Button type="primary" onClick={this.sendSmsCode} loading={smsLoading}>获取验证码</Button>
                                                :
                                                <Button disabled style={{width:'100%'}}>{timeNum}s 后重发</Button>
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