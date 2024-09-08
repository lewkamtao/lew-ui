<script lang="ts" setup>
const data: any = ref([
  {
    id: 1,
    name: 'Supreme Box Logo连帽衫',
    releaseYear: '2020',
    popularity: 98,
    brand: 'Supreme',
    category: '上衣',
    price: 3999,
    stock: 50,
    sales: 1200,
    rating: 4.8,
    intro: '经典Box Logo设计，采用优质棉料，舒适保暖，街头潮流必备单品。',
    material: '100%棉',
    size: 'M/L/XL',
    color: '黑色/白色/红色',
    origin: '美国',
    warranty: '30天'
  },
  {
    id: 2,
    name: 'Off-White工业风腰带',
    releaseYear: '2019',
    popularity: 95,
    brand: 'Off-White',
    category: '配饰',
    price: 1999,
    stock: 100,
    sales: 800,
    rating: 4.6,
    intro: '标志性工业风格设计，采用尼龙材质，可调节长度，彰显个性。',
    material: '尼龙',
    size: '均码',
    color: '黑色/黄色',
    origin: '意大利',
    warranty: '1年'
  },
  {
    id: 3,
    name: 'BAPE鲨鱼头连帽衫',
    releaseYear: '2021',
    popularity: 92,
    brand: 'BAPE',
    category: '上衣',
    price: 2999,
    stock: 75,
    sales: 950,
    rating: 4.7,
    intro: '经典鲨鱼头设计，采用迷彩印花，拉链可拉至顶部形成鲨鱼嘴造型。',
    material: '80%棉 20%聚酯纤维',
    size: 'S/M/L/XL',
    color: '迷彩绿/迷彩蓝',
    origin: '日本',
    warranty: '14天'
  },
  {
    id: 4,
    name: 'Yeezy Boost 350 V2运动鞋',
    releaseYear: '2022',
    popularity: 97,
    brand: 'Adidas',
    category: '鞋履',
    price: 2499,
    stock: 60,
    sales: 1500,
    rating: 4.9,
    intro: 'Kanye West设计，Boost缓震科技，编织鞋面，舒适时尚。',
    material: 'Primeknit编织面料',
    size: '36-45',
    color: '斑马纹/黑红/冰蓝',
    origin: '中国',
    warranty: '1年'
  },
  {
    id: 5,
    name: 'Palace Tri-Ferg短袖T恤',
    releaseYear: '2021',
    popularity: 90,
    brand: 'Palace',
    category: '上衣',
    price: 799,
    stock: 120,
    sales: 700,
    rating: 4.5,
    intro: '标志性三角logo设计，采用优质棉料，简约百搭，街头潮流必备。',
    material: '100%棉',
    size: 'S/M/L/XL',
    color: '白色/黑色/灰色',
    origin: '英国',
    warranty: '7天'
  }
])

const columns = [
  {
    title: 'ID',
    field: 'id',
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '产品信息',
    width: 240,
    field: 'productInfo',
    align: 'start',
    customRender: ({ row }: any) => {
      return h('div', { class: 'info' }, [
        h('div', { style: 'font-weight: bold; margin-bottom: 5px;' }, row.name),
        h('div', { class: 'brand' }, `${row.brand} (${row.category})`)
      ])
    },
    fixed: 'left'
  },
  {
    title: '发布年份',
    field: 'releaseYear',
    width: 100,
    align: 'center',
    customRender: ({ row }: any) => {
      const currentYear = new Date().getFullYear()
      const age = currentYear - parseInt(row.releaseYear)
      return h('div', [
        h('div', row.releaseYear),
        h('div', { style: 'font-size: 12px; color: #999;' }, `${age}年前`)
      ])
    }
  },
  {
    title: '人气与价格',
    width: 140,
    align: 'center',
    customRender: ({ row }: any) => {
      const popularityColor =
        row.popularity >= 95 ? '#ff4d4f' : row.popularity >= 90 ? '#faad14' : '#52c41a'
      return h('div', { class: 'popularity-price-container' }, [
        h('div', { class: 'popularity', style: `color: ${popularityColor};` }, [
          h('span', { class: 'popularity-value' }, `${row.popularity}%`)
        ]),
        h('div', { class: 'price' }, [
          h('span', { class: 'price-value' }, `¥${row.price.toLocaleString()}`)
        ])
      ])
    }
  },
  {
    title: '库存',
    field: 'stock',
    width: 80,
    align: 'center'
  },
  {
    title: '销量',
    field: 'sales',
    width: 100,
    align: 'center'
  },
  {
    title: '评分',
    field: 'rating',
    width: 100,
    align: 'center',
    customRender: ({ row }: any) => {
      return h('div', [
        h('span', { style: 'color: #faad14; margin-right: 5px;' }, '★'),
        h('span', row.rating)
      ])
    }
  },
  {
    title: '简介',
    width: 300,
    field: 'intro',
    align: 'start',
    customRender: ({ row }: any) => {
      return h('div', [
        h('div', { style: 'font-weight: bold; margin-bottom: 5px;' }, row.name),
        h('div', { style: 'font-size: 14px;' }, row.intro)
      ])
    }
  },
  {
    title: '材质',
    field: 'material',
    width: 120,
    align: 'center'
  },
  {
    title: '尺码',
    field: 'size',
    width: 100,
    align: 'center'
  },
  {
    title: '颜色',
    field: 'color',
    width: 150,
    align: 'center'
  },
  {
    title: '产地',
    field: 'origin',
    width: 100,
    fixed: 'right',
    align: 'center'
  },
  {
    title: '保修',
    field: 'warranty',
    width: 100,
    fixed: 'right',
    align: 'center'
  }
]
</script>

<template>
  <lew-table :data-source="data" :columns="columns"> </lew-table>
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
