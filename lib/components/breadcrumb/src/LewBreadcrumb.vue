<script setup lang="ts">
import { breadcrumbProps } from './props'
const emit = defineEmits(['change'])

defineProps(breadcrumbProps)
</script>

<template>
    <div class="lew-breadcrumb">
        <div
            v-for="(item, index) in options"
            :key="index"
            class="lew-breadcrumb-item"
            :class="{ 'lew-breadcrumb-active': item.active }"
        >
            <span
                :class="{ 'lew-breadcrumb-isPath': !!item.value }"
                @click="emit('change', item)"
            >
                {{ item.label }}
            </span>
            <div
                v-if="index != options.length - 1"
                class="lew-breadcrumb-parting"
            >
                <svg
                    v-if="separator === 'sprit'"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    stroke-width="4"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                >
                    <path d="M29.506 6.502 18.493 41.498" />
                </svg>

                <svg
                    v-if="separator === 'shoulder'"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    stroke-width="4"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                >
                    <path d="m16 39.513 15.556-15.557L16 8.4" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-breadcrumb {
    display: inline-flex;
    align-items: center;
    .lew-breadcrumb-item {
        display: inline-flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: var(--lew-text-color-5);
        user-select: none;
        white-space: nowrap;
        span {
            cursor: default;
            padding: 2px 4px;
            border-radius: 6px;
        }
        .lew-breadcrumb-isPath:hover {
            cursor: pointer;
            background-color: var(--lew-bgcolor-2);
        }
    }
    .lew-breadcrumb-active {
        color: var(--lew-text-color-1);
        font-weight: 500;
    }
    .lew-breadcrumb-parting {
        display: inline-flex;
        align-items: center;
        svg {
            margin: 0px 5px;
            height: 1em;
            color: var(--lew-text-color-5);
            opacity: var(--lew-disabled-opacity);
        }
    }
}
</style>
