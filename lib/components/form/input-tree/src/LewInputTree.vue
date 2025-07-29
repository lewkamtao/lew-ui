<script setup lang="ts">
import { LewFlex } from 'lew-ui'
import { inputTreeProps } from './props'

defineProps(inputTreeProps)
</script>

<template>
  <LewFlex direction="y" class="lew-result">
    123
  </LewFlex>
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
