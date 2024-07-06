<script setup lang="ts">
import draggable from 'vuedraggable'
const dragOptions = computed(() => {
  return {
    animation: 200,
    disabled: false,
    chosenClass: 'chosen'
  }
})

const componentOptions = ref<any>([
  {
    label: '表单大小',
    as: 'tabs',
    field: 'size',
    props: {
      itemWidth: 'auto',
      width: 'auto',
      options: [
        {
          label: 'small',
          value: 'small'
        },
        {
          label: 'medium',
          value: 'medium'
        },
        {
          label: 'large',
          value: 'large'
        }
      ]
    }
  },
  {
    label: '文本框', // 标签
    as: 'input', // 组件
    props: {
      // 组件props
      showCount: true,
      maxLength: 30
    }
  },
  {
    label: '多行文本框', // 标签
    as: 'textarea', // 组件
    span: 2,
    props: {
      clearable: true,
      showCount: true,
      maxLength: 300
    }
  },
  {
    label: '单选选择器',
    as: 'select',
    props: {
      clearable: true,
      options: [
        {
          label: '广东',
          value: '1'
        },
        {
          label: '深圳',
          value: '2'
        },
        {
          label: '杭州',
          value: '3'
        },
        {
          label: '上海',
          value: '4'
        },
        {
          label: '北京',
          value: '5'
        }
      ]
    }
  },
  {
    field: 'select_multiple',
    label: '多选选择器',
    as: 'select-multiple',
    props: {
      change: (e: any) => {
        console.log(e)
      },
      clearable: true,
      options: [
        {
          label: '广东',
          value: '1'
        },
        {
          label: '深圳',
          value: '2'
        },
        {
          label: '杭州',
          value: '3'
        },
        {
          label: '上海',
          value: '4'
        },
        {
          label: '北京',
          value: '5'
        }
      ]
    }
  },
  {
    label: '单选框',
    as: 'radio-group',
    props: {
      options: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        },
        {
          label: '不公开',
          value: '3'
        }
      ]
    }
  },
  {
    label: '多选框',
    as: 'checkbox-group',
    props: {
      round: true,
      block: true,
      options: [
        {
          label: '唱歌',
          value: '1'
        },
        {
          label: '跳舞',
          value: '2'
        },
        {
          label: 'Rap',
          value: '3'
        },
        {
          label: '上海',
          value: '4'
        }
      ]
    }
  },
  {
    label: '选项卡',
    as: 'tabs',
    props: {
      width: '100%',
      options: [
        {
          label: 'Beijing',
          value: '1'
        },
        {
          label: 'Shanghai',
          value: '2'
        },
        {
          label: 'Guangzhou',
          value: '3'
        }
      ]
    }
  },
  {
    label: '地址',
    as: 'cascader',
    props: {
      label: '是否同意',
      free: true,
      options: [
        {
          value: 1,
          label: 'Asia',
          children: [
            {
              value: 2,
              label: 'China',
              children: [
                { value: 3, label: 'Beijing' },
                { value: 4, label: 'Shanghai' },
                { value: 5, label: 'Hangzhou' }
              ]
            },
            {
              value: 6,
              label: 'Japan',
              children: [
                { value: 7, label: 'Tokyo' },
                { value: 8, label: 'Osaka' },
                { value: 9, label: 'Kyoto' }
              ]
            },
            {
              value: 10,
              label: 'Korea',
              children: [
                { value: 11, label: 'Seoul' },
                { value: 12, label: 'Busan' },
                { value: 13, label: 'Taegu' }
              ]
            }
          ]
        },
        {
          value: 14,
          label: 'Europe',
          children: [
            {
              value: 15,
              label: 'France',
              children: [
                { value: 16, label: 'Paris' },
                { value: 17, label: 'Marseille' },
                { value: 18, label: 'Lyon' }
              ]
            },
            {
              value: 19,
              label: 'UK',
              children: [
                { value: 20, label: 'London' },
                { value: 21, label: 'Birmingham' },
                { value: 22, label: 'Manchester' }
              ]
            }
          ]
        },
        {
          value: 23,
          label: 'North America',
          children: [
            {
              value: 24,
              label: 'US',
              children: [
                { value: 25, label: 'New York' },
                { value: 26, label: 'Los Angeles' },
                { value: 27, label: 'Washington' }
              ]
            },
            {
              value: 28,
              label: 'Canada',
              children: [
                { value: 29, label: 'Toronto' },
                { value: 30, label: 'Montreal' },
                { value: 31, label: 'Ottawa' }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    label: '复选框',
    as: 'checkbox',
    props: {
      label: '是否同意'
    }
  },
  {
    label: '标签输入框',
    as: 'input-tag'
  }
])

const options = ref<any>([])

const colOptions = ref([
  { label: '单栏', value: 1 },
  { label: '两栏', value: 2 },
  { label: '三栏', value: 3 },
  { label: '四栏', value: 4 }
])

const cloneDog = (item: any) => {
	return {
		...item,
		id:  item.as + '_' + Math.random().toString(36).substr(2, 9)
	}
}
const cols = ref(2)
</script>

<template>
  <div class="playground">
    <div class="lew-form-component lew-scrollbar">
      <draggable
        :group="{ name: 'form', pull: 'clone', put: false }"
        :class="['lew-form-component-draggable']"
        v-model="componentOptions"
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
      <div class="lew-form-select-cols">
        <lew-tabs size="large" width="auto" :options="colOptions" round v-model="cols" />
      </div>
      <draggable
        group="form"
        :class="['lew-form-wrapper-draggable lew-scrollbar', `lew-form-wrapper-draggable-${cols}`, `lew-form-wrapper-draggable-${options.length===0?'empty':''}`]"
        handle=".handle"
        v-model="options"
        item-key="id"
        v-bind="dragOptions"
      >
        <template #item="{ element }">
          <div
            class="lew-form-wrapper-draggable-item"
            :style="{ 'grid-column-end': `span ${element.span}` }"
          >
            <div class="handle">
              <lew-icon size="14" type="move"></lew-icon>
            </div>
            <input v-model="element.field" placeholder="设置字段名" class="field"></input>
            <lew-form-item v-bind="{ ...element, direction: 'y' }" />
          </div>
        </template>
		<template #no-item>
			<lew-empty type="order" title="从左侧拖动组件到右侧区域" />
		</template>
      </draggable>
    </div>
    <lew-flex direction="y" x="start" y="start" class="lew-form-options lew-scrollbar">
      <pre>{{ options }}</pre>
    </lew-flex>
  </div>
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
	border-left:1px solid var(--lew-bgcolor-3);
	border-right:1px solid var(--lew-bgcolor-3);
    .lew-form-select-cols {
      display: flex; 
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60px;
      background-color: #fff;
      flex-shrink: 0;
	  border-bottom:1px solid var(--lew-bgcolor-3);
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
      background-color: var(--lew-bgcolor-0);
      box-sizing: border-box;
      border: 2px dashed transparent;
    }
  }
  .lew-form-wrapper-draggable-item {
    position: relative;
    padding: 20px 20px 30px 20px;
    background-color: var(--lew-bgcolor-0);
    box-sizing: border-box;
    border: 2px dashed transparent;
    .handle {
      position: absolute;
      left: 0px;
      top: 0px;
      opacity: 0;
      transition: opacity 0.1s ease-in-out;
	  cursor: move;
    }
    .field {
      position: absolute;
      right: 5px;
      bottom: 0px;
	  width: auto;
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
  .lew-form-wrapper-draggable-empty::after{
	position: absolute;
	content: "从左侧拖动组件到当前区域";
	top: 50%;
	left: 50%;
	opacity: 0.5;
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
</style>
