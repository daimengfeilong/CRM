import routes from '../../router/routes'
import { Link } from 'react-router-dom'

/**
 * 面包屑
 * zxl 
 * @param {history}
 * @returns Breadcrumbs
 * 
 */
const Breadcrumbs = ({ history }) => {
    const { pathname } = history.location
    
    let content = []

    //递归面包屑
    const deepBreadcrumbs = (breads) => {
        breads.map((item, key) => {
            if (pathname.includes(item.path)) {

                content.push(<Link to={item.path} key={`${item.title}-${key}`}>{item.title}</Link>)

                if (Array.isArray(item.subRoutes)) {
                    deepBreadcrumbs(item.subRoutes)
                }
                
            }
        })
    }

    deepBreadcrumbs(routes)

    return (
        <div style={{ marginBottom: '15px' }} id="breadcrumbs">
            { content }
        </div>
    )
}

export default Breadcrumbs