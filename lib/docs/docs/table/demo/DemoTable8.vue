<script lang="ts" setup>
import mvJson from './movie_hot_gaia.json'

const data: any = ref(mvJson)
const tableRef = ref()
const columns = [
  {
    type: 'text',
    title: 'id',
    field: 'id',
    width: 100,
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
    type: 'text',
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
    width: 150,
    align: 'center',
    fixed: 'right',
    x: 'center'
  }
]

const get = (e: any) => {
  if (e.column.field === 'action') {
    LewMessage.info(`点击了 id=>${e.row.id}`)
  }
}

const selectedKeys = ref('35503077')
</script>

<template>
  <div style="margin-bottom: 10px">已选择： {{ selectedKeys }}</div>
  <lew-table
    ref="tableRef"
    checkable
    v-model:selectedKeys="selectedKeys"
    :data-source="data"
    :columns="columns"
    :max-height="400"
    rowKey="id"
  >
    <template #release_date="{ row }"> {{ row.release_date }} </template>
    <template #directors="{ row }">
      <lew-tag
        v-for="(item, index) in row.directors"
        :key="index"
        round
        size="small"
        type="light"
        color="gray"
      >
        {{ item }}</lew-tag
      >
    </template>
    <template #info="{ row }">
      <lew-text-trim style="width: 100%" :text="row.info" />
    </template>

    <template #action="{ row, column }">
      <lew-flex gap="0">
        <lew-button size="small" text="管理" type="text" @click.stop="get({ row, column })" />
        <lew-popok
          title="删除确认"
          content="删除之后无法恢复，请确认！"
          placement="left"
          width="200px"
          @click.stop
        >
          <lew-button size="small" text="删除" type="text" />
        </lew-popok>
      </lew-flex>
    </template>
    <template #type="{ row }">
      <lew-tag color="green" type="light" round size="small"
        >{{ row.type === 'movie' ? '电影' : '电视剧' }}
      </lew-tag>
    </template>
    <template #has_linewatch="{ row }">
      <span>{{ row.has_linewatch ? '是' : '否' }}</span>
    </template>
    <template #actors="{ row }">
      <lew-flex
        v-tooltip="{
          content: row.actors.join(' <br /> '),
          placement: 'left',
          trigger: 'mouseenter',
          allowHTML: true
        }"
        x="start"
        gap="5"
      >
        <lew-tag
          v-for="(actor, index) in row.actors"
          :key="index"
          type="light"
          color="blue"
          size="small"
          >{{ actor }}
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
