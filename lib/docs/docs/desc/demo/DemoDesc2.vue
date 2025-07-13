<script setup lang="ts">
import { ref } from 'vue'

// 定义数据源
const dataSource = ref({
  species: '狮子',
  name: '辛巴',
  gender: '雄性',
  age: '5岁',
  weight: '200kg',
  height: '1.2m',
  color: '金黄色',
  diet: '肉食',
  habitat: '非洲草原',
  lifespan: '15年',
  gestationPeriod: '110天',
  litterSize: '2-4',
  socialStructure: '群居',
  communication: '咆哮',
  hunting: '夜间',
  prey: '大型哺乳动物',
  predators: '人类、鬣狗、鳄鱼',
  conservationStatus: '易危',
  populationTrend: '下降',
  threats: '栖息地丧失、猎杀',
})
// 定义选项
const options = ref([
  {
    field: 'species',
    gridArea: '1 / 1 / 1 / 2',
    label: '物种',
  },
  {
    field: 'name',
    gridArea: '1 / 2 / 1 / 3',
    label: '名称',
  },
  {
    field: 'gender',
    gridArea: '1 / 3 / 1 / 4',
    label: '性别',
  },
  {
    field: 'age',
    gridArea: '2 / 1 / 2 / 2',
    label: '年龄',
  },
  {
    field: 'weight',
    gridArea: '2 / 2 / 2 / 3',
    label: '体重',
  },
  {
    field: 'height',
    gridArea: '2 / 3 / 2 / 4',
    label: '身高',
  },
  {
    field: 'color',
    gridArea: '3 / 1 / 3 / 2',
    label: '颜色',
  },
  {
    field: 'diet',
    gridArea: '3 / 2 / 3 / 3',
    label: '饮食',
  },
  {
    field: 'habitat',
    gridArea: '3 / 3 / 3 / 4',
    label: '栖息地',
  },
  {
    field: 'lifespan',
    gridArea: '4 / 1 / 4 / 2',
    label: '寿命',
  },
  {
    field: 'gestationPeriod',
    gridArea: '4 / 2 / 4 / 3',
    label: '妊娠期',
    tips: '狮子的妊娠期通常为110天。',
  },
  {
    field: 'litterSize',
    gridArea: '4 / 3 / 4 / 4',
    label: '产仔数',
  },
  {
    field: 'socialStructure',
    gridArea: '5 / 1 / 5 / 2',
    label: '社会结构',
    tips: '狮子通常以群体形式生活，形成社会结构。',
  },
  {
    field: 'communication',
    gridArea: '5 / 2 / 5 / 3',
    label: '交流方式',
    tips: '狮子通过咆哮、吼叫等方式进行交流。',
  },
  {
    field: 'hunting',
    gridArea: '5 / 3 / 5 / 4',
    label: '狩猎方式',
  },
  {
    field: 'prey',
    gridArea: '6 / 1 / 6 / 2',
    label: '猎物',
  },
  {
    field: 'predators',
    gridArea: '6 / 2 / 6 / 3',
    label: '天敌',
  },
  {
    field: 'conservationStatus',
    gridArea: '6 / 3 / 6 / 4',
    label: '保护状况',
    tips: '狮子被列为易危物种，面临栖息地丧失等威胁。',
  },
  {
    field: 'populationTrend',
    gridArea: '7 / 1 / 7 / 2',
    label: '种群趋势',
    tips: '狮子的种群数量正在下降，需采取保护措施。',
  },
  {
    field: 'threats',
    gridArea: '7 / 2 / 7 / 3',
    label: '威胁',
  },
])
</script>

<template>
  <lew-flex x="start" y="start" :gap="50">
    <lew-desc
      width="600"
      direction="y"
      :columns="3"
      :dataSource="dataSource"
      :options="options"
    />
  </lew-flex>
</template>
