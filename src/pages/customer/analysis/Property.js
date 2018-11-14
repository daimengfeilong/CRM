import React from 'react'
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

class Property extends React.Component{
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('Property'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '客群属性-年龄分步'
            },
            color: ['#7070ef'],
            tooltip: {},
            xAxis: {
                data: ['19岁及以下', '20-29岁', '30-39岁', '40-49岁', '50岁以上']
            },
            yAxis: {},
            series: [{
                name: '年龄',
                type: 'bar',
                data: [5, 20, 36, 10, 20]
            }]
        });
    }

    render(){
        return (
            <div id="Property" style={{width:'100%',height:400}}></div>
        )
    }
}

export default Property