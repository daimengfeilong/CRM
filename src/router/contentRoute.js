import React from 'react';
import { Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import routes from './routes'

/**
 * 根据routes注册内容组件
 * zxl 
 * @param { routes }
 * @returns ContentRoute
 * 
 */
const ContentRoute = ({app}) => {
    const content = []

    const deepRoute  = ({path,subRoutes = [],...dynamics},key) => {
        if(subRoutes.length === 0){
            content.push(<Route
                exact
                key={`${path}-${key}`}
                path={path}
                component={dynamic({ app, ...dynamics })}
            />)
            return false
        }
        subRoutes.map(deepRoute)
    }
    
    routes.map(deepRoute)

    return content
}

export default ContentRoute;
