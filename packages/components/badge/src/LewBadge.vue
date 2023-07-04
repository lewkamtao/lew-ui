<script setup lang="ts">
import { badgeProps } from './badge';
import { object2class } from 'lew-ui/utils';

const props = defineProps(badgeProps);

const badgeClassName = computed(() => {
    const { round, type } = props;
    return object2class('lew-badge', {
        round,
        type,
    });
});
</script>

<template>
    <div class="lew-badge" :class="badgeClassName">
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
        width: 10px;
        height: 10px;
        bottom: calc(100% - 5px);
        transform: translateX(-50%);
        z-index: 1;
        cursor: normal;
        border-radius: 4px;
        border: 1px var(--lew-white-color) solid;
        box-sizing: border-box;
    }
    .lew-badge-value {
        position: absolute;
        display: inline-flex;
        align-items: center;
        left: 100%;
        bottom: calc(100% - 9px);
        transform: translateX(-50%);
        border-radius: 4px;
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
        background-color: var(--lew-color-error-dark);
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

.lew-badge-type-primary {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-color-primary);
    }
}
.lew-badge-type-info {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-color-info);
    }
}
.lew-badge-type-success {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-color-success);
    }
}

.lew-badge-type-warning {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-color-warning);
    }
}
.lew-badge-type-error {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-color-error);
    }
}
.lew-badge-type-normal {
    .lew-badge-value,
    .lew-badge-dot {
        color: var(--lew-white-color);
        background-color: var(--lew-color-error);
    }
}
</style>
