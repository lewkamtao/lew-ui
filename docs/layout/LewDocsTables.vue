<script setup lang="ts">
import docsLocale from 'docs/locals'
import { LewFlex, LewTag, locale } from 'lew-ui'

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {}
    },
  },
})

function getComponentName() {
  const { path } = useRoute()
  return path
    .replace('/', '')
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, letter => letter.toLowerCase())
}

const getColumns = computed(
  () =>
    ({ columnsKey, title }: { columnsKey: string, title: string }) => {
      const nameMap: Record<string, string> = {
        model: '参数名称',
        props: '参数名称',
        slots: '插槽名称',
        events: '事件名称',
        methods: '方法名称',
      }
      let columns: any = [
        {
          title: nameMap[columnsKey],
          width: 120,
          field: 'name',
          type: 'text-trim',
        },
      ]

      if (!['events', 'methods', 'slots'].includes(columnsKey)) {
        columns = [
          ...columns,
          {
            title: '类型',
            width: 120,
            field: 'type',
            customRender: ({ row }: any) => {
              const { typeDesc, type } = row
              const tags = (typeDesc || type || '')
                .split('|')
                .map((text: any) => {
                  // 去除前后的空格
                  return h(
                    LewTag,
                    {
                      type: 'light',
                      color: 'pink',
                      size: 'small',
                    },
                    {
                      default: () => text.trim(),
                    },
                  )
                })
              return h(
                LewFlex,
                {
                  x: 'start',
                  y: 'center',
                  gap: 5,
                  wrap: true,
                },
                {
                  default: () => tags,
                },
              )
            },
          },
          {
            title: '默认值',
            width: 120,
            field: 'default',
            customRender: ({ text, row }: any) => {
              const { name, defaultLocale } = row
              return defaultLocale
                ? locale.t(`${getComponentName()}.${name}`)
                : text || '-'
            },
          },
        ]
      }
      columns = [
        ...columns,
        {
          title: '描述',
          width: ['events', 'methods'].includes(columnsKey) ? 400 : 200,
          field: 'description',
          customRender: ({ row }: any) => {
            const { name } = row
            return docsLocale.t(
              `components.${getComponentName()}.${title.replace(
                /^[A-Z]/,
                match => match.toLowerCase(),
              )}.${name}`,
            )
          },
        },
      ]
      return columns
    },
)
const sortValue = computed(() => {
  return props.options
    .map((e: any) => {
      return {
        orderNum: e.orderNum || 99999,
        ...e,
      }
    })
    .sort((a: any, b: any) => a.orderNum - b.orderNum)
})

function getTag(title: string) {
  // 获取用括号包裹的内容
  const match = title.match(/\((.*?)\)/)
  return match ? match[1] : ''
}

function getTitle(title: string) {
  // 过滤掉括号
  return title.replace(/\((.*?)\)/, '')
}
</script>

<template>
  <LewFlex direction="y" gap="70px" class="docs-wrapper">
    <LewFlex
      v-for="(item, index) in sortValue"
      :key="index"
      direction="y"
      x="start"
    >
      <lew-title :id="item.title" :size="18" class="demo-docs-title">
        {{ getTitle(item.title) }}
        <LewTag
          v-if="getTag(item.title)"
          style="margin-left: 5px"
          type="light"
          color="orange"
        >
          {{ getTag(item.title) }}
        </LewTag>
      </lew-title>
      <lew-table :data-source="item.data" :columns="getColumns(item)" />
    </LewFlex>
  </LewFlex>
</template>

<style lang="scss" scoped>
.demo-docs-title {
  text-transform: capitalize;
  letter-spacing: 0.8px;
}
:deep(.lew-tag-value) {
  letter-spacing: 1px;
}
</style>
