import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

/**
 * 头部组件
 * zxl 
 * @param {collapsed,dispatch,history}
 * @returns Headers
 * 
 */
const Headers = ({collapsed,dispatch,history}) => {
    const loginOut = () => {
        // localStorage.removeItem('token')
        // history.push('/login')
    }

    const toggle = () => {
        dispatch({
            type:'layout/toggle'
        })
    }
    return (
        <Header className="header" style={{ background: '#fff', padding: 0 }}>
            <div className="button" onClick={toggle}>
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                />
            </div>
            <div className="rightWarpper">
                <div className="button">
                    <Icon type="alert" theme="outlined" />
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
                        <Menu.Item key="logout" onClick={loginOut}>
                            Sign out
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        </Header>
    )
}

function mapStateToProps(state) {
    return {
        ...state.layout
    }
}
export default connect(mapStateToProps)(Headers);