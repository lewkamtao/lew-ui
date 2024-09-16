<script setup lang="ts">
import { resultProps } from './props'
import {  LewFlex, LewTitle } from 'lew-ui'
import Icon from 'lew-ui/utils/Icon.vue'

defineProps(resultProps)
</script>

<template>
  <lew-flex direction="y" class="lew-result">
    <lew-flex class="lew-result-icon" :class="`lew-result-icon-${type}`">
      <Icon :size="60" :type="type" />
    </lew-flex>
    <lew-title class="lew-result-title">{{ title }}</lew-title>
    <div class="lew-result-content">{{ content }}</div>
    <div>
      <slot name="handle"></slot>
    </div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-result {
  .lew-result-icon {
    width: 100px;
  }

  .lew-result-title {
    font-size: 22px;
  }

  .lew-result-content {
    max-width: 50%;
  }

  .lew-result-icon-success {
    color: var(--lew-color-success);
  }

  .lew-result-icon-warning {
    color: var(--lew-color-warning);
  }

  .lew-result-icon-normal {
    color: var(--lew-color-normal-dark);
  }

  .lew-result-icon-error {
    color: var(--lew-color-error);
  }

  .lew-result-icon-info {
    color: var(--lew-color-info);
  }
}
</style>
