import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import Layout from '../components/layout/Index';
import ContentRoute from './contentRoute'

const RouterConfig = ({ history,app }) => {

    const Login = dynamic({
        app,
        //models: () => [import('../models/login')],
        component: () => import('../pages/login/index')
    });

    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
                <Layout>
                    <ContentRoute app={app} />
                </Layout>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
