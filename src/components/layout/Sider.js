import { Layout } from 'antd';
import Menus from './Menu'

const { Sider } = Layout;

const Siders = ({collapsed,history}) => {

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <div className="logo">
                {collapsed ? '' : <span>博雅成信CRM</span>}
            </div>
            <Menus history={history} />
        </Sider>
    )
}

export default Siders