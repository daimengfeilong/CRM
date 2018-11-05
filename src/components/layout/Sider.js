import { Layout } from 'antd';
import Menus from './Menu'

const { Sider } = Layout;

/**
 * 左侧组件
 * zxl 
 * @param {*} props
 * @returns Siders
 * 
 */
const Siders = ({collapsed,history}) => {

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <div className="logo">
                {collapsed ? <span>CRM</span> : <span>博雅成信CRM</span>}
            </div>
            <Menus history={history} />
        </Sider>
    )
}

export default Siders