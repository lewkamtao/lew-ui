<script lang="ts" setup>
const data: any = ref([
  {
    id: 1,
    name: 'iPhone 13',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: '2021',
    rating: 95,
    brand: 'Apple',
    category: '智能手机',
    intro: '搭载A15仿生芯片，支持5G网络，配备超级视网膜XDR显示屏。'
  },
  {
    id: 2,
    name: 'Galaxy S21',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: '2021',
    rating: 92,
    brand: 'Samsung',
    category: '智能手机',
    intro: '采用Exynos 2100处理器，支持8K视频录制，配备动态AMOLED 2X显示屏。'
  },
  {
    id: 3,
    name: 'MacBook Pro',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: '2021',
    rating: 88,
    brand: 'Apple',
    category: '笔记本电脑',
    intro: '搭载M1 Pro或M1 Max芯片，配备Liquid Retina XDR显示屏，支持ProMotion自适应刷新率。'
  },
  {
    id: 4,
    name: 'Surface Laptop 4',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: '2021',
    rating: 85,
    brand: 'Microsoft',
    category: '笔记本电脑',
    intro: '搭载Intel Core或AMD Ryzen处理器，配备PixelSense触摸屏，支持Windows Hello面部识别。'
  },
  {
    id: 5,
    name: 'iPad Pro',
    avatar: 'https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668',
    releaseYear: '2021',
    rating: 90,
    brand: 'Apple',
    category: '平板电脑',
    intro: '搭载M1芯片，支持5G网络，配备Liquid Retina XDR显示屏，支持ProMotion技术。'
  }
])

const columns = [
  {
    title: 'ID',
    field: 'id',
    width: 60,
    x: 'center'
  },
  {
    title: '产品信息',
    width: 150,
    field: 'info'
  },
  {
    title: '发布年份',
    field: 'releaseYear',
    width: 120,
    x: 'center',
    customRender: ({ row }: any) => {
      return row.releaseYear
    }
  },
  {
    title: '类别',
    field: 'category',
    width: 120,
    x: 'center'
  },
  {
    title: '评分',
    width: 120,
    field: 'rating',
    x: 'center'
  },
  {
    title: '简介',
    width: 480,
    type: 'text-trim',
    field: 'intro'
  }
]
</script>

<template>
  <div style="height: 380px">
    <lew-table :data-source="data" :columns="columns">
      <template #info="{ row }">
        <lew-flex direction="y" x="start" gap="0px" class="info">
          <div class="name">{{ row.name }}</div>
          <div class="brand">{{ row.brand }}</div>
        </lew-flex>
      </template>
      <template #rating="{ row }">
        <lew-flex>
          <lew-badge v-if="row.rating >= 90" round color="green" />
          <lew-badge v-else-if="row.rating >= 80" round color="blue" />
          <lew-badge v-else round color="orange" />
          <span>{{ row.rating >= 90 ? '优秀' : row.rating >= 80 ? '良好' : '一般' }}</span>
        </lew-flex>
      </template>
    </lew-table>
  </div>
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
