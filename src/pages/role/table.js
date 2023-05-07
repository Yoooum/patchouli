import { h } from 'vue'
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui'
import { timestampToDatetime } from '@/utils'

function renderButton(row, type, label, action) {
  return h(NButton, { type, size: 'small', onClick: () => action?.(row) }, { default: () => label })
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
      key: 'updateAt',
      render: (row) => {
        return timestampToDatetime(row.updateAt)
      },
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (row) => {
        return h(NSpace, { justify: 'center' }, {
          default: () => [
            renderButton(row, 'primary', '编辑', onUpdateRole),
            h(NPopconfirm, { onPositiveClick: () => onRemoveRole?.(row) }, {
              trigger: () => renderButton(row, 'warning', '删除'),
              default: () => '你确定要删除该角色吗？',
            }),
          ],
        })
      },
    },
  ]
}

function createTableData(search) {
  const data = [
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
  if (search) {
    return data.filter(item =>
      item.name.includes(search))
  }
  return data
}
export { createTableColumns, createTableData }
