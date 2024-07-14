<script setup lang="ts">
import draggable from 'vuedraggable'
import { componentsOptions } from './options/compoments'
import dayjs from 'dayjs'
import PreviewModal from './components/PreviewModal.vue'
import { formatFormByMap } from 'lew-ui/utils'
import { downloadObjectAsFile } from 'lew-ui/docs/lib/utils'
import { cloneDeep } from 'lodash'
import { useDark } from '@vueuse/core'
import SetForm from './components/SetForm.vue'
import globalOptions from './options/global.json'
import LewGetLabelWidth from 'lew-ui/components/form/src/LewGetLabelWidth.vue'

const isDark = useDark({
  selector: 'html',
  valueDark: 'lew-dark',
  valueLight: 'lew-light'
})

const dragOptions = computed(() => {
  return {
    animation: 200,
    disabled: false,
    chosenClass: 'chosen'
  }
})

const previewModalRef = ref()
const menuOptions = ref<any>(componentsOptions)
const options = ref<any>([])
const formMap = ref<Record<string, any>>({})
const itemRefMap = ref<Record<string, any>>({})
const formMainRef = ref()

const settingTab = ref('global')
const activedId = ref('')
const formLabelRef = ref()
const autoLabelWidth = ref(0)
const formGlobal = ref({
  direction: 'y',
  columns: 2,
  size: 'medium'
})

const formWidth = computed(() => {
  return formGlobal.value.direction === 'x'
    ? (350 + autoLabelWidth.value) * formGlobal.value.columns
    : 350 * formGlobal.value.columns
})

const setLabelWidth = () => {
  nextTick(() => {
    if (formLabelRef.value) {
      autoLabelWidth.value = formLabelRef.value.$el.offsetWidth
      console.log(autoLabelWidth.value)
    }
  })
}

const formModel = computed(() => {
  return formatFormByMap(cloneDeep(formMap.value))
})

const colOptions = ref([
  { label: '单栏', value: 1 },
  { label: '两栏', value: 2 },
  { label: '三栏', value: 3 },
  { label: '四栏', value: 4 }
])

const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

const cloneDog = (item: any) => {
  const field = `field_${generateId()}`
  return {
    ...item,
    id: `${item.as}_${dayjs().format('YYYYMMDD_HHmmss')}_${generateId()}`,
    spanMap: {
      1: 1,
      2: 1,
      3: 1,
      4: 1
    },
    field: item.as ? field : undefined
  }
}

const deleteItem = (item: any) => {
  LewDialog.error({
    title: '确认删除',
    content: '确认删除该组件吗？',
    ok: () => {
      options.value = options.value.filter((e: any) => e.id !== item.id)
      formatFormMap({ target: { value: item.field } })
    }
  })
}

const formatFormMap = (e: any) => {
  formMap.value[e.target.value] = ''
  Object.keys(formMap.value).forEach((key) => {
    if (options.value.findIndex((e: any) => e.field === key) === -1) {
      delete formMap.value[key]
    }
  })
}

const minimize = (item: any) => {
  item.spanMap[formGlobal.value.columns] -= 1
}

const maximize = (item: any) => {
  item.spanMap[formGlobal.value.columns] += 1
}

const getModel = () => {
  if (options.value.length === 0) {
    LewMessage.warning('请先添加组件')
    return false
  }
  const width = formMainRef.value.offsetWidth / formGlobal.value.columns

  const _options = cloneDeep(options.value)
  _options.forEach((item: any) => {
    const rowStart = Math.round(itemRefMap.value[item.id].offsetLeft / width) + 1
    const rowEnd = rowStart + item.spanMap[formGlobal.value.columns]
    item.gridArea = `auto  / ${rowStart} / auto  / ${rowEnd}`
    delete item.spanMap
  })
  const componentModel = {
    ...formGlobal.value,
    columns: formGlobal.value.columns,
    maxWidth: formWidth.value,
    id: `form_${dayjs().format('YYYYMMDD_HHmmss')}_${generateId()}`,
    options: _options
  }
  return componentModel
}

const preview = () => {
  const model = getModel()
  if (model) {
    previewModalRef.value && previewModalRef.value.open(model)
  }
}

const exportFile = () => {
  const model = getModel()
  if (model) {
    downloadObjectAsFile(model, `${model.id}.json`)
  }
}

const changeDraggable = (e: any) => {
  const { added } = e
  if (added) {
    const { element } = e?.added || {}
    formMap.value[element.field] = element.as ? '' : undefined
  }
  setLabelWidth()
}
</script>

<template>
  <div class="playground">
    <LewGetLabelWidth ref="formLabelRef" :size="formGlobal.size" :options="options" />
    <div class="lew-form-component lew-scrollbar">
      <draggable
        :group="{ name: 'form', pull: 'clone', put: false }"
        :class="['lew-form-component-draggable']"
        v-model="menuOptions"
        :clone="cloneDog"
        item-key="field"
        v-bind="dragOptions"
      >
        <template #item="{ element }">
          <div class="lew-form-component-box">
            {{ element.label }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="lew-form-wrapper" @click="(settingTab = 'global'), (activedId = '')">
      <lew-flex x="center" y="center" class="lew-form-select-columns">
        <lew-tabs
          width="320px"
          item-width="auto"
          :options="colOptions"
          v-model="formGlobal.columns"
        />
        <lew-button
          class="set-theme-btn"
          round
          color="gray"
          type="light"
          :icon="isDark ? 'moon' : 'sun'"
          @click="isDark = !isDark"
        />
      </lew-flex>
      <div
        ref="formMainRef"
        class="form-main"
        :style="{
          'max-width': `${formWidth}px`
        }"
      >
        <draggable
          group="form"
          :class="{
            'lew-form-wrapper-draggable-empty': options.length === 0,
            'lew-form-wrapper-draggable-1': formGlobal.columns === 1,
            'lew-form-wrapper-draggable-2': formGlobal.columns === 2,
            'lew-form-wrapper-draggable-3': formGlobal.columns === 3,
            'lew-form-wrapper-draggable-4': formGlobal.columns === 4
          }"
          class="lew-form-wrapper-draggable lew-scrollbar"
          v-model="options"
          item-key="id"
          v-bind="dragOptions"
          @change="changeDraggable"
        >
          <template #item="{ element }">
            <div
              :ref="(el) => (itemRefMap[element.id] = el)"
              class="lew-form-wrapper-draggable-item"
              :class="{ 'lew-form-wrapper-draggable-item-actived': activedId === element.id }"
              @click.stop="
                activedId === element.id ? (activedId = '') : (activedId = element.id),
                  (settingTab = 'options')
              "
              :style="{ 'grid-column-end': `span ${element.spanMap[formGlobal.columns]}` }"
            >
              <lew-flex x="end" y="center" class="handle-box">
                <lew-flex x="end" gap="5" y="center">
                  <lew-icon
                    v-if="element.spanMap[formGlobal.columns] > 1"
                    @click="minimize(element)"
                    class="handle-icon handle-resize"
                    size="14"
                    type="minimize-2"
                  ></lew-icon>
                  <lew-icon
                    v-if="element.spanMap[formGlobal.columns] < formGlobal.columns"
                    @click="maximize(element)"
                    class="handle-icon handle-resize"
                    size="14"
                    type="maximize-2"
                  ></lew-icon>
                  <lew-icon
                    @click="deleteItem(element)"
                    class="handle-icon"
                    size="14"
                    type="trash"
                  ></lew-icon>
                </lew-flex>
              </lew-flex>

              <input
                v-if="element.as"
                v-model="element.field"
                @change="formatFormMap"
                @click.stop
                placeholder="设置字段名"
                class="field"
              />
              <lew-form-item
                v-if="element.as"
                v-model="formMap[element.field]"
                v-bind="{
                  ...element,
                  size: formGlobal.size,
                  direction: formGlobal.direction,
                  labelWidth: autoLabelWidth,
                  readonly: true
                }"
              />
              <lew-flex x="center" y="center" class="blank-box" v-else>占位盒子</lew-flex>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <lew-flex direction="y" gap="0" x="start" y="start" class="lew-form-options lew-scrollbar">
      <lew-flex x="end" class="lew-form-options-btns">
        <lew-button icon="monitor" @click="preview"> 预览 </lew-button>
        <lew-flex x="end">
          <lew-button type="light" icon="upload" @click="exportFile"> 导出配置文件 </lew-button>
        </lew-flex>
      </lew-flex>
      <lew-flex class="lew-form-setting-tabs">
        <lew-tabs
          v-model="settingTab"
          width="100%"
          item-width="auto"
          :options="[
            { label: '全局属性', value: 'global' },
            { label: '组件属性', value: 'options' },
            { label: '表单模型', value: 'model' }
          ]"
        />
      </lew-flex>
      <div class="lew-form-options-main lew-scrollbar">
        <div v-show="settingTab === 'global'" class="lew-form-global-panel">
          <set-form v-model="formGlobal" :options="globalOptions"></set-form>
        </div>
        <div v-show="settingTab === 'options'">
          <lew-empty width="100%" type="order" title="未选择组件" />
        </div>
        <div v-show="settingTab === 'model'" class="lew-form-model pre-box">
          <highlightjs autodetect :code="JSON.stringify(formModel, null, 4)" />
        </div>
      </div>
    </lew-flex>
  </div>
  <preview-modal ref="previewModalRef" />
</template>
<style scoped lang="scss">
.playground {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: var(--lew-bgcolor-4);

  .lew-form-component {
    padding: 15px;
    width: 180px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--lew-bgcolor-0);
    flex-shrink: 0;
    user-select: none;
  }
  .lew-form-component-draggable {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    .lew-form-component-box {
      display: flex;
      align-items: center;
      width: 180px;
      height: 50px;
      padding: 0px 20px;
      background-color: var(--lew-bgcolor-2);
      border-radius: var(--lew-border-radius-small);
      border: 2px dashed transparent;
      cursor: move;
    }
    .lew-form-component-box:hover {
      background-color: var(--lew-bgcolor-4);
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
      min-height: 120px;
      background-color: var(--lew-bgcolor-0);
      box-sizing: border-box;
      border: 2px dashed transparent;
    }
  }
  .lew-form-wrapper-draggable-item {
    position: relative;
    padding: 10px 13px 20px 13px;
    box-sizing: border-box;
    border: 2px dashed transparent;
    cursor: pointer;
    .handle-box {
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 0px 5px;
      z-index: 9;
      .handle-icon {
        transition: opacity 0.1s ease-in-out;
        opacity: 0;
        cursor: pointer;
        padding: 5px;
      }
      .handle-resize {
        transform: rotate(45deg);
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
      border: 2px dashed transparent;
      background-color: transparent;
    }
  }
  .lew-form-wrapper-draggable-item-actived {
    border: 2px dashed var(--lew-color-blue-dark);
  }
  .blank-box {
    min-height: 63px;
    height: 100%;
    opacity: 0.4;
    font-size: 16px;
    margin-top: 5px;
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
    content: '从左侧拖动组件到当前区域';
    top: 50%;
    left: 50%;
    opacity: 0.4;
    font-size: 24px;
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
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  }
}

.lew-form-options-main {
  width: 100%;
  height: calc(100vh - 60px - 60px);
  overflow-y: auto;
  overflow-x: hidden;
}

.chosen {
  border: 2px dashed var(--lew-color-blue-dark) !important;
}

.lew-form-setting-tabs {
  padding: 15px;
  flex-shrink: 0;
  background-color: var(--lew-bgcolor-0);
  border-bottom: 1px solid var(--lew-bgcolor-3);
}
.lew-form-global-panel {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.lew-form-model {
  width: 100%;
}
</style>
