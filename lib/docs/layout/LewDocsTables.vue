<script setup lang="ts">
import docsLocale from '@/locals'
const props = defineProps({
  options: {
    type: Object,
    default() {
      return {}
    }
  }
})

const getComponentName = () => {
  const { path } = useRoute()
  return path
    .replace('/', '')
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, (letter) => letter.toLowerCase())
}

const getColumns = computed(
  () =>
    ({ columnsKey, title }: { columnsKey: string; title: string }) => {
      const nameMap: Record<string, string> = {
        model: '参数名称',
        props: '参数名称',
        slots: '插槽名称',
        events: '事件名称',
        methods: '方法名称'
      }
      const columns = [
        {
          title: nameMap[columnsKey],
          width: 120,
          field: 'name'
        },
        {
          title: '描述',
          width: 200,
          field: 'description',
          customRender: ({ row }: any) => {
            const { name } = row
            return docsLocale.t(
              `components.${getComponentName()}.${title.replace(/^[A-Z]/, (match) => match.toLowerCase())}.${name}`
            )
          }
        },
        {
          title: '类型',
          width: 200,
          field: 'type',
          customRender: ({ row }: any) => {
            const { typeDesc, type } = row
            return typeDesc || type
          }
        }
      ]

      if (columnsKey !== 'events') {
        columns.push({
          title: '默认值',
          width: 120,
          field: 'default',
          customRender: ({ text, row }: any) => {
            const { name, defaultLocale } = row
            return defaultLocale
              ? docsLocale.t(`components.${getComponentName()}.default.${name}`)
              : text || '-'
          }
        })
      }
      return columns
    }
)
const sortValue = computed(() => {
  return props.options
    .map((e: any) => {
      return {
        orderNum: e.orderNum || 99999,
        ...e
      }
    })
    .sort((a: any, b: any) => a.orderNum - b.orderNum)
})
const copyObjectAsFile = (item: any) => {
  const result = item.data.reduce((acc: Record<string, string>, cur: any) => {
    acc[cur.name] = cur.description
    return acc
  }, {})
  console.log(result)
}
</script>

<template>
  <lew-flex direction="y" gap="70px" class="docs-wrapper">
    <lew-flex
      v-for="(item, index) in sortValue"
      :key="index"
      direction="y"
      x="start"
    >
      <lew-title
        @click="copyObjectAsFile(item)"
        :id="item.title"
        :size="18"
        class="demo-docs-title"
      >
        {{ item.title }}
      </lew-title>
      <lew-table :data-source="item.data" :columns="getColumns(item)" />
    </lew-flex>
  </lew-flex>
</template>

<style lang="scss" scoped>
.demo-docs-title {
  text-transform: capitalize;
  letter-spacing: 0.8px;
}
</style>
