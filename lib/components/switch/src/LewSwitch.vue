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
  const { round, request } = props

  let loading = props.loading || _loading.value

  return object2class('lew-switch', {
    checked: modelValue.value,
    round: !!round,
    request: !!request,
    loading
  })
})
</script>

<template>
  <div class="lew-switch-view" :class="getSwitchClassName" @click="handleClick">
    <input v-show="false" v-model="modelValue" type="checkbox" :disabled="disabled" />
    <div class="lew-switch-dot"></div>
  </div>
</template>

<style lang="scss" scoped>
.lew-switch-view {
  position: relative;
  display: block;
  width: 38px;
  height: 24px;
  background: var(--lew-bgcolor-3);
  border-radius: var(--lew-border-radius-small);
  transition: var(--lew-form-transition-ease);
  cursor: pointer;
  outline: 0px var(--lew-color-primary-light) solid;

  .lew-switch-dot {
    position: absolute;
    width: 16px;
    height: 16px;
    left: 0px;
    top: 0px;
    border-radius: 4px;
    background: var(--lew-color-white);
    transition: var(--lew-form-transition-ease);
    transform: translate(4px, 4px);
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

.lew-switch-loading {
  cursor: progress;

  .lew-switch-dot::after {
    border: 2px solid rgba(0, 0, 0, 0);
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

.lew-switch-view:hover {
  background: var(--lew-bgcolor-4);
  outline: var(--lew-form-outline);
}

.lew-switch-view:active {
  background: var(--lew-bgcolor-5);

  .lew-switch-dot {
    width: 20px;
  }
}

.lew-switch-view.lew-switch-checked {
  background: var(--lew-color-primary);
}

.lew-switch-view.lew-switch-checked:hover {
  background: var(--lew-color-primary);
}

.lew-switch-view.lew-switch-checked:active {
  background: var(--lew-color-primary);

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
