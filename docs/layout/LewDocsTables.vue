<script setup lang="ts">
import allTypes from 'docs/assets/all-types'
import docsLocale from 'docs/locals'
import { LewFlex, LewPopover, LewTag, locale } from 'lew-ui'
import RequiredIcon from 'lew-ui/components/form/form/src/RequiredIcon.vue'
import LewTypeCode from './LewTypeCode.vue'

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {}
    },
  },
})

const route = useRoute()

function getComponentName() {
  const { path } = useRoute()
  return path
    .replace('/', '')
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, letter => letter.toLowerCase())
}

function getColumns({ columnsKey, title }: { columnsKey: string, title: string }) {
  let columns: any = [
    {
      title: 'Name',
      width: 150,
      field: 'name',
      customRender: ({ row }: any) => {
        const { name } = row
        return h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
            },
          },
          row.required
            ? [h(RequiredIcon, { size: 7, style: { marginRight: '2px' } }), name]
            : name,
        )
      },
    },
    {
      title: 'Description',
      width: ['emits', 'methods'].includes(columnsKey) ? 400 : 200,
      field: 'description',
      customRender: ({ row }: any) => {
        const { name } = row
        return docsLocale.t(
          `components.${getComponentName()}.${title.replace(/^[A-Z]/, match =>
            match.toLowerCase())}.${name}`,
        )
      },
    },
  ]

  if (columnsKey === 'emits') {
    columns = [
      ...columns,
      {
        title: 'Argument',
        width: 200,
        field: 'argument',
        customRender: ({ row }: any) => {
          const { argument } = row
          return argument
        },
      },
    ]
  }

  if (!['emits', 'methods', 'slots'].includes(columnsKey)) {
    columns = [
      ...columns,
      {
        title: 'Type',
        width: 200,
        field: 'type',
        customRender: ({ row }: any) => {
          const { typeValues, typeGhost, type, typePopKeys } = row
          if (typeGhost) {
            return h(
              LewTag,
              {
                type: 'light',
                size: 'small',
                color: 'pink',
              },
              {
                default: () => typeGhost,
              },
            )
          }
          else if ((typePopKeys || []).length > 0) {
            const tags = typePopKeys.map((key: string) => {
              const typeAlias = allTypes[key as keyof typeof allTypes]
              return h(
                LewPopover,
                {
                  trigger: 'click',
                },
                {
                  'trigger': () =>
                    h(
                      LewTag,
                      {
                        style: {
                          cursor: 'pointer',
                          textDecoration: 'underline dotted',
                        },
                        type: 'light',
                        size: 'small',
                        color: 'pink',
                      },
                      {
                        default: () => key,
                      },
                    ),
                  'popover-body': () => h(LewTypeCode, { code: typeAlias }),
                },
              )
            })
            return h(
              LewFlex,
              {
                x: 'start',
                y: 'center',
                gap: '5px',
                wrap: true,
              },
              {
                default: () => tags,
              },
            )
          }
          else {
            const _types
              = (typeValues || []).length > 0 ? typeValues : (type || '').split('|')
            const tags = (_types || []).map((text: any) => {
              return h(
                LewTag,
                {
                  type: 'light',
                  size: 'small',
                  color: 'cyan',
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
                gap: '5px',
                wrap: true,
              },
              {
                default: () => tags,
              },
            )
          }
        },
      },
      {
        title: 'Default',
        width: 100,
        field: 'default',
        customRender: ({ text, row }: any) => {
          const { name, defaultLocale } = row
          return defaultLocale ? locale.t(`${getComponentName()}.${name}`) : text || '-'
        },
      },
    ]
  }

  return columns
}

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
    <LewFlex v-for="(item, index) in sortValue" :key="index" direction="y" x="start">
      <lew-title :id="item.title" size="18px" class="demo-docs-title">
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
      <lew-table
        :key="`${item.title}_${docsLocale.t('name')}_${route.path} `"
        bordered
        :data-source="item.data"
        :columns="getColumns(item)"
      />
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
