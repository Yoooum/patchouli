import { h } from 'vue'
import {NButton, NPopconfirm, NSpace, NTag} from 'naive-ui'

function renderButton(row, type, label, action) {
  return h(NButton, { type, size: 'small', onClick: () => action?.(row) }, { default: () => label })
}

function createTableColumns({ onUpdateRole, onRemoveRole, valueToLabel }) {
  onUpdateRole = onUpdateRole || (() => {})
  onRemoveRole = onRemoveRole || (() => {})
  valueToLabel = valueToLabel || (() => {})
  return [
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: '用户',
      key: 'username',
    },
    {
      title: '角色',
      key: 'role',
      render: (row) => {
        return h(NTag, { type: 'primary' }, { default: () => valueToLabel?.(row.id) })
      }
    },
    {
      title: '手机',
      key: 'phone',
    },
    {
      title: '邮箱',
      key: 'email',
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
            h(NPopconfirm, { onPositiveClick: () => onRemoveRole?.(row) }, {
              trigger: () => renderButton(row, 'warning', '删除'),
              default: () => '你确定要删除该用户吗？',
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
      username: 'reimu',
      role: 1,
      phone: '12345678901',
      email: '123@qq.com',
      createTime: '2022-01-01 00:00:00',
      updateTime: '2022-01-01 00:00:00',
    },
    {
      id: 2,
      username: 'marisa',
      role: 2,
      phone: '12345678901',
      email: '123@qq.com',
      createTime: '2022-01-01 00:00:00',
      updateTime: '2022-01-01 00:00:00',
    },
  ]
  if (search) {
    return data.filter(item =>
      item.username.includes(search))
  }
  return data
}
export { createTableColumns, createTableData }
