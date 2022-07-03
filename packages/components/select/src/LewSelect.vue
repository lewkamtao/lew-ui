<script setup lang="ts">
import { LewInput } from 'lew-ui';
import { ref, PropType, onMounted, onUnmounted } from 'vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/animations/shift-away-subtle.css';
import 'tippy.js/themes/light.css';
import { ChevronDown } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
import _props from './props';
import LewCheckbox from '../../checkbox/src/LewCheckbox.vue';

type Options = {
    label: string;
    value: string;
};

const props = defineProps(_props);

const v = ref<String>('');
const labelStr = ref<String>('');

const multipleV = ref<Array<String>>([]);
const multipleLabelStr = ref<Array<String>>([]);

onMounted(() => {
    // 如果是多选
    if (props.multiple) {
        multipleLabelStr.value = filterSelect(props.modelValue, props.options);
        initMultipleTippy();
    } else {
        labelStr.value =
            filterSelect([props.modelValue], props.options)[0] || '';
    }
    initOptionsTippy();
});

const filterSelect = (v: any, options: Options[]) => {
    let _v: Array<String> = [];
    if (v && options) {
        v.map((e: string) => {
            options.map((o) => {
                if (e == o.value) {
                    _v.push(o.label);
                }
            });
        });
    }

    return _v;
};

const changeFn = (item: Options) => {
    if (props.multiple) {
        let index = multipleV.value.indexOf(item.value);
        if (index >= 0) {
            multipleLabelStr.value.splice(index, 1);
            multipleV.value.splice(index, 1);
        } else {
            multipleLabelStr.value.push(item.label);
            multipleV.value.push(item.value);
        }

        emit('update:modelValue', multipleV.value);
        emit('change', multipleV.value);
    } else {
        if (v.value == item.value) {
            labelStr.value = '';
            v.value = '';
        } else {
            labelStr.value = item.label;
            v.value = item.value;
        }
        setTimeout(() => {
            hide();
        }, 150);
        emit('update:modelValue', v.value);
        emit('change', v.value);
    }
};

let triggerRef = ref(null);
let bodyRef = ref(null);
let isShowOptions = ref(false);
let instance1: any;

const initOptionsTippy = () => {
    let trigger = props.trigger;
    if (trigger == 'hover') {
        trigger = 'mouseenter';
    }
    // @ts-ignore
    bodyRef.value.style.width = `${triggerRef.value?.offsetWidth}px`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance1 = tippy(triggerRef.value, {
        theme: 'light',
        trigger: trigger || 'click',
        content: bodyRef.value,
        animation: 'shift-away-subtle',
        interactive: true,
        placement: 'bottom-start',
        arrow: false,
        interactiveBorder: 10,
        appendTo: () => document.body,
        allowHTML: true, // @ts-ignore
        maxWidth: triggerRef.value?.offsetWidth,
        onShow(instance) {
            isShowOptions.value = true;
            const node = document.getElementsByTagName('html')[0];
            const tippyContent = instance.popper.children[0];
            if (node.classList.contains('lew-dark')) {
                tippyContent.setAttribute('data-theme', 'dark');
            } else {
                tippyContent.setAttribute('data-theme', 'light');
            }
        },
        onHide() {
            isShowOptions.value = false;
        },
    });
    instance1.popper.children[0].setAttribute('data-lew', 'select');
};

let tagRef = ref(null);
let multipleRef = ref(null);
let instance2: any;
const initMultipleTippy = () => {
    // @ts-ignore
    instance2 = tippy(tagRef.value, {
        theme: 'light',
        trigger: 'mouseenter',
        content: multipleRef.value,
        animation: 'shift-away-subtle',
        interactive: true,
        placement: 'top',
        interactiveBorder: 10,
        appendTo: () => document.body,
        allowHTML: true, // @ts-ignore
        maxWidth: 250,
        onShow(instance) {
            hide();
            const node = document.getElementsByTagName('html')[0];
            const tippyContent = instance.popper.children[0];
            if (node.classList.contains('lew-dark')) {
                tippyContent.setAttribute('data-theme', 'dark');
            } else {
                tippyContent.setAttribute('data-theme', 'light');
            }
        },
    });
    instance2.popper.children[0].setAttribute('data-lew', 'select-multiple');
};
const emit = defineEmits(['update:modelValue', 'change']);

const show = () => {
    instance1.show();
};

const hide = () => {
    instance1.hide();
};

const delTag = (i: number) => {
    multipleV.value.splice(i, 1);
    multipleLabelStr.value.splice(i, 1);
    emit('update:modelValue', multipleV.value);
    emit('change', multipleV.value);
    if (i == 0 && multipleV.value.length == 0) {
        instance2.hide();
    }
};

defineExpose({ show, hide });

onUnmounted(() => {
    instance1 = null;
    instance2 = null;
});
</script>

<template>
    <div
        class="lew-select"
        :class="{ 'lew-select-isShow': isShowOptions }"
        ref="triggerRef"
    >
        <icon size="16" class="lew-select-icon">
            <ChevronDown />
        </icon>
        <div
            v-if="
                (!multiple && labelStr.length == 0) ||
                (multiple && multipleLabelStr.length == 0)
            "
            class="lew-select-placeholder"
        >
            请选择
        </div>
        <!-- 单选 -->
        <div v-show="!multiple" class="lew-select-label-single">
            {{ labelStr }}
        </div>
        <!-- 多选 -->
        <div v-show="multiple" class="lew-select-label-multiple">
            <lew-tag
                v-show="multipleLabelStr.length > 0"
                @close="delTag(0)"
                closable
            >
                {{ multipleLabelStr[0] }}</lew-tag
            >
            <div ref="tagRef" class="lew-isSelect-label-num">
                <lew-tag
                    style="margin-left: 5px"
                    v-show="multipleLabelStr.length > 1"
                >
                    +{{ multipleLabelStr.length - 1 }}</lew-tag
                >
            </div>
        </div>
        <!-- 多选气泡 -->
        <div ref="multipleRef">
            <lew-flex wrap gap="5px" x="start" class="lew-isSelect-label-box">
                <lew-tag
                    v-for="(item, i) in multipleLabelStr"
                    :key="`multipleLabelStr${i}`"
                    @close="delTag(i)"
                    closable
                >
                    {{ item }}</lew-tag
                >
            </lew-flex>
        </div>
        <div
            ref="bodyRef"
            class="lew-select-body"
            :class="{ 'lew-select-multiple-body': multiple }"
        >
            <div class="options-box">
                <div
                    @click="changeFn(item)"
                    v-for="item in options"
                    :key="item.value"
                    class="item"
                    :class="{
                        'lew-select-checked': multiple
                            ? multipleV.includes(item.value)
                            : v == item.value,
                    }"
                >
                    <lew-checkbox
                        class="lew-selcet-checkbox"
                        v-if="multiple"
                        label=""
                        :checked="multipleV.includes(item.value)"
                    />
                    <div class="lew-selcet-label">{{ item.label }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-select {
    display: inline-flex;
    align-items: center;
    position: relative;
    width: 100%;
    width: 100%;
    height: 35px;
    padding: 5px;
    font-size: 14px;
    line-height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    border-radius: var(--lew-form-border-radius);
    background-color: var(--lew-form-bgcolor);
    color: var(--lew-text-color);
    box-sizing: border-box;
    transition: all 0.15s ease;
    cursor: pointer;
    .lew-select-icon {
        position: absolute;
        top: 50%;
        right: 7px;
        transform: translateY(-50%) rotate(0deg);
        transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
        color: var(--lew-text-color-7);
    }

    background-color: var(--lew-form-bgcolor);
    .lew-select {
        width: 100%;
    }
    .lew-select-label-single {
        margin-left: 7px;
    }
    .lew-select-label-multiple {
        display: inline-flex;
        align-items: center;
    }

    .lew-isSelect-label-num {
        display: inline-flex;
        align-items: center;
    }
}

.lew-select-placeholder {
    color: rgb(165, 165, 165);
    margin-left: 7px;
}
.lew-select:hover {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor-hover);
}
.lew-select:active {
    background-color: var(--lew-form-bgcolor-active);
}
.lew-select.lew-select-isShow {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
    .lew-select-icon {
        transform: translateY(-50%) rotate(180deg);
        color: var(--lew-text-color-2);
    }
}
</style>
<style lang="scss">
.lew-isSelect-label-box {
    padding: 3px 0px !important;
}
.lew-select-body {
    width: 100%;
    padding: 6px 0px 6px 6px;
    box-sizing: border-box;
    .options-box {
        overflow-y: auto;
        overflow-x: hidden;
        height: 220px;
        box-sizing: border-box;
        transition: all 0.25s ease;
        padding-right: 6px;
        .item {
            position: relative;
            display: inline-flex;
            align-items: center;
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
        .lew-selcet-label {
            user-select: none;
        }
        .item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-form-select-bgcolor-hover);
        }
        .lew-select-checked {
            font-weight: bold;
            color: var(--lew-primary-text-color);
        }
        .lew-select-checked:hover {
            color: var(--lew-primary-text-color);
        }
        .lew-selcet-checkbox {
            position: absolute;
            z-index: 0;
            top: 50%;
            transform: translateY(-50%);
            left: 9px;
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
.lew-select-multiple-body {
    .options-box {
        .lew-selcet-label {
            position: absolute;
            left: 0px;
            top: 50%;
            z-index: 9;
            transform: translateY(-50%);
            padding-left: 35px;
        }
    }
}
</style>
