<script setup lang="ts">
import {
    Info24Regular,
    Warning24Regular,
    CheckmarkCircle24Regular,
    ErrorCircle24Regular,
    Alert24Regular,
} from '@vicons/fluent';

import { _props } from './props';
defineProps(_props);
</script>

<template>
    <lew-flex direction="column" class="lew-result">
        <div class="lew-result-icon" :class="`lew-result-icon-${status}`">
            <Info24Regular v-if="status == 'info'" />
            <Warning24Regular v-if="status == 'warning'" />
            <CheckmarkCircle24Regular v-if="status == 'success'" />
            <ErrorCircle24Regular v-if="status == 'error'" />
            <Alert24Regular v-if="status == 'normal'" />
        </div>
        <lew-title class="lew-result-title">{{ title }}</lew-title>
        <div class="lew-result-content">{{ content }}</div>
        <div><slot name="handle" /></div>
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
        color: var(--lew-success-color);
    }
    .lew-result-icon-warning {
        color: var(--lew-warning-color);
    }
    .lew-result-icon-normal {
        color: var(--lew-normal-color-dark);
    }
    .lew-result-icon-error {
        color: var(--lew-error-color);
    }
    .lew-result-icon-info {
        color: var(--lew-info-color);
    }
}
</style>
