import { h } from 'vue'
import { NButton, NSpace, NTag } from 'naive-ui'

function renderButton(row, type, label, action) {
  return h(NButton, { type, size: 'small', onClick() { action?.(row) } }, { default: () => label })
}

function createTableColumns({ onUpdateRole, onRemoveRole }) {
  onUpdateRole = onUpdateRole || (() => {})
  onRemoveRole = onRemoveRole || (() => {})
  return [
    {
      title: '角色名称',
      key: 'name',
      render: (row) => {
        return h(NTag, { type: 'primary' }, { default: () => row.name })
      },
    },
    {
      title: '角色描述',
      key: 'description',
    },
    {
      title: '更新时间',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (row) => {
        return h(NSpace, { justify: 'center' }, {
          default: () => [
            renderButton(row, 'primary', '编辑', onUpdateRole),
            renderButton(row, 'warning', '删除', onRemoveRole),
          ],
        })
      },
    },
  ]
}

function createTableData() {
  return [
    {
      id: 1,
      name: '管理员',
      description: '拥有所有权限',
      menus: [101, 102, 10201, 10202, 103, 104],
      createTime: '2022-01-01 00:00:00',
      updateTime: '2022-01-01 00:00:00',
    },
    {
      id: 2,
      name: '用户',
      description: '拥有部分权限，可以查看基础页面',
      menus: [101],
      createTime: '2022-01-01 00:00:00',
      updateTime: '2022-01-01 00:00:00',
    },
  ]
}
export { createTableColumns, createTableData }
