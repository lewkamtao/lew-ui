<script setup lang="ts">
import draggable from 'vuedraggable'
import { componentsOptions } from './compoments-options'
import dayjs from 'dayjs'
import SetOptionModal from './SetOptionModal.vue'
import { formatFormByMap } from 'lew-ui/utils'
import { cloneDeep } from 'lodash'
const dragOptions = computed(() => {
  return {
    animation: 200,
    disabled: false,
    chosenClass: 'chosen'
  }
})

const setOptionModal = ref()
const menuOptions = ref<any>(componentsOptions)
const options = ref<any>([])
const formMap = ref<Record<string, any>>({})

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
  formMap.value[field] = ''
  return {
    ...item,
    id: `${item.as}_${date}_${generateId()}`,
    field
  }
}

const deleteItem = (item: any) => {
  LewDialog.error({
    title: '确认删除',
    content: '确认删除该组件吗？',
    ok: () => {
      options.value = options.value.filter((e: any) => e.id !== item.id)
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

const cols = ref(2)

const previewTab = ref('model')
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
    <div class="lew-form-wrapper" :class="`lew-form-wrapper-${cols}`">
      <lew-flex x="center" y="center" class="lew-form-select-cols">
        <lew-tabs size="large" width="auto" :options="colOptions" round v-model="cols" />
      </lew-flex>
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
        handle=".handle-move"
        v-model="options"
        item-key="id"
        v-bind="dragOptions"
      >
        <template #item="{ element }">
          <div
            class="lew-form-wrapper-draggable-item"
            :style="{ 'grid-column-end': `span ${element.span}` }"
          >
            <lew-icon class="handle handle-move" size="14" type="move"></lew-icon>
            <lew-icon
              @click="setOptionModal.open(element)"
              class="handle handle-tool"
              size="14"
              type="tool"
            ></lew-icon>
            <lew-icon
              @click="deleteItem(element)"
              class="handle handle-trash"
              size="14"
              type="trash"
            ></lew-icon>
            <input
              v-model="element.field"
              @change="formatFormMap"
              placeholder="设置字段名"
              class="field"
            />
            <lew-form-item
              v-model="formMap[element.field]"
              v-bind="{ ...element, direction: 'y' }"
            />
          </div>
        </template>
      </draggable>
    </div>
    <lew-flex direction="y" x="start" y="start" class="lew-form-options lew-scrollbar">
      <lew-flex class="lew-form-preview-tabs">
        <lew-tabs
          v-model="previewTab"
          width="100%"
          item-width="172px"
          :options="[
            { label: '表单数据', value: 'model' },
            { label: '组件数据', value: 'options' }
          ]"
        />
      </lew-flex>
      <lew-flex x="start" class="lew-form-preview-content">
        <pre v-if="previewTab === 'model'">{{ formModel }}</pre>
        <pre v-else>{{ options }}</pre>
      </lew-flex>
    </lew-flex>
  </div>

  <set-option-modal ref="setOptionModal" />
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
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 50px;
      background-color: var(--lew-bgcolor-2);
      border-radius: var(--lew-border-radius-small);
      border: 2px solid transparent;
      cursor: move;
    }
  }
  .lew-form-wrapper {
    display: flex;
    flex-direction: column;
    width: calc(100% - 350px - 500px);
    min-width: 400px;
    background-color: var(--lew-bgcolor-2);
    height: 100vh;
    box-sizing: border-box;
    border-left: 1px solid var(--lew-bgcolor-3);
    border-right: 1px solid var(--lew-bgcolor-3);
    .lew-form-select-cols {
      padding: 0px 20px;
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
      padding: 5px;
      box-sizing: border-box;
      gap: 5px;
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
    padding: 20px 20px 30px 20px;
    min-height: 120px;
    background-color: var(--lew-bgcolor-0);
    box-sizing: border-box;
    border: 2px dashed transparent;
    .handle {
      position: absolute;
      top: 0px;
      opacity: 0;
      transition: opacity 0.1s ease-in-out;
      cursor: pointer;
      padding: 5px;
    }
    .handle-move {
      left: 0px;
      cursor: move;
    }
    .handle-tool {
      right: 30px;
    }
    .handle-trash {
      right: 0px;
    }
    .field {
      position: absolute;
      right: 5px;
      bottom: 0px;
      width: calc(100% - 100px);
	  overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: right;
      color: var(--lew-color-blue-dark);
      font-size: 14px;
      border: none;
      outline: none;
    }
  }
  .lew-form-wrapper-draggable-item:hover {
    .handle {
      opacity: 0.4;
    }
    .handle:hover {
      opacity: 1;
    }
  }
  .lew-form-options {
    padding: 20px;
    width: 400px;
    background-color: var(--lew-bgcolor-0);
    flex-shrink: 0;
    overflow-y: auto;
  }

  .lew-form-wrapper-1 {
    width: 500px;
  }

  .lew-form-wrapper-2 {
    width: 800px;
  }

  .lew-form-wrapper-3 {
    width: 1200px;
  }

  .lew-form-wrapper-4 {
    width: 1400px;
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
  border: 2px dashed #333 !important;
}

.lew-form-preview-content {
  width: 100%;
  pre {
    text-align: left;
  }
}
</style>
