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
const layout = ({children,history}) => {
    return (
        <Layout style={{ minHeight: '100vh' }} id='crm-layout'>
            <Siders history={history} />
            <Layout>
                <Headers history={history} />
                <Content style={{ margin: '15px' }}>
                    <Breadcrumbs history={history} />
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
    
}
export default withRouter(layout)