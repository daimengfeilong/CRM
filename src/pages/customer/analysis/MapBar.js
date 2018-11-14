import React from 'react'
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

class MapBar extends React.Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('MapBar'));
        // 绘制图表
        myChart.setOption({
            color: ['#7070ef'],
            tooltip: {},
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#f8f8f8',// 左边线的颜色
                    }
                },
                data: ['北京', '上海', '广东', '云南', '山西']
            },
            grid: {
                show: true,
                borderColor: '#f8f8f8'
            },
            yAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#f8f8f8',// 左边线的颜色
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'f8f8f8'
                    }
                }
            },
            series: [{
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#f4f5f9'
                    }
                },
                silent: true,
                barWidth: 10,
                barGap: '-100%',
                data: [60, 60, 60, 60, 60]
            }, {
                name: '年龄',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius:10,
                    }
                },
                data: [5, 20, 36, 10, 20]
            }]
        });
    }

    render() {
        return (
            <div id="MapBar" style={{ width: '100%', height: 400, marginTop: 50 }}></div>
        )
    }
}

export default MapBar