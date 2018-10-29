export default [
    {
        title: '标签管理',
        icon: require('../assets/layout/icon_bqgl.png'),
        path: '/tags',
        subRoutes: [
            {
                path: '/tags',
                title: '标签列表',
                show: true,
                component: () => import('../pages/tags/list'),
            }
        ]
    },
    {
        title: '分类管理',
        icon: require('../assets/layout/icon_fngl.png'),
        path: '/classify',
        subRoutes: [
            {
                path: '/classify',
                title: '分类列表',
                show: true,
                component: () => import('../pages/classify/list'),
            }
        ]
    },
    {
        title: '画像管理',
        icon: require('../assets/layout/icon_hxgl.png'),
        path: '/portrait',
        subRoutes: [
            {
                path: '/portrait',
                title: '画像列表',
                show: true,
                component: () => import('../pages/portrait/list'),
            }
        ]
    },
    {
        title: '属性管理',
        icon: require('../assets/layout/icon_hxgl.png'),
        path: '/attribute',
        subRoutes: [
            {
                path: '/attribute',
                title: '属性列表',
                show: true,
                component: () => import('../pages/attribute/list'),
            }
        ]
    }
]
