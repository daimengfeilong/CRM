import React from 'react'
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'


class Sex extends React.Component{
    componentDidMount(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('Sex'));
        // 绘制图表
        myChart.setOption({
            color: ['#bce98e','#fb7663'],
            title : {
                text: '性别分布'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: ['男','女']
            },
            series : [
                {
                    name: '性别分布',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'男'},
                        {value:200, name:'女'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    }

    render(){
        return (
            <div id="Sex" style={{width:'100%',height:400}}></div>
        )
    }
}

export default Sex