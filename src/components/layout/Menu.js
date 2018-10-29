import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import routes from '../../router/routes'

const SubMenu = Menu.SubMenu;

/**
 * 左侧菜单组件
 * 通过routes show控制是否显示
 * zxl 
 * @param {*} history
 * @returns Menus
 * 
 */
const Menus = ({ history }) => {
    const { pathname } = history.location

    const defaultSelectedKeys = [pathname]
    const defaultOpenKeys = [`/${pathname.split('/')[1]}`]

    //设置菜单图标
    const RenderIcon = ({ icon,title }) => {
        return <Icon component={() => <img src={icon} alt={title} style={{ width: 18 }} />} icon={icon} style={{ verticalAlign: 'middle' }} />
    }

    //递归菜单
    const deepMenus = (menusTree) => {
        return menusTree.map((item) => {
            if (Array.isArray(item.subRoutes)) {
                return (
                    <SubMenu
                        key={item.path}
                        title={<span><RenderIcon icon={item.icon} title={item.title} /><span style={{ verticalAlign: 'middle' }}>{item.title}</span></span>}
                    >
                        {deepMenus(item.subRoutes)}
                    </SubMenu>
                )
            }
            return (
                item.show && <Menu.Item key={item.path}>
                    <Link to={item.path}>
                        {item.component === undefined && <RenderIcon icon={item.icon} />}
                        <span style={{ paddingLeft: 10 }}>{item.title}</span>
                    </Link>
                </Menu.Item>
            )
            
        })
    }
    
    return (
        <Menu defaultSelectedKeys={defaultSelectedKeys} defaultOpenKeys={defaultOpenKeys} mode={"inline"}>
            {
                deepMenus(routes)
            }
        </Menu>
    )
}

export default Menus