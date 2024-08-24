<script setup lang="ts">
import { switchProps } from './props'
import { object2class } from 'lew-ui/utils'

const props = defineProps(switchProps)
const _loading = ref(false)

const modelValue: Ref<boolean | undefined> = defineModel()
const emit = defineEmits(['click', 'change'])

const handleClick = async (e: any) => {
  if (props.disabled || _loading.value || props.loading) return
  emit('click', e)
  if (typeof props.request === 'function') {
    if (_loading.value) {
      return
    }
    _loading.value = true
    const isSuccess = await props.request(!modelValue.value)
    if (isSuccess) {
      modelValue.value = !modelValue.value
      _loading.value = false
    }
    _loading.value = false
  } else {
    modelValue.value = !modelValue.value
  }
  emit('change', modelValue.value)
}

const getSwitchClassName = computed(() => {
  const { round, request, disabled, readonly } = props

  let loading = props.loading || _loading.value

  return object2class('lew-switch-view', {
    checked: modelValue.value,
    round: !!round,
    request: !!request,
    loading,
    disabled,
    readonly
  })
})

const getSwitchStyle = computed(() => {
  const { size } = props
  switch (size) {
    case 'small':
      return {
        '--lew-switch-view-width': '36px',
        '--lew-switch-view-height': '22px',
        '--lew-switch-dot-width': '14px',
        '--lew-switch-dot-height': '14px',
        '--lew-switch-dot-width-active': '16px',
        '--lew-switch-dot-transform': 'translate(4px, 4px)',
        '--lew-switch-dot-transform-active': 'translate(16px, 4px)'
      }
    case 'medium':
      return {
        '--lew-switch-view-width': '38px',
        '--lew-switch-view-height': '24px',
        '--lew-switch-dot-width': '16px',
        '--lew-switch-dot-height': '16px',
        '--lew-switch-dot-width-active': '18px',
        '--lew-switch-dot-transform': 'translate(4px, 4px)',
        '--lew-switch-dot-transform-active': 'translate(16px, 4px)'
      }
    case 'large':
      return {
        '--lew-switch-view-width': '40px',
        '--lew-switch-view-height': '26px',
        '--lew-switch-dot-width': '18px',
        '--lew-switch-dot-height': '18px',
        '--lew-switch-dot-width-active': '20px',
        '--lew-switch-dot-transform': 'translate(4px, 4px)',
        '--lew-switch-dot-transform-active': 'translate(16px, 4px)'
      }
    default:
      return {
        '--lew-switch-view-width': '38px',
        '--lew-switch-view-height': '24px',
        '--lew-switch-dot-width': '16px',
        '--lew-switch-dot-height': '16px',
        '--lew-switch-dot-width-active': '20px',
        '--lew-switch-dot-transform': 'translate(4px, 4px)',
        '--lew-switch-dot-transform-active': 'translate(14px, 4px)'
      }
  }
})
</script>

<template>
  <div
    class="lew-switch-view"
    :class="getSwitchClassName"
    :style="getSwitchStyle"
    @click="handleClick"
  >
    <input v-show="false" v-model="modelValue" type="checkbox" :disabled="disabled" />
    <div class="lew-switch-dot"></div>
  </div>
</template>

<style lang="scss" scoped>
.lew-switch-view {
  position: relative;
  display: block;
  cursor: pointer;
  width: var(--lew-switch-view-width);
  height: var(--lew-switch-view-height);
  background: var(--lew-bgcolor-3);
  border-radius: var(--lew-border-radius-small);
  transition: var(--lew-form-transition-ease);
  outline: 0px var(--lew-color-primary-light) solid;
  box-shadow: var(--lew-form-box-shadow);

  .lew-switch-dot {
    position: absolute;
    left: 0px;
    top: 0px;
    width: var(--lew-switch-dot-width);
    height: var(--lew-switch-dot-height);
    border-radius: 4px;
    background: var(--lew-color-white);
    transition: var(--lew-form-transition-ease);
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
    transform: translate(18px, 4px);
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

.lew-switch-view-loading {
  cursor: progress;

  .lew-switch-dot::after {
    border: var(--lew-form-border-width) solid rgba(0, 0, 0, 0);
    border-left: 2px solid var(--lew-color-primary);
    width: 10px;
    height: 10px;
  }
}

.lew-switch-view-round {
  border-radius: 20px;

  .lew-switch-dot {
    border-radius: 50px;
  }
}

.lew-switch-view:hover {
  background: var(--lew-bgcolor-4);
  outline: var(--lew-form-outline);
}

.lew-switch-view:active {
  background: var(--lew-bgcolor-5);

  .lew-switch-dot {
    width: var(--lew-switch-dot-width-active);
  }
}

.lew-switch-view.lew-switch-view-checked {
  background: var(--lew-color-primary);
}

.lew-switch-view.lew-switch-view-checked:hover {
  background: var(--lew-color-primary);
}

.lew-switch-view.lew-switch-view-checked:active {
  background: var(--lew-color-primary);

  .lew-switch-dot {
    width: var(--lew-switch-dot-width-active);
    transform: var(--lew-switch-dot-transform-active);
  }
}

.lew-switch-view.lew-switch-view-request {
  .lew-switch-dot {
    width: 16px;
    transform: translate(4px, 4px);
  }
}

.lew-switch-view.lew-switch-view-checked.lew-switch-view-request {
  .lew-switch-dot {
    width: 16px;
    transform: translate(18px, 4px);
  }
}

.lew-switch-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}

.lew-switch-view-readonly {
  pointer-events: none; //鼠标点击不可修改
}
</style>
