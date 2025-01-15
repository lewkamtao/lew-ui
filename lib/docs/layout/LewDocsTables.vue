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

const columnsMap: any = {
  model: [
    {
      title: '参数名',
      width: 150,
      field: 'name'
    },
    {
      title: '描述',
      width: 250,
      field: 'description'
    },
    {
      title: '类型',
      width: 120,
      field: 'type'
    },
    {
      title: '默认值',
      width: 80,
      field: 'default'
    }
  ],
  props: [
    {
      title: '参数名',
      width: 150,
      field: 'name'
    },
    {
      title: '描述',
      width: 250,
      field: 'description',
      customRender: ({ row }: any) => {
        const { name } = row
        return docsLocale.t(`${getComponentName()}.props.${name}`)
      }
    },
    {
      title: '类型',
      width: 120,
      field: 'type'
    },
    {
      title: '默认值',
      width: 120,
      field: 'default',
      customRender: ({ text, row }: any) => {
        const { name } = row
        return text === '"i18n"'
          ? docsLocale.t(`${getComponentName()}.default.${name}`)
          : text
      }
    }
  ],
  slots: [
    {
      title: '插槽名',
      width: 150,
      field: 'name'
    },
    {
      title: '描述',
      width: 250,
      field: 'description'
    },
    {
      title: '参数',
      width: 120,
      field: 'params'
    }
  ],
  events: [
    {
      title: '事件名',
      width: 150,
      field: 'name'
    },
    {
      title: '描述',
      width: 220,
      field: 'description'
    },
    {
      title: '参数',
      width: 240,
      field: 'params'
    }
  ],
  methods: [
    {
      title: '方法名',
      width: 150,
      field: 'name'
    },
    {
      title: '描述',
      width: 240,
      field: 'description'
    },
    {
      title: '参数',
      width: 120,
      field: 'params'
    }
  ]
}
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
</script>

<template>
  <lew-flex direction="y" gap="70px" class="docs-wrapper">
    <lew-flex
      v-for="(item, index) in sortValue"
      :key="index"
      direction="y"
      x="start"
    >
      <lew-title :id="item.title" :size="18" class="demo-docs-title">{{
        item.title
      }}</lew-title>
      <lew-table
        :data-source="item.data"
        :columns="columnsMap[item.columnsKey]"
      />
    </lew-flex>
  </lew-flex>
</template>

<style lang="scss" scoped>
.demo-docs-title {
  text-transform: capitalize;
  letter-spacing: 0.8px;
}
</style>
