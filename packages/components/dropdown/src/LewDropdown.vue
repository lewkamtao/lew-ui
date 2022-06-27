<!-- filename: Popover.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/shift-away-subtle.css';
import 'tippy.js/themes/light.css';

type Options = {
    label: string;
    value: string;
};

const props = defineProps({
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
    trigger: {
        type: String,
        default: 'hover',
    },
    placement: {
        type: String,
        default: 'bottom',
    },
    width: {
        type: String,
        default: '',
    },
    arrow: {
        type: Boolean,
        default: true,
    },
    align: {
        type: String,
        default: 'left',
    },
});

let triggerRef = ref(null);
let bodyRef = ref(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let instance: any;

onMounted(() => {
    let trigger = props.trigger;
    let placement = props.placement;

    if (trigger == 'hover') {
        trigger = 'mouseenter';
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance = tippy(triggerRef.value, {
        theme: 'light',
        trigger: trigger,
        content: bodyRef.value,
        animation: 'shift-away-subtle',
        interactive: true,
        arrow: props.arrow,
        placement: placement,
        interactiveBorder: 30,
        appendTo: () => document.body,
        allowHTML: true,
        maxWidth: 'none',
        onShow(instance) {
            const node = document.getElementsByTagName('html')[0];
            if (node.classList.contains('lew-dark')) {
                instance.popper.children[0].setAttribute('data-theme', 'dark');
            } else {
                instance.popper.children[0].setAttribute('data-theme', 'light');
            }
        },
    });
});

let show = () => {
    instance.hide();
};

let hide = () => {
    instance.hide();
};

const emit = defineEmits(['change']);
defineExpose({ show, hide });

const change = (item) => {
    emit('change', item);
    setTimeout(() => {
        hide();
    }, 80);
};

onUnmounted(() => {
    if (instance) {
        instance.destroy();
    }
});
</script>

<template>
    <div class="lew-dropdown">
        <div ref="triggerRef">
            <slot />
        </div>
        <div ref="bodyRef" class="lew-dropdown-body" :style="`width:${width}`">
            <div
                v-for="(item, index) in options"
                :key="index"
                class="lew-dropdown-option"
                :style="`text-align:${align}`"
                @click="change(item)"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-dropdown {
    display: inline-block;
}
.lew-dropdown-body {
    display: flex;
    flex-direction: column;
    padding: 4px 0px;
    .lew-dropdown-option {
        padding: 5px 15px;
        font-size: 14px;
        border-radius: var(--lew-form-border-radius);
        color: var(--lew-text-color-7);
        cursor: pointer;
    }
    .lew-dropdown-option:hover {
        color: var(--lew-text-color-2);
        background-color: var(--lew-bgcolor-2);
    }
}
</style>
