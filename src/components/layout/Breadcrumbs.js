import { Breadcrumb } from 'antd';
import routes from '../../router/routes'
import { Link } from 'react-router-dom'

/**
 * 面包屑
 * zxl 
 * @param {history}
 * @returns Breadcrumbs
 * 
 */
const Breadcrumbs = ({history}) => {
    const { pathname } = history.location
    
    return (
        <div style={{ marginBottom: '15px' }} id="breadcrumbs">
            {
                routes.map(parent => {
                    if(parent.subRoutes.length){
                        return parent.subRoutes.map((child,key) => {
                            if(pathname == child.path){
                                {
                                    return (
                                        <div key={key}>
                                            <a>{parent.title}</a>
                                            <span style={{margin:'0 10px'}}>></span>
                                            <Link to={child.path}>{child.title}</Link>
                                        </div>                                        
                                    )
                                }
                                
                            }
                        })
                    }
                })
            }
        </div>
    )
}
export default Breadcrumbs