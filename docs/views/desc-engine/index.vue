<script setup lang="ts">
import type { LewSize } from 'lew-ui/types'
import { useDark } from '@vueuse/core'
import dayjs from 'dayjs'
import { downloadObjectAsFile } from 'docs/lib/utils'
import { lewDescSizePaddingMap } from 'lew-ui'
import LewGetLabelWidth from 'lew-ui/components/form/form/src/LewGetLabelWidth.vue'
import { flattenNestedObject, formatFormByMap, getUniqueId } from 'lew-ui/utils'
import LewCommonIcon from 'lew-ui/utils/LewCommonIcon.vue'
import { cloneDeep, debounce, has } from 'lodash-es'
import { Monitor, Moon, Sun, Upload } from 'lucide-vue-next'
import draggable from 'vuedraggable'
import SetForm from '../form-engine/components/SetForm.vue'
import ImportModal from './components/ImportModal.vue'
import PreviewModal from './components/PreviewModal.vue'
import { baseSchema, globalSchema } from './schema'

const isDark = useDark({
  selector: 'html',
  valueDark: 'lew-dark',
  valueLight: 'lew-light',
})

const previewModalRef = ref()
const importModalRef = ref()
const options = ref<any>([
  {
    id: 'desc_20230201_1',
    label: '姓名',
    spanMap: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
    },
    field: 'name',
  },
  {
    id: 'desc_20230201_2',
    label: '年龄',
    spanMap: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
    },
    field: 'age',
  },
  {
    id: 'desc_20230201_3',
    label: '性别',
    spanMap: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
    },
    field: 'gender',
  },
])
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
  labelX: 'start',
  valueX: 'start',
  size: 'medium',
  bordered: 0,
})

const formWidth = computed(() => {
  return 320 * formGlobal.value.columns
})

const refreshForm = debounce(() => {
  nextTick(() => {
    if (formLabelRef.value) {
      const { bordered, size } = formGlobal.value
      autoLabelWidth.value
        = formLabelRef.value.$el.offsetWidth
          + (bordered
            ? lewDescSizePaddingMap[size as keyof typeof lewDescSizePaddingMap] * 2
            : 0)
    }
  })
  formatFormMap()
}, 100)

const formModel = computed(() => {
  return formatFormByMap(cloneDeep(formMap.value))
})

// 动态生成columns选项，支持1-12栏
const colOptions = computed(() => {
  const options = []
  const columnLabels = [
    '单栏',
    '两栏',
    '三栏',
    '四栏',
    '五栏',
    '六栏',
    '七栏',
    '八栏',
    '九栏',
    '十栏',
    '十一栏',
    '十二栏',
  ]

  for (let i = 1; i <= 12; i++) {
    options.push({
      label: columnLabels[i - 1] || `${i}栏`,
      value: i,
    })
  }

  return options
})

// 动态生成网格样式
const getDynamicGridStyle = computed(() => {
  const columns = formGlobal.value.columns
  return {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  }
})

// 确保spanMap包含当前columns的键
function ensureSpanMap(item: any) {
  const currentColumns = formGlobal.value.columns
  if (!item.spanMap) {
    item.spanMap = {}
  }

  // 确保spanMap有当前columns数的键
  for (let i = 1; i <= Math.max(currentColumns, 12); i++) {
    if (!item.spanMap[i]) {
      item.spanMap[i] = 1
    }
  }
}

// 当columns改变时，确保所有item的spanMap都有对应的键
function updateSpanMapsForColumns() {
  options.value.forEach((item: any) => {
    ensureSpanMap(item)
  })
}

// 监听columns变化，更新spanMap
watch(
  () => formGlobal.value.columns,
  () => {
    updateSpanMapsForColumns()
  },
)

function formatFormMap() {
  const _formMap: Record<string, any> = {}
  cloneDeep(options.value).forEach((item: any) => {
    if (!has(_formMap, item.field) && item.field) {
      _formMap[item.field] = ''
    }
  })
  formMap.value = _formMap
}

function minimize(item: any) {
  ensureSpanMap(item)
  if (item.spanMap[formGlobal.value.columns] > 1) {
    item.spanMap[formGlobal.value.columns] -= 1
  }
}

function maximize(item: any) {
  ensureSpanMap(item)
  if (item.spanMap[formGlobal.value.columns] < formGlobal.value.columns) {
    item.spanMap[formGlobal.value.columns] += 1
  }
}

function getModel() {
  if (options.value.length === 0) {
    LewMessage.warning('请先添加组件')
    return false
  }
  const width = formMainRef.value.offsetWidth / formGlobal.value.columns

  const _options = cloneDeep(options.value)
  _options.forEach((item: any) => {
    ensureSpanMap(item)
    const rowStart = Math.round(itemRefMap.value[item.id].offsetLeft / width) + 1
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
    id: `desc_${dayjs().format('YYYYMMDD')}_${getUniqueId()}`,
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

// 创建新字段的spanMap，支持更多columns
function createInitialSpanMap() {
  const spanMap: Record<number, number> = {}
  // 为1-12栏创建初始spanMap
  for (let i = 1; i <= 12; i++) {
    spanMap[i] = 1
  }
  return spanMap
}

function addField() {
  const field = `${getUniqueId()}`
  const newItem = {
    id: `desc_${dayjs().format('YYYYMMDD')}_${field}`,
    label: `字段 ${field}`,
    spanMap: createInitialSpanMap(),
    field,
  }
  options.value.push(cloneDeep(newItem))
}

function importField() {
  importModalRef.value.open()
}

function importFieldOptions(_options: any) {
  options.value = Object.keys(flattenNestedObject(_options)).map((key: string) => {
    return {
      id: `desc_${dayjs().format('YYYYMMDD')}_${key}`,
      label: _options[key],
      spanMap: createInitialSpanMap(),
      field: key,
    }
  })
}

onMounted(() => {
  // 初始化时确保所有item都有完整的spanMap
  updateSpanMapsForColumns()
  refreshForm()
})
</script>

<template>
  <div class="playground">
    <LewGetLabelWidth
      ref="formLabelRef"
      :size="formGlobal.size as LewSize"
      :options="options"
    />
    <div class="lew-form-wrapper" @click="(settingTab = 'options'), (activeId = '')">
      <lew-flex x="center" y="center" class="lew-form-select-columns">
        <lew-button class="add-btn" @click="addField">
          新增字段
        </lew-button>
        <lew-button class="import-btn" type="light" @click="importField">
          导入字段
        </lew-button>
        <lew-tabs
          v-model="formGlobal.columns"
          width="420px"
          item-width="80px"
          :options="colOptions"
        />
        <lew-button
          class="dark-btn"
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
          class="lew-form-wrapper-draggable lew-scrollbar"
          :class="{
            'lew-form-wrapper-draggable-empty': options.length === 0,
          }"
          :style="getDynamicGridStyle"
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
                'lew-form-wrapper-draggable-item-active': activeId === element.id,
              }"
              :style="{
                'grid-column-end': `span ${element.spanMap?.[formGlobal.columns] || 1}`,
                'padding': formGlobal.bordered ? 0 : `15px 13px 15px 13px`,
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
                  <LewCommonIcon
                    v-if="(element.spanMap?.[formGlobal.columns] || 1) > 1"
                    class="handle-icon handle-resize"
                    :size="14"
                    type="minimize-2"
                    @click="minimize(element)"
                  />
                  <LewCommonIcon
                    v-if="
                      (element.spanMap?.[formGlobal.columns] || 1) < formGlobal.columns
                    "
                    class="handle-icon handle-resize"
                    :size="14"
                    type="maximize-2"
                    @click="maximize(element)"
                  />
                  <LewCommonIcon
                    class="handle-icon"
                    :size="14"
                    type="trash"
                    @click="deleteItem(element)"
                  />
                </lew-flex>
              </lew-flex>
              <LewCommonIcon
                v-if="!element.field"
                v-tooltip="{
                  content: '未绑定字段',
                  trigger: 'mouseenter',
                }"
                class="tips-icon"
                :size="14"
                type="error"
              />
              <lew-desc-item
                v-bind="{
                  ...formGlobal,
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
          </lew-flex>
          <lew-flex v-if="activeId" direction="y" x="start" gap="0">
            <div class="title">
              基础属性
            </div>
            <SetForm
              v-model="
                options[options.findIndex((e: any) => e.id === activeId)]
              "
              :options="baseSchema"
            />
          </lew-flex>
        </div>
        <div v-show="settingTab === 'model'" class="lew-form-model pre-box">
          <highlightjs autodetect :code="JSON.stringify(formModel, null, 4)" />
        </div>
      </div>
    </lew-flex>
    <ImportModal ref="importModalRef" @import="importFieldOptions" />
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
      .add-btn {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
      }
      .import-btn {
        position: absolute;
        left: 110px;
        top: 50%;
        transform: translateY(-50%);
      }
      .dark-btn {
        position: absolute;
        right: 12px;
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
      // 移除固定的grid-template-columns类，改为动态样式
      align-content: start;
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
  }

  .lew-form-wrapper-draggable-empty::after {
    position: absolute;
    content: '请添加字段描述';
    top: 50%;
    left: 50%;
    opacity: 0.4;
    font-size: 18px;
    white-space: nowrap;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  // 移除固定的grid-template-columns样式类，改为动态样式
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
