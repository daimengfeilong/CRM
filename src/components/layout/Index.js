import React from 'react';
import { Layout } from 'antd';
import './layout.less'
import Headers from './Header'
import Siders from './Sider'
import Breadcrumbs from './Breadcrumbs'

const { Content } = Layout;

/**
 * 全局布局组件
 * zxl 
 * @param {*} children
 * @returns Index
 * 
 */
const layout = ({ children }) => {

    return (
        <Layout style={{ minHeight: '100vh' }} id='crm-layout'>
            <Siders />
            <Layout>
                <Headers />
                <Content style={{ margin: '15px' }}>
                    <Breadcrumbs />
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )


}
export default layout