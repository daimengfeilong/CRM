import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Layout from '../components/layout/Index';
import ContentRoute from './contentRoute'

const RouterConfig = ({ history,app }) => {

    const Login = dynamic({
        app,
        component: () => import('../pages/login/index')
    });

    return (
        <LocaleProvider locale={zh_CN}>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/login" exact component={Login} />
                    <Layout>
                        <ContentRoute app={app} />
                    </Layout>
                </Switch>
            </Router>
        </LocaleProvider>
    );
}

export default RouterConfig;
