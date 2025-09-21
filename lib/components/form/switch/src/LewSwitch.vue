<script setup lang="ts">
import { object2class } from 'lew-ui/utils'
import { switchEmits } from './emits'
import { switchProps } from './props'

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const _loading = ref(false)

const modelValue: Ref<boolean | undefined> = defineModel()
async function handleClick() {
  if (props.disabled || _loading.value || props.loading)
    return
  if (typeof props.request === 'function') {
    if (_loading.value) {
      return
    }
    _loading.value = true
    const isSuccess = await props.request()
    if (isSuccess) {
      const currentValue = modelValue.value ?? false
      const newValue = !currentValue
      modelValue.value = newValue
      emit('change', newValue)
    }
    _loading.value = false
  }
  else {
    const currentValue = modelValue.value ?? false
    const newValue = !currentValue
    modelValue.value = newValue
    emit('change', newValue)
  }
}

const getSwitchClassName = computed(() => {
  const { round, request, disabled, readonly } = props

  const loading = props.loading || _loading.value

  return object2class('lew-switch', {
    checked: modelValue.value,
    round: !!round,
    request: !!request,
    loading,
    disabled,
    readonly,
  })
})
const getSwitchStyle = computed(() => {
  const { size } = props
  switch (size) {
    case 'small':
      return {
        '--lew-switch-width': '42px',
        '--lew-switch-height': '26px',
        '--lew-switch-dot-width': '18px',
        '--lew-switch-dot-height': '18px',
        '--lew-switch-dot-width-active': '22px',
        '--lew-switch-dot-transform': 'translate(4px, 4px)',
        '--lew-switch-dot-transform-active': 'translate(15px, 4px)',
      }
    case 'medium':
      return {
        '--lew-switch-width': '44px',
        '--lew-switch-height': '28px',
        '--lew-switch-dot-width': '20px',
        '--lew-switch-dot-height': '20px',
        '--lew-switch-dot-width-active': '24px',
        '--lew-switch-dot-transform': 'translate(4px, 4px)',
        '--lew-switch-dot-transform-active': 'translate(15px, 4px)',
      }
    case 'large':
      return {
        '--lew-switch-width': '46px',
        '--lew-switch-height': '30px',
        '--lew-switch-dot-width': '22px',
        '--lew-switch-dot-height': '22px',
        '--lew-switch-dot-width-active': '26px',
        '--lew-switch-dot-transform': 'translate(4px, 4px)',
        '--lew-switch-dot-transform-active': 'translate(15px, 4px)',
      }
    default:
      return {
        '--lew-switch-width': '44px',
        '--lew-switch-height': '28px',
        '--lew-switch-dot-width': '20px',
        '--lew-switch-dot-height': '20px',
        '--lew-switch-dot-width-active': '24px',
        '--lew-switch-dot-transform': 'translate(4px, 4px)',
        '--lew-switch-dot-transform-active': 'translate(15px, 4px)',
      }
  }
})
</script>

<template>
  <div
    class="lew-switch"
    :class="getSwitchClassName"
    :style="getSwitchStyle"
    @click="handleClick"
  >
    <input
      v-show="false"
      v-model="modelValue"
      type="checkbox"
      :disabled="disabled"
    >
    <div class="lew-switch-dot" />
  </div>
</template>

<style lang="scss" scoped>
.lew-switch {
  position: relative;
  display: block;
  cursor: pointer;
  width: var(--lew-switch-width);
  height: var(--lew-switch-height);
  background: var(--lew-switch-bgcolor);
  border-radius: var(--lew-border-radius-small);
  transition: all var(--lew-form-transition-ease);
  box-shadow: var(--lew-form-box-shadow);
  flex-shrink: 0;

  .lew-switch-dot {
    position: absolute;
    left: 0px;
    top: 0px;
    width: var(--lew-switch-dot-width);
    height: var(--lew-switch-dot-height);
    border-radius: 4px;
    background: var(--lew-color-white);
    transition: all var(--lew-form-transition-ease);
    transform: var(--lew-switch-dot-transform);
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

  input:checked + .lew-switch-dot {
    background: #fff;
    transform: translate(19px, 4px);
  }

  input:checked + .lew-switch-dot:after {
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
    border: var(--lew-form-border-width) solid rgba(0, 0, 0, 0);
    border-left: 2px solid var(--lew-color-primary);
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

.lew-switch:hover {
  background: var(--lew-switch-bgcolor-hover);
  outline: var(--lew-form-outline);
}

.lew-switch:active {
  .lew-switch-dot {
    width: var(--lew-switch-dot-width-active);
  }
}

.lew-switch.lew-switch-checked {
  background: var(--lew-color-primary);
}

.lew-switch.lew-switch-checked:hover {
  background: var(--lew-color-primary);
}

.lew-switch.lew-switch-checked:active {
  background: var(--lew-color-primary);

  .lew-switch-dot {
    width: var(--lew-switch-dot-width-active);
    transform: var(--lew-switch-dot-transform-active);
  }
}

.lew-switch.lew-switch-request {
  .lew-switch-dot {
    width: var(--lew-switch-dot-width);
    transform: var(--lew-switch-dot-transform);
  }
}

.lew-switch.lew-switch-checked.lew-switch-request {
  .lew-switch-dot {
    width: var(--lew-switch-dot-width);
    transform: translate(19px, 4px);
  }
}

.lew-switch-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}

.lew-switch-readonly {
  pointer-events: none; //鼠标点击不可修改
}
</style>
