import {h} from 'vue'
import {NButton, NPopconfirm, NSpace} from 'naive-ui'

function renderButton(row, type, label, action) {
    return h(NButton, {type, size: 'small', onClick: () => action?.(row)}, {default: () => label})
}

function createTableColumns({onUpdateRole, onRemoveRole}) {
    onUpdateRole = onUpdateRole || (() => {
    })
    onRemoveRole = onRemoveRole || (() => {
    })
    return [
        {
            title: 'ID',
            key: 'id',
        },
        {
            title: '名称',
            key: 'name',
        },
        {
            title: '类别',
            key: 'category',
        },
        {
            title: '价格',
            key: 'price',
        },
        {
            title: '库存',
            key: 'quantity',
        },
        {
            title: '描述',
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
                return h(NSpace, {justify: 'center'}, {
                    default: () => [
                        renderButton(row, 'primary', '编辑', onUpdateRole),
                        h(NPopconfirm, {onPositiveClick: () => onRemoveRole?.(row)}, {
                            trigger: () => renderButton(row, 'warning', '删除'),
                            default: () => '你确定要删除该商品吗？',
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
            name: '20寸 纯PC“铝框”（非全铝）登机箱',
            category: '配件',
            price: '￥299',
            quantity: '100',
            description: '40升适中容量，铝质包角，牢固抗摔',
            updateTime: '2021-08-01 12:00:00',
        },
        {
            id: 2,
            name: '粽庆端阳粽子礼盒（12只入）',
            category: '食品',
            price: '￥199',
            quantity: '80',
            description: '端午节送礼首选，粽子礼盒',
            updateTime: '2021-08-01 12:00:00',
        },
        {
            id: 3,
            name: '便携手持风扇',
            category: '电器',
            price: '￥29',
            quantity: '50',
            description: '便携小巧，手持清风',
            updateTime: '2021-08-01 12:00:00',
        }
    ]
    if (search) {
        return data.filter(item =>
            item.name.includes(search))
    }
    return data
}

export {createTableColumns, createTableData}
