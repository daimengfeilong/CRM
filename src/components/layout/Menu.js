import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import routes from '../../router/routes'

const SubMenu = Menu.SubMenu;

const Menus = ({collapsed,history}) => {
    const {pathname} = history.location

    const defaultSelectedKeys = [pathname]
    const defaultOpenKeys = [`/${pathname.split('/')[1]}`]
    
    return (
        <Menu defaultSelectedKeys={defaultSelectedKeys} defaultOpenKeys={defaultOpenKeys} mode={"inline"}>
            {
                routes.map((item) => (
                    item.subRoutes.length ?
                    <SubMenu
                        key={item.path}
                        title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}
                    >
                    {
                        item.subRoutes.map(({path,title}) => (
                            <Menu.Item key={path}>
                                <Link to={path}>
                                    <span>{title}</span>
                                </Link>
                            </Menu.Item>
                        ))
                    }
                    </SubMenu>
                    :
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>                
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}

export default Menus