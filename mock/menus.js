export default [
  {
    url: '/api/menus',
    method: 'get',
    response: () => {
      return [
        {
          id: 101,
          label: '首页',
          icon: 'home',
          path: '/dashboard',
        },
        {
          id: 102,
          label: '用户',
          icon: 'user',
          children: [
            {
              id: 10201,
              label: '活动用户',
              path: '/system/user',
            },
            {
              id: 10202,
              label: '角色管理',
              path: '/system/role',
            },
          ],
        },
        {
          id: 103,
          label: 'Chart 示例',
          icon: 'chart',
          path: '/charts',
        },
      ]
    },
  },
]
