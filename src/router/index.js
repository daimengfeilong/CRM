import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import Layout from '../components/layout/Index';
import ContentRoute from './contentRoute'

const RouterConfig = ({ history,app }) => {
    return (
        <LocaleProvider locale={zh_CN}>
            <Router history={history}>
                <Switch>
                    <Layout>
                        <ContentRoute app={app} />
                    </Layout>
                </Switch>
            </Router>
        </LocaleProvider>
    );
}

export default RouterConfig;
