export default [
     {
         title: '客户管理',
         icon: require('../assets/layout/icon_kfgl.png'),
         path: '/userManage',
         subRoutes: [
             {
                 path: '/userManage',
                 title: '用户列表',
                 show: true,
                 icon: 'profile',
                 component: () => import('../pages/userManage/userList')
             },
            {
              path: '/userManage/userDetail',
              title: '用户详情',
              show: false,
              icon: 'profile',
              component: () => import('../pages/userManage/detail/userDetail')
            }
         ]
     },
    {
        title: '标签管理',
        icon: require('../assets/layout/icon_bqgl.png'),
        path: '/tags',
        subRoutes: [
            {
                path: '/tags',
                title: '标签列表',
                show: true,
                component: () => import('../pages/tags/list/index'),
            },
            {
                path: '/tags/edit',
                title: '新增标签',
                show: true,
                component: () => import('../pages/tags/edit/index'),
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
                component: () => import('../pages/classify/index'),
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
        icon: require('../assets/layout/icon_sxsz.png'),
        path: '/attribute',
        subRoutes: [
            {
                path: '/attribute',
                title: '属性列表',
                show: true,
                component: () => import('../pages/attribute/index'),
            }
        ]
    },
    {
        title: '客群分析',
        icon: require('../assets/layout/icon_kqfx.png'),
        path: '/customer',
        subRoutes: [
            {
                path: '/customer',
                title: '自定义客群分析',
                show: true,
                component: () => import('../pages/customer/setting/index'),
            },
            {
                path: '/customer/analysis',
                title: '画像详情',
                show: true,
                component: () => import('../pages/customer/analysis/index'),
            }
        ]
    }
]
