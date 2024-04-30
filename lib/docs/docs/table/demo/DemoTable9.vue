<script lang="ts" setup>
const columns = [
  {
    type: 'text',
    title: 'id',
    field: 'id',
    width: 100,
    fixed: 'left',
    x: 'center'
  },
  {
    type: 'text',
    title: '名称',
    field: 'title',
    width: 180
  },

  {
    type: 'text',
    title: '上线日期',
    field: 'release_date',
    width: 100,
    x: 'center'
  },
  {
    type: 'template',
    title: '在线观看',
    field: 'has_linewatch',
    width: 100,

    x: 'center'
  },
  {
    type: 'html',
    title: '导演',
    field: 'directors',
    width: 140
  },
  {
    type: 'text',
    title: '简介',
    field: 'info',
    width: 120
  },
  {
    type: 'template',
    title: '类型',
    field: 'type',
    width: 100,
    x: 'center'
  },
  {
    type: 'template',
    title: '主演',
    align: 'start',
    field: 'actors',
    width: 450
  },

  {
    type: 'template',
    title: '执行',
    field: 'action',
    width: 120,
    align: 'center',
    fixed: 'right',
    x: 'center'
  }
]
</script>

<template>
  <lew-table checkable :columns="columns" :max-height="400" rowKey="id" />
</template>

<style lang="scss" scoped>
.title,
.info {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
