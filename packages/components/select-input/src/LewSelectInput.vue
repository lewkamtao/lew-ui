<script setup lang="ts">
import { LewInput } from '../../../../packages';
import { ref, PropType, onMounted, onUnmounted } from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/shift-away-subtle.css';
import 'tippy.js/themes/light.css';
import { ChevronDown } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
type Options = {
    label: string;
    value: string;
};

const props = defineProps({
    modelValue: {
        // 父组件 v-model 没有指定参数名，则默认是 modelValue
        type: String,
        default: '',
    },
    options: {
        type: Array as PropType<Options[]>,
        default() {
            return [];
        },
    },
    trigger: {
        type: String,
        default: 'click',
    },
});

const v = ref<string | undefined>('');
const label = ref<string | undefined>('');

onMounted(() => {
    label.value = props.options.find((e) => e.value == props.modelValue)?.label;
});

const changeFn = (item: Options) => {
    label.value = item.label;
    v.value == item.value;
    hide();
    emit('update:modelValue', item.value);
};

const emit = defineEmits(['update:modelValue']);

let triggerRef = ref(null);
let bodyRef = ref(null);
let isShow = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let instance: any;

onMounted(() => {
    let trigger = props.trigger;

    if (trigger == 'hover') {
        trigger = 'mouseenter';
    }
    // @ts-ignore
    bodyRef.value.style.width = `${triggerRef.value?.offsetWidth - 18}px`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance = tippy(triggerRef.value, {
        theme: 'light',
        trigger: trigger || 'click',
        content: bodyRef.value,
        animation: 'shift-away-subtle',
        interactive: true,
        placement: 'bottom-start',
        arrow: false,
        appendTo: () => document.body,
        allowHTML: true, // @ts-ignore
        maxWidth: triggerRef.value?.offsetWidth,
        onShow(instance) {
            isShow.value = true;
            const node = document.getElementsByTagName('html')[0];
            if (node.classList.contains('lew-dark')) {
                instance.popper.children[0].setAttribute('data-theme', 'dark');
            } else {
                instance.popper.children[0].setAttribute('data-theme', 'light');
            }
        },
        onHide() {
            isShow.value = false;
        },
    });
});

let show = () => {
    instance.show();
};

let hide = () => {
    instance.hide();
};

// const emit = defineEmits(['ok', 'cancel']);
defineExpose({ show, hide });

onUnmounted(() => {
    if (instance) {
        instance.destroy();
    }
});
</script>

<template>
    <div class="lew-select" ref="triggerRef">
        <icon size="16" class="lew-select-icon" :class="{ isShow: isShow }">
            <ChevronDown />
        </icon>
        <lew-input v-model="label" placeholder="请选择"></lew-input>
        <div ref="bodyRef" class="lew-select-body">
            <div class="options-box">
                <div
                    v-for="item in options"
                    :key="item.value"
                    class="item"
                    @click="changeFn(item)"
                >
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-select {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    .lew-select-icon {
        position: absolute;
        top: 50%;
        right: 7px;
        transform: translateY(-50%) rotate(0deg);
        transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
        color: var(--lew-text-color-7);
    }
    .isShow {
        transform: translateY(-50%) rotate(180deg);
        color: var(--lew-text-color-2);
    }
    .lew-input {
        width: 100%;
    }
}
</style>
<style lang="scss">
.lew-select-body {
    width: 100%;
    padding: 4px 0px;
    .options-box {
        overflow-y: auto;
        overflow-x: hidden;
        height: 300px;
        box-sizing: border-box;
        transition: all 0.25s ease;
        .item {
            width: 100%;
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            color: var(--lew-text-color-5);
            box-sizing: border-box;
            border-radius: var(--lew-form-border-radius);
            padding-left: 10px;
        }
        .item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-form-select-bgcolor-hover);
        }
    }

    .options-box::-webkit-scrollbar {
        background-color: rgb(126, 126, 126, 0);
        width: 5px;
        height: 5px;
    }

    .options-box::-webkit-scrollbar-thumb:hover {
        background-color: rgb(126, 126, 126);
    }
    .options-box::-webkit-scrollbar-thumb {
        background-color: rgb(209 213 219 / 0);
        border-radius: 5px;
    }
    .options-box:hover::-webkit-scrollbar-thumb {
        background-color: rgb(209 213 219 / 1);
        border-radius: 5px;
    }
}
</style>
