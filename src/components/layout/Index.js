import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import './layout.less'
import Headers from './Header'
import Siders from './Sider'
import Breadcrumbs from './breadcrumb'

const { Content } = Layout;

const Index = ({dispatch,collapsed,children,history}) => {
    const menusProps = {
        collapsed,
        history,
        toggle:() => {
            dispatch({
                type:'layout/toggle'
            })
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }} id='crm-layout'>
            <Siders {...menusProps} />
            <Layout>
                <Headers {...menusProps} />
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
function mapStateToProps(state) {
    return state.layout
}

export default connect(mapStateToProps)(Index);