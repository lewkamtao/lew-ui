<script setup lang="ts">
const tableData = ref([])
const columns = ref([
  {
    title: '姓名',
    field: 'name',
    width: 100
  },
  {
    title: '年龄',
    field: 'age',
    as: 'input-number',
    width: 100
  },
  {
    title: '性别',
    field: 'gender',
    as: 'tabs',
    props: {
      itemWidth: 80,
      options: [
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        }
      ]
    },
    width: 100
  }
])
</script>
<template>
  <lew-flex direction="y" x="start">
    <lew-input-table width="500px" :columns="columns" v-model="tableData"></lew-input-table>
  </lew-flex>
</template>
