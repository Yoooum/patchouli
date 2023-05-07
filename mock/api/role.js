import repo from '../repo'
const roleList = [
  {
    id: 1,
    name: '管理员',
    description: '拥有所有权限',
    menu: [101, 102, 10201, 10202, 103, 104],
    createAt: '2022-01-01 00:00:00',
    updateAt: '2022-01-01 00:00:00',
  },
  {
    id: 2,
    name: '用户',
    description: '拥有部分权限，可以查看基础页面',
    menu: [101],
    createAt: '2022-01-01 00:00:00',
    updateAt: '2022-01-01 00:00:00',
  },
]

export default [
  {
    url: '/mock/role',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: roleList
      }
    },
  },
  {
    url: '/mock/role/:id',
    method: 'get',
    response: ({ url }) => {
      const id = url.split('/')[3]
      repo.set('role', roleList)
      return {
        code: 0,
        data: roleList.find(item => item.id === Number(id))
      }
    },
  }
]
