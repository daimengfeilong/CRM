import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import Layout from '../components/layout/Index';
import ContentRoute from './contentRoute'

const RouterConfig = ({ history,app }) => {
    return (
        <Router history={history}>
            <Switch>
                <Layout>
                    <ContentRoute app={app} />
                </Layout>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
