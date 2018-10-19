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
                <img alt="logo" src={require('../../assets/logo.svg')} />
                {collapsed ? '' : <span>ANTD ADMIN</span>}
            </div>
            <Menus history={history} />
        </Sider>
    )
}

export default Siders