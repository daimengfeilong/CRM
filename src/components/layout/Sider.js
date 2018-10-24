import { connect } from 'dva';
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
                {collapsed ? <span>CRM</span> : <span>博雅成信CRM</span>}
            </div>
            <Menus history={history} />
        </Sider>
    )
}

function mapStateToProps(state) {
    return {
        ...state.layout
    }
}
export default connect(mapStateToProps)(Siders);