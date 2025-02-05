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
      width: 120,
      field: 'name'
    },
    {
      title: '描述',
      width: 200,
      field: 'description',
      customRender: ({ row }: any) => {
        const { name } = row
        return docsLocale.t(`components.${getComponentName()}.model.${name}`)
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
    },
    {
      title: '默认值',
      width: 120,
      field: 'default'
    }
  ],
  props: [
    {
      title: '参数名',
      width: 120,
      field: 'name'
    },
    {
      title: '描述',
      width: 200,
      field: 'description',
      customRender: ({ row }: any) => {
        const { name } = row
        return docsLocale.t(`components.${getComponentName()}.props.${name}`)
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
    },
    {
      title: '默认值',
      width: 120,
      field: 'default',
      customRender: ({ text, row }: any) => {
        const { name, defaultLocale } = row
        return defaultLocale
          ? docsLocale.t(`components.${getComponentName()}.default.${name}`)
          : text || '-'
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
      field: 'description',
      customRender: ({ row }: any) => {
        const { name } = row
        return docsLocale.t(`components.${getComponentName()}.slots.${name}`)
      }
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
      field: 'description',
      customRender: ({ row }: any) => {
        const { name } = row
        return docsLocale.t(`components.${getComponentName()}.events.${name}`)
      }
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
      field: 'description',
      customRender: ({ row }: any) => {
        const { name } = row
        return docsLocale.t(`components.${getComponentName()}.methods.${name}`)
      }
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
