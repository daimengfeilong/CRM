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
const Menus = ({history}) => {
    const {pathname} = history.location

    const defaultSelectedKeys = [pathname]
    const defaultOpenKeys = [`/${pathname.split('/')[1]}`]


    const RenderIcon = ({icon}) =>{
        return <Icon component={() => <img src={icon} style={{width:18}} />} icon={icon} style={{verticalAlign:'middle'}} />
    }
    
    return (
        <Menu defaultSelectedKeys={defaultSelectedKeys} defaultOpenKeys={defaultOpenKeys} mode={"inline"}>
            {
                routes.map((item) => (
                    item.subRoutes.length ?
                    <SubMenu
                        key={item.path}
                        title={<span><RenderIcon icon={item.icon} /><span style={{verticalAlign:'middle'}}>{item.title}</span></span>}
                    >
                    {
                        item.subRoutes.map(({path,title,show}) => (
                            show && 
                            <Menu.Item key={path}>
                                <Link to={path}>
                                    <span style={{paddingLeft:10}}>{title}</span>
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