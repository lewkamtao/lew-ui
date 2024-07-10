<script setup lang="ts">
import draggable from 'vuedraggable'
import { componentsOptions } from './compoments-options'
import dayjs from 'dayjs'
import SetOptionModal from './SetOptionModal.vue'
import PreviewModal from './PreviewModal.vue'
import { formatFormByMap } from 'lew-ui/utils'
import { cloneDeep } from 'lodash'
const dragOptions = computed(() => {
  return {
    animation: 200,
    disabled: false,
    chosenClass: 'chosen'
  }
})

const setOptionModalRef = ref()
const previewModalRef = ref()
const menuOptions = ref<any>(componentsOptions)
const options = ref<any>([])
const formMap = ref<Record<string, any>>({})
const itemRefMap = ref<Record<string, any>>({})
const formMainRef = ref()
const cols = ref(2)
const previewTab = ref('model')

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
  const date = dayjs().format('YYYYMMDD_HHmmss')
  const field = `field_${generateId()}`
  return {
    ...item,
    id: `${item.as}_${date}_${generateId()}`,
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
  item.spanMap[cols.value] -= 1
}

const maximize = (item: any) => {
  item.spanMap[cols.value] += 1
}

const preview = () => {
  if (options.value.length === 0) {
    LewMessage.warning('请先添加组件')
    return
  }
  const width = formMainRef.value.offsetWidth / cols.value
  options.value.forEach((item: any) => {
    const rowStart = Math.round(itemRefMap.value[item.id].offsetLeft / width) + 1
    const rowEnd = rowStart + item.spanMap[cols.value]
    item.gridArea = `auto  / ${rowStart} / auto  / ${rowEnd}`
  })
  const componentModel = {
    labelWidth: 110,
    direction: 'y',
    columns: cols.value,
    options: cloneDeep(options.value)
  }
  previewModalRef.value && previewModalRef.value.open(componentModel)
}

const changeDraggable = (e: any) => {
  const { added } = e
  if (added) {
    const { element } = e?.added || {}
    formMap.value[element.field] = element.as ? '' : undefined
  }
}
</script>

<template>
  <div class="playground">
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
    <div class="lew-form-wrapper">
      <lew-flex x="center" y="center" class="lew-form-select-cols">
        <lew-tabs size="large" width="auto" :options="colOptions" v-model="cols" />
      </lew-flex>
      <div ref="formMainRef" class="form-main" :style="{ 'max-width': `calc(320px * ${cols})` }">
        <draggable
          group="form"
          :class="{
            'lew-form-wrapper-draggable-empty': options.length === 0,
            'lew-form-wrapper-draggable-1': cols === 1,
            'lew-form-wrapper-draggable-2': cols === 2,
            'lew-form-wrapper-draggable-3': cols === 3,
            'lew-form-wrapper-draggable-4': cols === 4
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
              :style="{ 'grid-column-end': `span ${element.spanMap[cols]}` }"
            >
              <lew-flex x="end" y="center" class="handle-box">
                <lew-flex x="end" gap="5" y="center">
                  <lew-icon
                    v-if="element.spanMap[cols] > 1"
                    @click="minimize(element)"
                    class="handle-icon handle-resize"
                    size="14"
                    type="minimize-2"
                  ></lew-icon>
                  <lew-icon
                    v-if="element.spanMap[cols] < cols"
                    @click="maximize(element)"
                    class="handle-icon handle-resize"
                    size="14"
                    type="maximize-2"
                  ></lew-icon>
                  <lew-icon
                    v-if="element.as"
                    @click="setOptionModalRef.open(element)"
                    class="handle-icon"
                    size="14"
                    type="tool"
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
                placeholder="设置字段名"
                class="field"
              />
              <lew-form-item
                v-if="element.as"
                v-model="formMap[element.field]"
                v-bind="{ ...element, direction: 'y' }"
              />
              <lew-flex x="center" y="center" class="blank-box" v-else>占位盒子</lew-flex>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <lew-flex direction="y" x="start" y="start" class="lew-form-options lew-scrollbar">
      <lew-flex x="end" class="lew-form-options-btns">
        <lew-button type="light" icon="monitor" @click="preview"> 预览 </lew-button>
        <lew-flex x="end">
          <lew-button type="light" icon="code" @click="preview"> 源码 </lew-button>
          <lew-button type="light" icon="upload" @click="preview"> 预览 </lew-button>
        </lew-flex>
      </lew-flex>

      <lew-flex class="lew-form-preview-tabs">
        <lew-tabs
          v-model="previewTab"
          width="100%"
          item-width="172px"
          :options="[
            { label: '表单模型', value: 'model' },
            { label: '组件模型源码', value: 'options' }
          ]"
        />
      </lew-flex>
      <lew-flex x="start" y="start" class="lew-form-preview-content lew-scrollbar">
        <pre v-if="previewTab === 'model'">{{ formModel }}</pre>
        <pre v-else>{{ options }}</pre>
      </lew-flex>
    </lew-flex>
  </div>
  <preview-modal ref="previewModalRef" />
  <set-option-modal ref="setOptionModalRef" />
</template>
<style scoped lang="scss">
.playground {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: var(--lew-bgcolor-4);
  border: 1px #eee solid;
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

    .form-main {
      width: 100%;
      background-color: var(--lew-bgcolor-0);
    }
    .lew-form-select-cols {
      padding: 0px 12px;
      width: 100%;
      height: 60px;
      background-color: #fff;
      flex-shrink: 0;
      border-bottom: 1px solid var(--lew-bgcolor-3);
    }

    .lew-form-wrapper-draggable {
      display: grid;
      flex-shrink: 0;
      height: calc(100vh - 60px);
      overflow-y: auto;
      box-sizing: border-box;
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
    padding: 10px 10px 20px 10px;
    box-sizing: border-box;
    border: 2px dashed transparent;
    .handle-box {
      width: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
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
      right: 5px;
      bottom: 0px;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: right;
      color: var(--lew-color-blue-dark);
      font-size: 12px;
      border: none;
      outline: none;
      opacity: 1;
      border: 2px dashed transparent;
    }
  }
  .lew-form-wrapper-draggable-item:hover {
    border: 2px dashed var(--lew-color-blue-dark);
  }
  .blank-box {
    min-height: 63px;
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
    width: 400px;
    background-color: var(--lew-bgcolor-0);
    flex-shrink: 0;
    overflow-y: auto;
    .lew-form-options-btns {
      border-bottom: 1px solid var(--lew-bgcolor-3);
      height: 60px;
      padding: 0px 15px;
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

.chosen {
  border: 2px dashed var(--lew-color-blue-dark) !important;
}

.lew-form-preview-content {
  width: 100%;
  height: 500px;
  overflow: auto;
  pre {
    text-align: left;
  }
}
</style>
