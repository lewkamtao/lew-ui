<script setup lang="ts">
import type { LewSize } from 'lew-ui/types'
import { useDark } from '@vueuse/core'
import dayjs from 'dayjs'
import LewGetLabelWidth from 'lew-ui/components/form/src/LewGetLabelWidth.vue'
import { downloadObjectAsFile, getComponentIcon } from 'lew-ui/docs/lib/utils'
import { formatFormByMap, getUniqueId } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { cloneDeep, debounce, has } from 'lodash-es'
import { Monitor, Moon, Sun, Upload } from 'lucide-vue-next'
import draggable from 'vuedraggable'
import PreviewModal from './components/PreviewModal.vue'
import SetForm from './components/SetForm.vue'
import { baseSchema, componentsMenusSchema, globalSchema } from './schema'

const isDark = useDark({
  selector: 'html',
  valueDark: 'lew-dark',
  valueLight: 'lew-light',
})

const previewModalRef = ref()
const menuOptions = componentsMenusSchema
const options = ref<any>([])
const formMap = ref<Record<string, any>>({})
const itemRefMap = ref<Record<string, any>>({})
const formMainRef = ref()

const settingTab = ref('options')
const activeId = ref('')
const formLabelRef = ref()
const autoLabelWidth = ref(0)

const formGlobal = ref({
  direction: 'x',
  columns: 1,
  size: 'medium',
})

const formWidth = computed(() => {
  return formGlobal.value.direction === 'x'
    ? (320 + autoLabelWidth.value) * formGlobal.value.columns
    : 320 * formGlobal.value.columns
})

const refreshForm = debounce(() => {
  nextTick(() => {
    if (formLabelRef.value) {
      autoLabelWidth.value = formLabelRef.value.$el.offsetWidth
    }
  })
  formatFormMap()
}, 100)

const formModel = computed(() => {
  return formatFormByMap(cloneDeep(formMap.value))
})

const colOptions = ref([
  { label: '单栏', value: 1 },
  { label: '两栏', value: 2 },
  { label: '三栏', value: 3 },
  { label: '四栏', value: 4 },
])

function cloneDog(item: any) {
  return cloneDeep({
    ...item,
    id: `${item.as}_${dayjs().format('YYYYMMDD')}_${getUniqueId()}`,
    spanMap: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
    },
    field: `${getUniqueId()}`,
  })
}

function formatFormMap() {
  const _formMap: Record<string, any> = {}
  cloneDeep(options.value).forEach((item: any) => {
    if (!has(_formMap, item.field) && item.field) {
      _formMap[item.field] = item.fieldType
    }
  })
  formMap.value = _formMap
}

function minimize(item: any) {
  item.spanMap[formGlobal.value.columns] -= 1
}

function maximize(item: any) {
  item.spanMap[formGlobal.value.columns] += 1
}

function getModel() {
  if (options.value.length === 0) {
    LewMessage.warning('请先添加组件')
    return false
  }
  const width = formMainRef.value.offsetWidth / formGlobal.value.columns

  const _options = cloneDeep(options.value)
  _options.forEach((item: any) => {
    const rowStart
      = Math.round(itemRefMap.value[item.id].offsetLeft / width) + 1
    const rowEnd = rowStart + item.spanMap[formGlobal.value.columns]
    item.gridArea = `auto  / ${rowStart} / auto  / ${rowEnd}`
    delete item.spanMap
    delete item.fieldType
    delete item.schema
  })
  const componentModel = {
    ...formGlobal.value,
    columns: formGlobal.value.columns,
    width: formWidth.value,
    id: `form_${dayjs().format('YYYYMMDD')}_${getUniqueId()}`,
    options: _options,
  }
  return componentModel
}

watch(
  () => options.value,
  () => {
    refreshForm()
  },
  {
    deep: true,
  },
)
watch(
  () => formGlobal.value,
  () => {
    refreshForm()
  },
  {
    deep: true,
  },
)

function deleteItem(item: any) {
  LewDialog.error({
    title: '确认删除',
    content: '删除后无法恢复，请谨慎操作',
    cancelText: '手滑了',
    ok: () => {
      options.value = options.value.filter((e: any) => e.id !== item.id)
    },
  })
}

function exportFile() {
  const model = getModel()
  if (model) {
    downloadObjectAsFile(model, `${model.id}.json`)
  }
}

function preview() {
  const model = getModel()
  if (model) {
    previewModalRef.value && previewModalRef.value.open(model)
  }
}

const isInfo = localStorage.getItem('isAlertByFormEngine')
if (!isInfo) {
  LewDialog.warning({
    title: '温馨提示',
    content:
      '当前表单引擎仍处于开发测试状态，请勿用于生产环境，当前配置项仍未完善，持续更新中，敬请期待。',
    cancelText: '',
    okText: '知道了',
    ok: () => {
      localStorage.setItem('isAlertByFormEngine', '1')
    },
  })
}

function addComponent(item: any) {
  options.value.push(
    cloneDeep({
      ...item,
      id: `${item.as}_${dayjs().format('YYYYMMDD')}_${getUniqueId()}`,
      spanMap: {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
      },
      field: `${getUniqueId()}`,
    }),
  )
}
</script>

<template>
  <div class="playground">
    <LewGetLabelWidth
      ref="formLabelRef"
      :size="formGlobal.size as LewSize"
      :options="options"
    />
    <div class="lew-form-component lew-scrollbar">
      <draggable
        :group="{ name: 'form', pull: 'clone', put: false }"
        :sort="false"
        class="lew-form-component-draggable"
        :list="menuOptions"
        :clone="cloneDog"
        item-key="field"
        v-bind="{
          animation: 200,
          chosenClass: 'chosen',
        }"
      >
        <template #item="{ element }">
          <lew-flex
            x="center"
            direction="y"
            gap="5"
            class="lew-form-component-box"
            @click="addComponent(element)"
          >
            <img
              :src="getComponentIcon(element.as || 'blank')"
              alt=""
              srcset=""
            >
            {{ element.label }}
          </lew-flex>
        </template>
      </draggable>
    </div>
    <div
      class="lew-form-wrapper"
      @click="(settingTab = 'options'), (activeId = '')"
    >
      <lew-flex x="center" y="center" class="lew-form-select-columns">
        <lew-tabs
          v-model="formGlobal.columns"
          width="320px"
          item-width="auto"
          :options="colOptions"
        />
        <lew-button
          class="set-theme-btn"
          type="light"
          color="gray"
          size="small"
          round
          single-icon
          @click="isDark = !isDark"
        >
          <Sun v-if="!isDark" :size="16" />
          <Moon v-else :size="16" />
        </lew-button>
      </lew-flex>
      <div
        ref="formMainRef"
        class="form-main"
        :style="{
          'max-width': `${formWidth + 40}px`,
        }"
      >
        <draggable
          v-model="options"
          group="form"
          :class="{
            'lew-form-wrapper-draggable-empty': options.length === 0,
            'lew-form-wrapper-draggable-1': formGlobal.columns === 1,
            'lew-form-wrapper-draggable-2': formGlobal.columns === 2,
            'lew-form-wrapper-draggable-3': formGlobal.columns === 3,
            'lew-form-wrapper-draggable-4': formGlobal.columns === 4,
          }"
          class="lew-form-wrapper-draggable lew-scrollbar"
          item-key="id"
          v-bind="{
            animation: 200,
            chosenClass: 'chosen',
          }"
        >
          <template #item="{ element }">
            <div
              :ref="(el) => (itemRefMap[element.id] = el)"
              class="lew-form-wrapper-draggable-item"
              :class="{
                'lew-form-wrapper-draggable-item-active':
                  activeId === element.id,
              }"
              :style="{
                'grid-column-end': `span ${
                  element.spanMap[formGlobal.columns]
                }`,
              }"
              @click.stop="
                activeId === element.id || element.as === ''
                  ? (activeId = '')
                  : (activeId = element.id),
                (settingTab = 'options')
              "
            >
              <lew-flex x="end" y="center" class="handle-box">
                <lew-flex x="end" gap="5" y="center">
                  <Icon
                    v-if="element.spanMap[formGlobal.columns] > 1"
                    class="handle-icon handle-resize"
                    :size="14"
                    type="minimize-2"
                    @click="minimize(element)"
                  />
                  <Icon
                    v-if="
                      element.spanMap[formGlobal.columns] < formGlobal.columns
                    "
                    class="handle-icon handle-resize"
                    :size="14"
                    type="maximize-2"
                    @click="maximize(element)"
                  />
                  <Icon
                    class="handle-icon"
                    :size="14"
                    type="trash"
                    @click="deleteItem(element)"
                  />
                </lew-flex>
              </lew-flex>
              <Icon
                v-if="!element.field"
                v-tooltip="{
                  content: '未绑定字段',
                  trigger: 'mouseenter',
                }"
                class="tips-icon"
                :size="14"
                type="error"
              />
              <lew-flex
                v-if="element.as === ''"
                x="center"
                y="center"
                class="blank-box"
              >
                占位盒子
              </lew-flex>
              <lew-form-item
                v-else
                v-bind="{
                  size: formGlobal.size,
                  direction: formGlobal.direction,
                  labelWidth: autoLabelWidth,
                  ...element,
                }"
                readonly
              />
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <lew-flex
      direction="y"
      gap="0"
      x="start"
      y="start"
      class="lew-form-options lew-scrollbar"
    >
      <lew-flex x="end" class="lew-form-options-btns">
        <lew-button @click="preview">
          <Monitor :size="16" />
          预览
        </lew-button>
        <lew-flex x="end">
          <lew-button type="light" @click="exportFile">
            导出配置 <Upload :size="16" />
          </lew-button>
        </lew-flex>
      </lew-flex>
      <lew-flex class="lew-form-setting-tabs">
        <lew-tabs
          v-model="settingTab"
          width="100%"
          item-width="auto"
          :options="[
            { label: '属性', value: 'options' },
            { label: '模型', value: 'model' },
          ]"
        />
      </lew-flex>
      <div class="lew-form-options-main lew-scrollbar">
        <div v-show="settingTab === 'options'" class="lew-form-options-panel">
          <lew-flex direction="y" gap="0">
            <lew-flex direction="y" x="start" gap="0">
              <div class="title">
                全局属性
              </div>
              <SetForm v-model="formGlobal" :options="globalSchema" />
            </lew-flex>
            <lew-flex v-if="activeId" direction="y" x="start" gap="0">
              <div class="title">
                基础属性
              </div>
              <SetForm
                v-model="
                  options[options.findIndex((e: any) => e.id === activeId)]
                "
                :collapse-height="200"
                :options="baseSchema"
              />
            </lew-flex>
            <lew-flex
              v-if="
                activeId
                  && options.findIndex((e: any) => e.id === activeId) >= 0
                  && options[options.findIndex((e: any) => e.id === activeId)].as
                    !== ''
              "
              direction="y"
              x="start"
              gap="0"
            >
              <lew-flex class="title" mode="between">
                <span>组件属性</span>
              </lew-flex>
              <SetForm
                v-if="
                  (
                    options[options.findIndex((e: any) => e.id === activeId)]
                      ?.schema || []
                  ).length > 0
                "
                :key="activeId"
                v-model="
                  options[options.findIndex((e: any) => e.id === activeId)]
                    .props
                "
                :options="
                  options[options.findIndex((e: any) => e.id === activeId)]
                    .schema
                "
              />
              <lew-flex v-else>
                <lew-empty title="开发中，敬请期待" />
              </lew-flex>
            </lew-flex>
          </lew-flex>
        </div>
        <div v-show="settingTab === 'model'" class="lew-form-model pre-box">
          <highlightjs autodetect :code="JSON.stringify(formModel, null, 4)" />
        </div>
      </div>
    </lew-flex>
    <PreviewModal ref="previewModalRef" />
  </div>
</template>

<style scoped lang="scss">
.playground {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: var(--lew-bgcolor-4);

  .lew-form-component {
    padding: 10px;
    width: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--lew-bgcolor-0);
    flex-shrink: 0;
    user-select: none;
    box-sizing: border-box;
  }

  .lew-form-component-draggable {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .lew-form-component-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% / 3 - 7px);
      border: var(--lew-form-border-width) dashed transparent;
      box-sizing: border-box;
      cursor: move;
      font-size: 12px;
      color: var(--lew-text-color-5);

      img {
        width: 100%;
        height: auto;
        background-color: var(--lew-bgcolor-2);
        border-radius: var(--lew-border-radius-small);
        transition: all 0.15s;
      }
    }

    .lew-form-component-box:hover {
      img {
        background-color: var(--lew-bgcolor-4);
      }
    }

    .lew-form-component-box:active {
      img {
        transform: scale(0.9);
      }
    }
  }

  .lew-form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: var(--lew-bgcolor-0);
    height: 100vh;
    box-sizing: border-box;
    border-left: 1px solid var(--lew-bgcolor-3);
    border-right: 1px solid var(--lew-bgcolor-3);
    background-color: var(--lew-bgcolor-2);
    user-select: none;

    .form-main {
      width: 100%;
      background-color: var(--lew-bgcolor-0);
      transition: all 0.25s;
    }

    .lew-form-select-columns {
      position: relative;
      padding: 0px 12px;
      width: 100%;
      height: 60px;
      background-color: var(--lew-bgcolor-0);
      flex-shrink: 0;
      border-bottom: 1px solid var(--lew-bgcolor-3);

      .set-theme-btn {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .lew-form-wrapper-draggable {
      display: grid;
      flex-shrink: 0;
      height: calc(100vh - 60px);
      overflow-y: auto;
      box-sizing: border-box;
      padding: 5px;
    }

    .lew-form-component-box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      min-height: 70px;
      background-color: var(--lew-bgcolor-0);
      box-sizing: border-box;
      border: var(--lew-form-border-width) dashed transparent;

      img {
        height: 40px;
        width: auto;
      }
    }
  }

  .lew-form-wrapper-draggable-item {
    position: relative;
    padding: 15px 13px 15px 13px;
    box-sizing: border-box;
    border: var(--lew-form-border-width) dashed transparent;
    cursor: pointer;

    .tips-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: var(--lew-color-error-dark);
      z-index: 9;
    }

    .handle-box {
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 0px 5px;
      z-index: 9;

      .handle-icon {
        transition: all 0.2s;
        opacity: 0;
        cursor: pointer;
        padding: 5px;
        transform: scale(1);
      }

      .handle-icon:hover {
        transform: scale(1.1);
      }

      .handle-icon:active {
        transform: scale(0.95);
        opacity: 0;
      }

      .handle-resize {
        transform: rotate(45deg);
      }

      .handle-resize:hover {
        transform: scale(1.1) rotate(45deg);
      }

      .handle-resize:active {
        transform: scale(0.95) rotate(45deg);
      }
    }

    .field {
      position: absolute;
      right: 13px;
      bottom: 0px;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: right;
      color: var(--lew-color-gray);
      font-size: 12px;
      border: none;
      outline: none;
      opacity: 1;
      border: var(--lew-form-border-width) dashed transparent;
      background-color: transparent;
    }
  }

  .lew-form-wrapper-draggable-item:hover {
    border: var(--lew-form-border-width) dashed var(--lew-bgcolor-5);
  }

  .lew-form-wrapper-draggable-item-active {
    border: var(--lew-form-border-width) dashed var(--lew-color-blue-dark) !important;
  }

  .blank-box {
    height: 100%;
    opacity: 0.4;
    font-size: 16px;
  }

  .lew-form-wrapper-draggable-item:hover {
    .handle-icon {
      opacity: 0.4;
    }

    .handle-icon:hover {
      opacity: 1;
    }
  }

  .lew-form-options {
    width: 350px;
    background-color: var(--lew-bgcolor-0);
    flex-shrink: 0;
    overflow-y: auto;

    .lew-form-options-btns {
      border-bottom: 1px solid var(--lew-bgcolor-3);
      height: 60px;
      flex-shrink: 0;
      padding: 0px 15px;
      background-color: var(--lew-bgcolor-0);
    }
  }

  .lew-form-wrapper-draggable {
    position: relative;
    align-content: start;
  }

  .lew-form-wrapper-draggable-empty::after {
    position: absolute;
    content: "从左侧拖动组件到当前区域";
    top: 50%;
    left: 50%;
    opacity: 0.4;
    font-size: 18px;
    white-space: nowrap;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  .lew-form-wrapper-draggable-1 {
    grid-template-columns: minmax(0, 1fr);
  }

  .lew-form-wrapper-draggable-2 {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .lew-form-wrapper-draggable-3 {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  }

  .lew-form-wrapper-draggable-4 {
    grid-template-columns:
      minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)
      minmax(0, 1fr);
  }
}

.lew-form-options-main {
  width: 100%;
  height: calc(100vh - 60px - 60px);
  overflow-y: scroll;
  overflow-x: hidden;
}

.chosen {
  border: var(--lew-form-border-width) dashed var(--lew-color-blue-dark) !important;
}

.lew-form-setting-tabs {
  padding: 15px;
  flex-shrink: 0;
  background-color: var(--lew-bgcolor-0);
}

.lew-form-options-panel {
  width: 100%;
  box-sizing: border-box;

  .title {
    width: 100%;
    padding: 10px 15px;
    background-color: var(--lew-bgcolor-1);
    border-bottom: 1px solid var(--lew-bgcolor-3);
    border-top: 1px solid var(--lew-bgcolor-3);
    font-size: 14px;
    font-weight: bold;

    .component-name {
      font-weight: normal;
      color: var(--lew-text-color-7);
    }
  }
}

.lew-form-model {
  width: 100%;
  border-top: 1px solid var(--lew-bgcolor-3);
  border-bottom: 1px solid var(--lew-bgcolor-3);
}
</style>
