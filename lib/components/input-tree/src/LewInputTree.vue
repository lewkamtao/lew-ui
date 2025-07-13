<script setup lang="ts">
import { inputTreeProps } from './props'
import { LewFlex } from 'lew-ui'

defineProps(inputTreeProps)
</script>

<template>
    <lew-flex direction="y" class="lew-result"> 123 </lew-flex>
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
