import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import { withRouter } from 'dva/router'
import Menus from './Menu'

const { Sider } = Layout;

/**
 * 左侧组件
 * zxl 
 * @param {*} props
 * @returns Siders
 * 
 */
class Siders extends React.Component {
    render() {
        const { collapsed, history } = this.props

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className="logo">
                    {collapsed ? <span>CRM</span> : <span>博雅成信CRM</span>}
                </div>
                <Menus history={history} />
            </Sider>
        )
    }
}

function mapStateToProps(state) {
    return state.layout
}

export default withRouter(connect(mapStateToProps)(Siders))