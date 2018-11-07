import React from 'react'
import { connect } from 'dva'
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

/**
 * 头部组件
 * zxl 
 * @param {collapsed,toggle,history}
 * @returns Headers
 * 
 */
class Headers extends React.Component {
    render() {
        const { dispatch, collapsed } = this.props

        return (
            <Header className="header" style={{ background: '#fff', padding: 0 }}>
                <div className="button" onClick={() => dispatch({ type: 'layout/toggle' })}>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    />
                </div>
                <div className="rightWarpper">
                    <div className="button">
                        <Icon type="bell" />
                    </div>
                    <Menu mode="horizontal">
                        <SubMenu
                            style={{
                                float: 'right',
                            }}
                            title={<span>
                                <Icon type="user" />
                                guest
                        </span>}
                        >
                            <Menu.Item key="logout">
                                Sign out
                        </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </Header>
        )
    }
}

function mapStateToProps(state) {
    return state.layout
}

export default connect(mapStateToProps)(Headers)