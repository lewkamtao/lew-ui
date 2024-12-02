<script lang="ts" setup>
import type { MenuTreeItem } from 'lew-ui'
import {
  Home,
  ShoppingCart,
  Users,
  Target,
  BarChart2,
  Package,
  Truck,
  MessageSquare,
  DollarSign,
  Settings
} from 'lucide-vue-next'
const selectKey = ref('1-1-1')
const expandKeys = ref(['1', '1-1', '1-1-1'])
const options = [
  {
    key: '1',
    title:
      '商品管理商品管理商品管理商品管理商品管理商品管理商品管理商品管理商品管理商品管理',
    renderIcon: () => h(Home, { size: 14 }),
    children: [
      {
        key: '1-1',
        title: '商品管理商品管理商品管理商品管理商品管理',
        children: [
          {
            key: '1-1-1',
            title:
              '上架商品上架商品上架商品上架商品上架商品上架商品上架商品上架商品'
          },
          { key: '1-1-2', title: '下架商品' },
          { key: '1-1-3', title: '商品审核' }
        ]
      },
      {
        key: '1-2',
        title: '分类管理',
        children: [
          { key: '1-2-1', title: '添加分类' },
          { key: '1-2-2', title: '分类列表' }
        ]
      }
    ]
  },
  {
    key: '2',
    title: '订单管理',
    renderIcon: () => h(ShoppingCart, { size: 14 }),
    children: [
      {
        key: '2-1',
        title: '订单列表',
        children: [
          { key: '2-1-1', title: '待付款' },
          { key: '2-1-2', title: '待发货' },
          { key: '2-1-3', title: '已完成' }
        ]
      },
      {
        key: '2-2',
        title: '退款管理',
        children: [
          { key: '2-2-1', title: '退款申请' },
          { key: '2-2-2', title: '退款记录' }
        ]
      }
    ]
  },
  {
    key: '3',
    title: '用户管理',
    renderIcon: () => h(Users, { size: 14 }),
    children: [
      {
        key: '3-1',
        title: '用户列表',
        children: [
          { key: '3-1-1', title: '普通用户' },
          { key: '3-1-2', title: 'VIP用户' }
        ]
      },
      {
        key: '3-2',
        title: '用户反馈',
        children: [
          { key: '3-2-1', title: '意见箱' },
          { key: '3-2-2', title: '投诉处理' }
        ]
      }
    ]
  },
  {
    key: '4',
    title: '营销管理',
    renderIcon: () => h(Target, { size: 14 }),
    children: [
      {
        key: '4-1',
        title: '优惠券',
        children: [
          { key: '4-1-1', title: '优惠券列表' },
          { key: '4-1-2', title: '新增优惠券' }
        ]
      },
      {
        key: '4-2',
        title: '活动管理',
        children: [
          { key: '4-2-1', title: '秒杀活动' },
          { key: '4-2-2', title: '团购活动' }
        ]
      }
    ]
  },
  {
    key: '5',
    title: '数据统计',
    renderIcon: () => h(BarChart2, { size: 14 }),
    children: [
      {
        key: '5-1',
        title: '销售统计',
        children: [
          { key: '5-1-1', title: '日销售额' },
          { key: '5-1-2', title: '月销售额' }
        ]
      },
      {
        key: '5-2',
        title: '用户统计',
        children: [
          { key: '5-2-1', title: '新增用户' },
          { key: '5-2-2', title: '活跃用户' }
        ]
      }
    ]
  },
  {
    key: '6',
    title: '库存管理',
    renderIcon: () => h(Package, { size: 14 }),
    children: [
      {
        key: '6-1',
        title: '库存查询',
        children: [
          { key: '6-1-1', title: '实时库存' },
          { key: '6-1-2', title: '库存预警' }
        ]
      },
      {
        key: '6-2',
        title: '入库管理',
        children: [
          { key: '6-2-1', title: '新增入库' },
          { key: '6-2-2', title: '入库记录' }
        ]
      }
    ]
  },
  {
    key: '7',
    title: '物流管理',
    renderIcon: () => h(Truck, { size: 14 }),
    children: [
      {
        key: '7-1',
        title: '配送设置',
        children: [
          { key: '7-1-1', title: '运费模板' },
          { key: '7-1-2', title: '配送区域' }
        ]
      },
      {
        key: '7-2',
        title: '物流跟踪',
        children: [
          { key: '7-2-1', title: '查询物流' },
          { key: '7-2-2', title: '异常处理' }
        ]
      }
    ]
  },
  {
    key: '8',
    title: '评价管理',
    renderIcon: () => h(MessageSquare, { size: 14 }),
    children: [
      {
        key: '8-1',
        title: '评价列表',
        children: [
          { key: '8-1-1', title: '好评' },
          { key: '8-1-2', title: '中评' },
          { key: '8-1-3', title: '差评' }
        ]
      },
      {
        key: '8-2',
        title: '评价回复',
        children: [
          { key: '8-2-1', title: '自动回复' },
          { key: '8-2-2', title: '人工回复' }
        ]
      }
    ]
  },
  {
    key: '9',
    title: '财务管理',
    renderIcon: () => h(DollarSign, { size: 14 }),
    children: [
      {
        key: '9-1',
        title: '收入统计',
        children: [
          { key: '9-1-1', title: '销售收入' },
          { key: '9-1-2', title: '其他收入' }
        ]
      },
      {
        key: '9-2',
        title: '支出管理',
        children: [
          { key: '9-2-1', title: '运营成本' },
          { key: '9-2-2', title: '人工成本' }
        ]
      }
    ]
  },
  {
    key: '10',
    title: '系统设置',
    renderIcon: () => h(Settings, { size: 14 }),
    children: [
      {
        key: '10-1',
        title: '权限管理',
        children: [
          { key: '10-1-1', title: '角色设置' },
          { key: '10-1-2', title: '权限分配' }
        ]
      },
      {
        key: '10-2',
        title: '系统维护',
        children: [
          { key: '10-2-1', title: '系统日志' },
          { key: '10-2-2', title: '数据备份' }
        ]
      }
    ]
  }
]

const change = (item: MenuTreeItem) => {
  console.log(item)
}
</script>

<template>
  <lew-menu-tree
    width="300"
    v-model="selectKey"
    v-model:expandKeys="expandKeys"
    :options="options"
    @change="change"
  />
</template>
