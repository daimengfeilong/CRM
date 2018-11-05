import React from 'react';
import { withRouter } from 'dva/router'
import { Layout } from 'antd';
import './layout.less'
import Headers from './Header'
import Siders from './Sider'
import Breadcrumbs from './Breadcrumbs'

const { Content } = Layout;

/**
 * 全局布局组件
 * zxl 
 * @param {*} children,history
 * @returns Index
 * 
 */
class layout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collapsed: false
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        const { children, history } = this.props
        const { collapsed } = this.state

        const layoutProps = {
            collapsed,
            toggle:this.toggle,
            history
        }

        return (
            <Layout style={{ minHeight: '100vh' }} id='crm-layout'>
                <Siders {...layoutProps} />
                <Layout>
                    <Headers {...layoutProps} />
                    <Content style={{ margin: '15px' }}>
                        <Breadcrumbs {...layoutProps} />
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );

    }
}
export default withRouter(layout)