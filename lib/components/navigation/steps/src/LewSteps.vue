<script lang="ts" setup>
import { LewTextTrim } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { stepsProps } from './props'

defineProps(stepsProps)
const stepsValue: Ref<number | undefined> = defineModel()
</script>

<template>
  <div class="lew-steps lew-scrollbar">
    <div
      v-for="(item, index) in options"
      :key="index"
      class="lew-steps-item"
      :style="{ minWidth: any2px(minWidth) }"
      :class="{
        'lew-steps-item-active': index === (stepsValue || 1) - 1,
        'lew-steps-item-succeeded': index < (stepsValue || 1) - 1,
        'lew-steps-item-error':
          index === (stepsValue || 1) - 1 && status === 'error',
        'lew-steps-item-warning':
          index === (stepsValue || 1) - 1 && status === 'warning',
        'lew-steps-item-done':
          index === (stepsValue || 1) - 1 && status === 'done',
      }"
    >
      <div class="lew-steps-item-index">
        <Icon
          v-if="index === (stepsValue || 1) - 1 && status === 'loading'"
          :size="16"
          :stroke-width="3"
          loading
          type="loader"
        />
        <Icon
          v-else-if="index === (stepsValue || 1) - 1 && status === 'warning'"
          :size="16"
          :stroke-width="3"
          type="alert-circle"
        />
        <Icon
          v-else-if="index === (stepsValue || 1) - 1 && status === 'error'"
          :size="16"
          :stroke-width="3"
          type="close"
        />

        <Icon
          v-else-if="
            index < (stepsValue || 1) - 1
              || (index === (stepsValue || 1) - 1 && status === 'done')
          "
          :style="{ color: 'var(--lew-color-primary)' }"
          :size="16"
          :stroke-width="3"
          type="check"
        />
        <span v-else class="index">{{ index + 1 }}</span>
      </div>
      <div class="lew-steps-item-info">
        <div
          :style="{ maxWidth: any2px(minWidth) }"
          class="lew-steps-item-title"
        >
          <LewTextTrim placement="bottom" :text="item.title" />
        </div>
        <div
          :style="{ maxWidth: any2px(minWidth) }"
          class="lew-steps-item-description"
        >
          <LewTextTrim
            allow-h-t-m-l
            :line-clamp="2"
            placement="bottom"
            :text="item.description"
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
      background-color: var(--lew-color-primary);
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
      background-color: var(--lew-color-primary);
      color: var(--lew-color-white);
    }
    .lew-steps-item-title {
      font-weight: bold;
    }
  }
  .lew-steps-item-warning {
    .lew-steps-item-index {
      background-color: var(--lew-color-warning);
      color: var(--lew-color-white);
    }
    .lew-steps-item-title {
      font-weight: bold;
    }
  }
  .lew-steps-item-error {
    .lew-steps-item-index {
      background-color: var(--lew-color-error);
      color: var(--lew-color-white);
    }
    .lew-steps-item-title {
      font-weight: bold;
    }
  }
  .lew-steps-item-succeeded,
  .lew-steps-item-done {
    .lew-steps-item-index {
      background-color: var(--lew-color-primary-light);

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
