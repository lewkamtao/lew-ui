<script setup lang="ts">
import { ref, watch } from 'vue';
import { _props } from './props';

const props = defineProps(_props);
let _loading = ref(false);
const v = ref(props.modelValue);

watch(
    () => props.modelValue,
    () => {
        v.value = props.modelValue;
    }
);

const emit = defineEmits(['update:modelValue', 'click', 'change']);

const handleClick = async (e: any) => {
    if (props.disabled || _loading.value || props.loading) return;
    emit('click', e);
    if (typeof props.request === 'function') {
        if (_loading.value) {
            return;
        }
        _loading.value = true;
        const isSuccess = await props.request(!v.value);
        if (isSuccess) {
            v.value = !v.value;
            _loading.value = false;
        }
        _loading.value = false;
    } else {
        v.value = !v.value;
    }
    emit('update:modelValue', v.value);
    emit('change', v.value);
};
</script>

<template>
    <div class="lew-switch-view" :class="`
     ${round ? 'lew-switch-round' : ''} 
     ${v ? 'lew-switch-checked' : ''}
     ${_loading || loading ? 'lew-switch-loading' : ''}
     ${request ? 'lew-switch-request' : ''}
    `" @click="handleClick">
        <input v-show="false" v-model="v" type="checkbox" :disabled="disabled" />
        <div class="lew-switch-dot"></div>
    </div>
</template>

<style lang="scss" scoped>
.lew-switch-view {
    position: relative;
    display: block;
    width: 38px;
    height: 24px;
    background: var(--lew-form-bgcolor);
    border-radius: var(--lew-border-radius);
    transition: var(--lew-form-transition);
    cursor: pointer;

    .lew-switch-dot {
        position: absolute;
        width: 16px;
        height: 16px;
        left: 0px;
        top: 0px;
        border-radius: 2px;
        background: var(--lew-white-color);
        transition: var(--lew-form-transition);
        transform: translate(4px, 4px);
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
    }

    .lew-switch-dot::after {
        position: absolute;
        left: 50%;
        top: 50%;
        user-select: none;
        transform: translate(-50%, -50%);
        content: '';
        animation: lew-loading-spinner-spin 0.65s linear infinite;
        border-radius: 50%;
    }

    input:checked+.lew-switch-dot {
        background: #fff;
        transform: translate(18px, 4px);
    }

    input:checked+.lew-switch-dot:after {
        transform: translateX(-100%);
    }
}

@keyframes lew-loading-spinner-spin {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

.lew-switch-loading {
    cursor: progress;

    .lew-switch-dot::after {
        border: 2px solid rgba(0, 0, 0, 0);
        border-left: 2px solid var(--lew-primary-color);
        width: 10px;
        height: 10px;
    }
}

.lew-switch-round {
    border-radius: 20px;

    .lew-switch-dot {
        border-radius: 50px;
    }
}

.lew-switch-view:hover {
    background: var(--lew-form-bgcolor-hover);
}

.lew-switch-view:active {
    background: var(--lew-form-bgcolor-active);

    .lew-switch-dot {
        width: 20px;
    }
}

.lew-switch-view.lew-switch-checked {
    background: var(--lew-primary-color);
}

.lew-switch-view.lew-switch-checked:hover {
    background: var(--lew-primary-color);
}

.lew-switch-view.lew-switch-checked:active {
    background: var(--lew-primary-color);

    .lew-switch-dot {
        width: 20px;
        transform: translate(14px, 4px);
    }
}

.lew-switch-view.lew-switch-request {
    .lew-switch-dot {
        width: 16px;
        transform: translate(4px, 4px);
    }
}

.lew-switch-view.lew-switch-checked.lew-switch-request {
    .lew-switch-dot {
        width: 16px;
        transform: translate(18px, 4px);
    }
}
</style>
