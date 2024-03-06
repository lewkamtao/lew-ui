<script setup lang="ts">
    defineProps({
        direction: {
            type: String,
            default: 'row'
        },
        x: {
            type: String,
            default: 'center' // start center end
        },
        y: {
            type: String,
            default: 'center' // start center end
        },
        mode: {
            type: String,
            default: '' // around / between
        }
    });
</script>

<template>
    <div
        class="lew-flex"
        :class="`${direction ? 'lew-flex-' + direction : ''} ${x ? 'lew-flex-x-' + x : ''} ${
            y ? 'lew-flex-y-' + y : ''
        }  ${mode ? 'lew-flex-mode-' + mode : ''} `"
    >
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .lew-flex {
        display: flex;
    }
    .lew-flex-row {
        flex-direction: row;
    }
    .lew-flex-column {
        flex-direction: column;
    }
    .lew-flex-row.lew-flex-x-start {
        justify-content: flex-start;
    }
    .lew-flex-row.lew-flex-x-center {
        justify-content: center;
    }
    .lew-flex-row.lew-flex-x-end {
        justify-content: flex-end;
    }

    .lew-flex-row.lew-flex-y-start {
        align-items: flex-start;
    }
    .lew-flex-row.lew-flex-y-center {
        align-items: center;
    }
    .lew-flex-row.lew-flex-y-end {
        align-items: flex-end;
    }

    .lew-flex-column.lew-flex-x-start {
        align-items: flex-start;
    }
    .lew-flex-column.lew-flex-x-center {
        align-items: center;
    }
    .lew-flex-column.lew-flex-x-end {
        align-items: flex-end;
    }

    .lew-flex-column.lew-flex-y-start {
        justify-content: flex-start;
    }
    .lew-flex-column.lew-flex-y-center {
        justify-content: center;
    }
    .lew-flex-column.lew-flex-y-end {
        justify-content: flex-end;
    }

    .lew-flex-row.lew-flex-mode-between {
        justify-content: space-between;
    }
    .lew-flex-row.lew-flex-mode-around {
        justify-content: space-around;
    }
    .lew-flex-column.lew-flex-mode-between {
        justify-content: space-between;
    }
    .lew-flex-column.lew-flex-mode-around {
        justify-content: space-around;
    }
</style>
