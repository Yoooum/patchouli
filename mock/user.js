export default [
  {
    url: '/api/user',
    method: 'get',
    response: () => {
      return {
        id: 1,
        username: '未確認の庭師',
        email: 'r.yuri@qq.com',
        avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=2638836154&spec=100',
        role: [
          {
            id: 1,
            name: 'admin',
            description: '管理员',
            permissions: [],
            menus: [],
          },
        ],
      }
    },
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
      }
    },
  },
]
