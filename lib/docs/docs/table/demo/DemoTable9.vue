<script lang="ts" setup>
import mvJson from './movie_hot_gaia.json'

const data: any = ref(mvJson)
const tableRef = ref()
const columns = [
  {
    type: 'text',
    title: 'ID',
    field: 'id',
    width: 100,
    x: 'center',
  },
  {
    type: 'text',
    title: 'Title',
    field: 'title',
    width: 180,
  },

  {
    type: 'text',
    title: 'Release Date',
    field: 'release_date',
    width: 150,
    x: 'center',
  },
  {
    type: 'template',
    title: 'Available Online',
    field: 'has_linewatch',
    width: 150,
    x: 'center',
  },
  {
    type: 'text',
    title: 'Directors',
    field: 'directors',
    width: 150,
  },
  {
    type: 'text',
    title: 'Synopsis',
    field: 'info',
    width: 320,
  },
  {
    type: 'template',
    title: 'Category',
    field: 'type',
    width: 100,
    x: 'center',
  },
  {
    type: 'template',
    title: 'Cast',
    align: 'start',
    field: 'actors',
    width: 450,
  },
]

const selectedKeys = ref('35503077')
</script>

<template>
  <div style="margin-bottom: 10px">
    Selected: {{ selectedKeys }}
  </div>
  <lew-table
    ref="tableRef"
    v-model:selected-keys="selectedKeys"
    checkable
    :data-source="data"
    :columns="columns"
    :max-height="400"
    row-key="id"
  >
    <template #release_date="{ row }">
      {{ row.release_date }}
    </template>
    <template #directors="{ row }">
      <lew-tag
        v-for="(item, index) in row.directors"
        :key="index"
        round
        oversize
        size="small"
        type="light"
        color="gray"
      >
        {{ item }}
      </lew-tag>
    </template>
    <template #info="{ row }">
      <lew-text-trim style="width: 100%" :text="row.info" />
    </template>

    <template #type="{ row }">
      <lew-tag oversize color="green" type="light" round size="small">
        {{ row.type }}
      </lew-tag>
    </template>
    <template #has_linewatch="{ row }">
      <span>{{ row.has_linewatch ? 'Yes' : 'No' }}</span>
    </template>
    <template #actors="{ row }">
      <lew-flex x="start" gap="5" wrap>
        <lew-tag
          v-for="(actor, index) in row.actors"
          :key="index"
          type="light"
          color="blue"
          size="small"
        >
          {{ actor }}
        </lew-tag>
      </lew-flex>
    </template>
  </lew-table>
</template>

<style lang="scss" scoped>
.title,
.info {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
