import React from 'react'
import { Row, Col, Button } from 'antd'
import Property from './Property'
import Sex from './Sex'
import './customer.less'

class Index extends React.Component{
    componentDidMount(){
        document.querySelector('#content').style.cssText = "background:#f0f2f5;padding:0"
    }

    componentWillUnmount(){
        document.querySelector('#content').style.cssText = "background:#fff;padding:24px"
    }

    render(){
        return (
            <div className="customer">
                <div className="cust-box">                
                    <Row style={{lineHeight:"30px"}}>
                        <Col span={3}>2018年现金贷客群画像</Col>
                        <Col span={2}>包含人数 1205986</Col>
                        <Col span={2}><Button type="primary">保存画像</Button></Col>
                    </Row>
                    <h3 style={{margin:"30px 0"}}>选取的用户范围</h3>
                    <Row style={{lineHeight:"30px",borderTop:"1px solid #efefef",borderBottom:"1px solid #efefef",padding:"5px 0"}}>
                        <Col span={1} offset={1}>且</Col>
                        <Col span={2}>办理业务</Col>
                        <Col span={2}>现金贷</Col>
                    </Row>
                    <Row style={{lineHeight:"30px",borderTop:"1px solid #efefef",borderBottom:"1px solid #efefef",padding:"5px 0"}}>
                        <Col span={1} offset={1}>或</Col>
                        <Col span={2}>行为动作</Col>
                        <Col span={2}>登录</Col>
                        <Col span={2}>不限</Col>
                    </Row>
                </div>
                <Row style={{marginTop:15}}>
                    <Col span={12} className="cust-box">
                        <Property></Property>
                    </Col>
                    <Col span={12}>
                        <div className="cust-box" style={{marginLeft:15}}>
                            <Sex></Sex>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Index