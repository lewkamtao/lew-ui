<script lang="ts" setup>
const data: any = [
  {
    id: 1,
    brand: 'Supreme',
    founded: '1994',
    origin: '美国',
    style: '街头潮流',
    popularItems: ['Box Logo T恤', '连帽卫衣', '滑板'],
    description: '以其标志性的红色盒子logo和限量发售策略而闻名。'
  },
  {
    id: 2,
    brand: 'Off-White',
    founded: '2012',
    origin: '意大利',
    style: '高端街头',
    popularItems: ['工业腰带', '箭头T恤', '引号设计鞋'],
    description: '结合高端时尚与街头文化，以独特的引号设计和斜条纹标志著称。'
  },
  {
    id: 3,
    brand: 'BAPE',
    founded: '1993',
    origin: '日本',
    style: '日式街头',
    popularItems: ['鲨鱼连帽衫', 'Camo图案', 'Bapesta运动鞋'],
    description: '以其独特的迷彩图案和卡通猿人头像而闻名于世。'
  },
  {
    id: 4,
    brand: 'Palace',
    founded: '2009',
    origin: '英国',
    style: '滑板文化',
    popularItems: ['Tri-Ferg Logo T恤', '运动外套', '滑板配件'],
    description: '源于伦敦滑板文化，以三角形logo和幽默设计而著名。'
  }
]

const columns = [
  {
    title: 'ID',
    width: 50,
    field: 'id',
    x: 'center'
  },
  {
    title: '品牌',
    width: 100,
    field: 'brand',
    x: 'start'
  },
  {
    title: '成立年份',
    width: 100,
    field: 'founded',
    x: 'center'
  },
  {
    title: '发源地',
    width: 80,
    field: 'origin',
    x: 'center'
  },
  {
    title: '风格',
    width: 100,
    field: 'style',
    x: 'start'
  },
  {
    title: '热门单品',
    width: 300,
    field: 'popularItems',
    x: 'start'
  },
  {
    title: '品牌简介',
    width: 350,
    field: 'description',
    x: 'start'
  },
  {
    title: '操作',
    width: 120,
    field: 'action',
    fixed: 'right',
    x: 'center'
  }
]

const selectedKeys = ref<number[]>([])

const viewDetails = (row: any, column: any) => {
  console.log('查看详情', row, column)
}
const addToFavorites = (row: any, column: any) => {
  console.log('添加收藏', row, column)
}
const tableRef = ref()

const setSelectedBrands = () => {
  selectedKeys.value = [2, 3]
}
</script>

<template>
  <lew-flex style="width: 100%" direction="y" x="start">
    <lew-button style="margin-bottom: 10px" @click="setSelectedBrands">
      设置默认选中品牌
    </lew-button>
    <div>已选择：{{ selectedKeys }}</div>
    <lew-table
      ref="tableRef"
      :data-source="data"
      :columns="columns"
      checkable
      multiple
      v-model:selectedKeys="selectedKeys"
      rowKey="id"
    >
      <template #popularItems="{ row }">
        <lew-flex gap="5" x="start">
          <lew-tag v-for="(item, index) in row.popularItems" :key="index" type="light" color="blue">
            {{ item }}
          </lew-tag>
        </lew-flex>
      </template>
      <template #action="{ row, column }">
        <lew-flex gap="0">
          <lew-button size="small" text="详情" type="text" @click="viewDetails(row, column)" />
          <lew-button size="small" text="收藏" type="text" @click="addToFavorites(row, column)" />
        </lew-flex>
      </template>
    </lew-table>
  </lew-flex>
</template>
