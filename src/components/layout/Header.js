import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

const Headers = ({collapsed,toggle,history}) => {
    const loginOut = () => {
        localStorage.removeItem('token')
        history.push('/login')
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

export default Headers