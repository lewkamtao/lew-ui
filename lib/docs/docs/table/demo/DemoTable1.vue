<script lang="ts" setup>
import { orderBy } from 'lodash-es'
const data: any = ref([
  {
    id: 1,
    name: 'iPhone 20',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2030,
    rating: 95,
    brand: 'Apple',
    category: '智能手机',
    intro: '搭载A20仿生芯片，支持8G网络，配备超级视网膜XDR显示屏。',
    price: 9999,
    stock: 1000,
    color: '深空黑',
    storage: '512GB',
    camera: '108MP',
    battery: '5000mAh'
  },
  {
    id: 2,
    name: 'Galaxy S21',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2020,
    rating: 92,
    brand: 'Samsung',
    category: '智能手机',
    intro: '采用Exynos 2100处理器，支持8K视频录制，配备动态AMOLED 2X显示屏。',
    price: 7999,
    stock: 800,
    color: '幻境银',
    storage: '256GB',
    camera: '64MP',
    battery: '4800mAh'
  },
  {
    id: 3,
    name: 'MacBook Pro',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2025,
    rating: 88,
    brand: 'Apple',
    category: '笔记本电脑',
    intro:
      '搭载M1 Pro或M1 Max芯片，配备Liquid Retina XDR显示屏，支持ProMotion自适应刷新率。',
    price: 15999,
    stock: 500,
    color: '银色',
    storage: '1TB',
    processor: 'M1 Pro',
    memory: '32GB'
  },
  {
    id: 4,
    name: 'Surface Laptop 4',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2024,
    rating: 85,
    brand: 'Microsoft',
    category: '笔记本电脑',
    intro:
      '搭载Intel Core或AMD Ryzen处理器，配备PixelSense触摸屏，支持Windows Hello面部识别。',
    price: 12999,
    stock: 600,
    color: '铂金色',
    storage: '512GB',
    processor: 'Intel i7',
    memory: '16GB'
  },
  {
    id: 5,
    name: 'iPad Pro',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: 2021,
    rating: 90,
    brand: 'Apple',
    category: '平板电脑',
    intro:
      '搭载M1芯片，支持5G网络，配备Liquid Retina XDR显示屏，支持ProMotion技术。',
    price: 8999,
    stock: 750,
    color: '太空灰',
    storage: '256GB',
    processor: 'M1',
    memory: '8GB'
  }
])

const columns = [
  {
    title: 'ID',
    field: 'id',
    width: 60,
    x: 'center',
    fixed: 'left'
  },
  {
    title: '产品信息',
    x: 'center',
    children: [
      {
        title: '基本信息',
        x: 'center',
        children: [
          {
            title: '名称',
            width: 150,
            field: 'name'
          },
          {
            title: '品牌',
            field: 'brand',
            width: 120,
            x: 'center'
          },
          {
            title: '类别',
            field: 'category',
            width: 120,
            x: 'center'
          }
        ]
      },
      {
        title: '发布年份',
        field: 'releaseYear',
        width: 120,
        x: 'center',
        customRender: ({ row }: any) => {
          return row.releaseYear + '年'
        }
      },
      {
        title: '价格',
        field: 'price',
        width: 120,
        x: 'center',
        sortable: true,
        customRender: ({ row }: any) => {
          return '￥' + row.price
        }
      }
    ]
  },
  {
    title: '规格参数',
    x: 'center',
    children: [
      {
        title: '存储',
        field: 'storage',
        width: 120,
        x: 'center'
      },
      {
        title: '颜色',
        field: 'color',
        width: 120,
        x: 'center'
      },
      {
        title: '库存',
        field: 'stock',
        width: 100,
        x: 'center'
      }
    ]
  },
  {
    title: '评分',
    width: 120,
    field: 'rating',
    x: 'center',
    fixed: 'right'
  },
  {
    title: '简介',
    width: 300,
    field: 'intro'
  }
]

const sortValue = ref<any>({
  price: 'desc'
})

const sortChange = () => {
  console.log(sortValue.value)
  if (sortValue.value['price']) {
    data.value = orderBy(data.value, 'price', sortValue.value['price'])
  } else {
    data.value = orderBy(data.value, 'id', 'asc')
  }
}
</script>

<template>
  <lew-table
    :data-source="data"
    bordered
    :columns="columns"
    v-model:sortValue="sortValue"
    @sort-change="sortChange"
  >
    <template #info="{ row }">
      <lew-flex direction="y" x="start" gap="0px" class="info">
        <div class="name">{{ row.name }}</div>
        <div class="brand">{{ row.brand }}</div>
      </lew-flex>
    </template>
    <template #rating="{ row }">
      <lew-flex x="center" y="center">
        <lew-badge v-if="row.rating >= 90" round color="green" />
        <lew-badge v-else-if="row.rating >= 80" round color="blue" />
        <lew-badge v-else round color="orange" />
        <span>{{
          row.rating >= 90 ? '优秀' : row.rating >= 80 ? '良好' : '一般'
        }}</span>
      </lew-flex>
    </template>
  </lew-table>
</template>

<style lang="scss" scoped>
.info {
  line-height: 22px;

  .name {
    font-weight: bold;
  }

  .brand {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    white-space: nowrap;
    color: var(--lew-text-color-7);
  }
}
</style>
