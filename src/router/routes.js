import Article from '../pages/article/list';
import ArticleEdit from '../pages/article/edit';
import Tags from '../pages/tags/list';
import TagsEdit from '../pages/tags/edit';

export default [
    {
        title: '文章管理',
        icon: require('../assets/layout/icon_hxgl.png'),
        path: '/article',
        subRoutes:[
            {
                path: '/article',
                title: '文章列表',
                icon: 'profile',
                models: () => [import('../models/article')],
                component: () => import('../pages/article/list'),
            },
            {
                path: '/article/edit',
                title: '添加文章',
                icon: 'read',
                models: () => [import('../models/article')],
                component: () => import('../pages/article/edit'),
            }
        ]
    },
    {
        title: '标签管理',
        icon: require('../assets/layout/icon_bqgl.png'),
        path: '/tags',
        subRoutes:[
            {
                path: '/tags',
                title: '标签列表',
                icon: 'profile',
                models: () => [import('../models/tags')],
                component: () => import('../pages/tags/list'),
            },
            {
                path: '/tags/edit',
                title: '添加标签',
                icon: 'read',
                models: () => [import('../models/tags')],
                component: () => import('../pages/tags/edit'),
            }
        ]
    }
]