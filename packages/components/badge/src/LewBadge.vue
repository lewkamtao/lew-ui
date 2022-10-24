<script setup lang="ts">
import { _props } from './props';
defineProps(_props);
</script>

<template>
    <div
        class="lew-badge"
        :class="`lew-badge-${type} ${round ? 'lew-badge-round' : ''}`"
    >
        <div v-if="value" class="lew-badge-value">
            {{ value }}
        </div>
        <div v-if="!value" class="lew-badge-dot"></div>
        <slot></slot>
    </div>
</template>

<style lang="scss">
.lew-badge {
    position: relative;
    .lew-badge-dot {
        position: absolute;
        left: 100%;
        width: 12px;
        height: 12px;
        bottom: calc(100% - 7px);
        transform: translateX(-50%);
        z-index: 1;
        cursor: normal;
        border-radius: 3px;
        border: 2px var(--lew-white-color) solid;
        box-sizing: border-box;
    }
    .lew-badge-value {
        position: absolute;
        display: inline-flex;
        align-items: center;
        left: 100%;
        bottom: calc(100% - 9px);
        transform: translateX(-50%);
        border-radius: 3px;
        min-width: 18px;
        height: 18px;
        text-align: center;
        padding: 0px 5px;
        font-size: 12px;
        cursor: normal;
        z-index: 1;
        font-weight: normal;
        box-sizing: border-box;
        color: var(--lew-white-text-color);
        background-color: var(--lew-error-color-dark);
    }
}

.lew-badge-round {
    .lew-badge-value {
        border-radius: 25px;
    }
    .lew-badge-dot {
        border-radius: 50%;
    }
}

.lew-badge-primary {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-primary-color);
    }
}
.lew-badge-info {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-info-color);
    }
}
.lew-badge-success {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-success-color);
    }
}

.lew-badge-warning {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-warning-color);
    }
}
.lew-badge-error {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-error-color);
    }
}
.lew-badge-normal {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-error-color-dark);
    }
}
</style>
