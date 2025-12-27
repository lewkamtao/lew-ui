<script setup lang="ts">
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { any2px } from 'lew-ui/utils'
import { stepsEmits } from './emits'
import { stepsProps } from './props'

const props = defineProps(stepsProps)
const emit = defineEmits(stepsEmits)
const stepsValue = defineModel<number | undefined>('modelValue', { required: false })

watch(stepsValue, (val, oldVal) => {
  if (val !== oldVal && val !== undefined) {
    emit('change', val)
  }
})

const itemStyle = computed(() => {
  return {
    cursor: props.canClickItem ? 'pointer' : 'default',
    minWidth: any2px(props.minWidth),
  }
})

function handleClick(index: number) {
  if (!props.canClickItem)
    return
  if (!props.canCrossSteps && Math.abs((stepsValue.value || 1) - 1 - index) > 1)
    return
  if (stepsValue.value !== index + 1) {
    stepsValue.value = index + 1
    emit('change', stepsValue.value)
  }
}
</script>

<template>
  <div class="lew-steps lew-scrollbar">
    <div
      v-for="(item, index) in props.options"
      :key="index"
      class="lew-steps-item"
      :class="{
        'lew-steps-item-active': index === (stepsValue || 1) - 1,
        'lew-steps-item-succeeded': index < (stepsValue || 1) - 1,
        'lew-steps-item-error':
          index === (stepsValue || 1) - 1 && props.status === 'error',
        'lew-steps-item-warning':
          index === (stepsValue || 1) - 1 && props.status === 'warning',
        'lew-steps-item-done': index === (stepsValue || 1) - 1 && props.status === 'done',
      }"
      :style="itemStyle"
      @click="handleClick(index)"
    >
      <div class="lew-steps-item-index">
        <CommonIcon
          v-if="index === (stepsValue || 1) - 1 && props.status === 'loading'"
          :size="16"
          :stroke-width="3"
          loading
          type="loader"
        />
        <CommonIcon
          v-else-if="index === (stepsValue || 1) - 1 && props.status === 'warning'"
          :size="16"
          :stroke-width="3"
          type="alert-circle"
        />
        <CommonIcon
          v-else-if="index === (stepsValue || 1) - 1 && props.status === 'error'"
          :size="16"
          :stroke-width="3"
          type="close"
        />
        <CommonIcon
          v-else-if="
            index < (stepsValue || 1) - 1 ||
              (index === (stepsValue || 1) - 1 && props.status === 'done')
          "
          :style="{ color: 'var(--lew-color-steps-primary-succeeded-icon)' }"
          :size="16"
          :stroke-width="3"
          type="check"
        />
        <span v-else class="index">{{ index + 1 }}</span>
      </div>
      <div class="lew-steps-item-info">
        <div :style="{ maxWidth: any2px(props.minWidth) }" class="lew-steps-item-title">
          <RenderComponent
            :render-fn="item.title"
            type="text-trim"
            :component-props="{
              placement: 'bottom',
            }"
          />
        </div>
        <div
          :style="{ maxWidth: any2px(props.minWidth) }"
          class="lew-steps-item-description"
        >
          <RenderComponent
            :render-fn="item.description"
            type="text-trim"
            :component-props="{
              allowHtml: true,
              lineClamp: 2,
              placement: 'bottom',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.lew-steps {
  width: 100%;
  overflow-x: auto;
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px;
  box-sizing: border-box;

  .lew-steps-item {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex: 1;
    overflow: hidden;
    padding: 0px 15px;
    box-sizing: border-box;
    transition: 0.25s all;

    .lew-steps-item-index {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      border-radius: 50%;
      font-size: 16px;
      background-color: var(--lew-bgcolor-3);
      transition: 0.25s all;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .lew-steps-item-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 100%;
      gap: 5px;
      margin-top: 4px;
      margin-left: 10px;
      transition: 0.25s all;
    }

    .lew-steps-item-title {
      position: relative;
      font-size: 16px;
      background-color: var(--lew-bgcolor-0);
      padding-right: 15px;
      box-sizing: border-box;
      white-space: nowrap;
    }

    .lew-steps-item-title::before {
      position: absolute;
      content: '';
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      width: 5000px;
      height: 1px;
      background-color: var(--lew-bgcolor-3);
    }

    .lew-steps-item-title::after {
      position: absolute;
      content: '';
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      width: 0px;
      height: 1px;
      background-color: var(--lew-color-steps-primary-active-title);
      transition: 0.5s all ease-in;
    }

    .lew-steps-item-description {
      font-size: 14px;
      max-width: 200px;
      padding-right: 10px;
      color: var(--lew-text-color-5);
    }
  }

  .lew-steps-item-active {
    .lew-steps-item-index {
      background-color: var(--lew-color-steps-primary-active-bg);
      color: var(--lew-color-steps-primary-active-text);
    }

    .lew-steps-item-title {
      font-weight: bold;
      color: var(--lew-color-steps-primary-active-title);
    }
  }

  .lew-steps-item-warning {
    .lew-steps-item-index {
      background-color: var(--lew-color-steps-warning-active-bg);
      color: var(--lew-color-steps-warning-active-text);
    }

    .lew-steps-item-title {
      font-weight: bold;
      color: var(--lew-color-steps-warning-active-title);
    }
  }

  .lew-steps-item-error {
    .lew-steps-item-index {
      background-color: var(--lew-color-steps-error-active-bg);
      color: var(--lew-color-steps-error-active-text);
    }

    .lew-steps-item-title {
      font-weight: bold;
      color: var(--lew-color-steps-error-active-title);
    }
  }

  .lew-steps-item-succeeded,
  .lew-steps-item-done {
    .lew-steps-item-index {
      background-color: var(--lew-bgcolor-3);

      .index {
        display: none;
      }
    }

    .lew-steps-item-title::after {
      width: 40vw;
    }
  }

  .lew-steps-item:last-child {
    flex: none;

    .lew-steps-item-title::after {
      width: 0px;
    }

    .lew-steps-item-title::before {
      display: none;
    }
  }
}
</style>
