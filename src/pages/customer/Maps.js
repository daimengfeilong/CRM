import React from 'react'
import { Row, Col, Button } from 'antd'
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'


class Index extends React.Component{
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '客群属性-年龄分步'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }

    render(){
        return (
            <>
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
                <Row>
                    <Col span={12}>
                        <div id="main" style={{width:'100%',height:300}}></div>
                    </Col>
                    <Col span={12}></Col>
                </Row>
            </>
        )
    }
}

export default Index