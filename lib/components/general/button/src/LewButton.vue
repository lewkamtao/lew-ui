<script setup lang="ts">
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { object2class } from 'lew-ui/utils'
import { computed, getCurrentInstance, ref } from 'vue'
import { buttonProps } from './props'

const props = defineProps(buttonProps)

const buttonRef = ref<HTMLButtonElement>()
const _loading = ref(false)

async function handleClick() {
  if (props.disabled || _loading.value || props.loading) {
    return
  }

  if (typeof props.request === 'function') {
    if (_loading.value) {
      return
    }
    _loading.value = true
    try {
      await props.request()
    }
    catch (error) {
      console.error('[LewButton] Request failed:', error)
    }
    finally {
      _loading.value = false
    }
  }
}
// Slot detection
const instance = getCurrentInstance()
const hasDefaultSlot = ref(false)

if (instance?.slots.default) {
  hasDefaultSlot.value = true
}

// Computed
const getButtonClass = computed(() => {
  const { size, type, color, singleIcon, round } = props
  const loading = _loading.value || props.loading
  return object2class('lew-button', {
    size,
    type,
    loading,
    singleIcon,
    color,
    round,
  })
})

const getIconSize = computed(() => {
  const { size } = props
  switch (size) {
    case 'mini':
      return 12
    case 'small':
      return 14
    case 'medium':
      return 16
    case 'large':
      return 18
    default:
      return 16
  }
})
</script>

<template>
  <button
    ref="buttonRef"
    class="lew-button"
    :class="getButtonClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <div
      class="lew-button-loading-icon"
      :class="{
        'lew-button-loading-isShow': (_loading || loading) && !disabled,
      }"
    >
      <CommonIcon :size="getIconSize" loading type="loader" />
    </div>
    <div v-if="$slots.default || text" class="lew-button-content">
      <span class="lew-button-text">
        <template v-if="$slots.default">
          <slot />
        </template>
        <template v-else>
          {{ text }}
        </template>
      </span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.lew-button {
  --lew-button-bg: transparent;
  --lew-button-color: var(--lew-color-primary-dark);
  --lew-button-border: none;
  --lew-button-hover-bg: var(--lew-color-primary-light);
  --lew-button-active-bg: var(--lew-color-primary-dark);

  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  flex-shrink: 0;
  user-select: none;
  width: auto;
  white-space: nowrap;
  box-sizing: border-box;
  transition: all var(--lew-form-transition-ease);
  border: none;
  cursor: pointer;
  border-radius: var(--lew-border-radius-small);
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: var(--lew-form-box-shadow);
  outline: none;

  background: var(--lew-button-bg);
  color: var(--lew-button-color);
  border: var(--lew-button-border);

  &:hover {
    background: var(--lew-button-hover-bg);
  }
  &:active {
    background: var(--lew-button-active-bg);
  }
  &[disabled] {
    pointer-events: none;
    opacity: var(--lew-disabled-opacity);
  }

  &.lew-button-round {
    border-radius: 20px;
  }

  .lew-button-loading-icon {
    position: absolute;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: opacity 0.3s ease-in-out;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .lew-button-loading-isShow {
    opacity: 1;
  }

  .lew-button-content {
    position: relative;
    font-size: 0px;
  }

  .lew-button-loading-isShow {
    opacity: 1;
  }
}

.lew-button-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.lew-button-size-mini {
  min-width: 30px;
  height: calc(var(--lew-form-item-height-mini));
  line-height: calc(var(--lew-form-item-height-mini));
  font-size: var(--lew-form-font-size-mini);
  gap: 2px;
  padding: 0px 14px;

  .lew-button-text {
    font-size: var(--lew-form-font-size-mini);
    gap: 2px;
  }

  .lew-button-loading-icon {
    left: 7px;
  }
}

.lew-button-size-small {
  min-width: 40px;
  height: calc(var(--lew-form-item-height-small));
  line-height: calc(var(--lew-form-item-height-small));
  gap: 3px;
  padding: 0px 16px;

  .lew-button-text {
    font-size: var(--lew-form-font-size-small);
    gap: 3px;
  }

  .lew-button-loading-icon {
    left: 8px;
  }
}

.lew-button-size-medium {
  min-width: 50px;
  height: calc(var(--lew-form-item-height-medium));
  line-height: calc(var(--lew-form-item-height-medium));
  gap: 4px;
  padding: 0px 18px;

  .lew-button-text {
    font-size: var(--lew-form-font-size-medium);
    gap: 4px;
  }

  .lew-button-loading-icon {
    left: 9px;
  }
}

.lew-button-size-large {
  min-width: 60px;
  height: calc(var(--lew-form-item-height-large));
  line-height: calc(var(--lew-form-item-height-large));
  gap: 5px;
  padding: 0px 20px;

  .lew-button-text {
    font-size: var(--lew-form-font-size-large);
    gap: 5px;
  }

  .lew-button-loading-icon {
    left: 10px;
  }
}

.lew-button-singleIcon {
  .lew-button-loading-icon {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.lew-button-size-mini.lew-button-singleIcon {
  min-width: auto;
  padding: 0px;
  width: calc(var(--lew-form-item-height-mini));
  height: calc(var(--lew-form-item-height-mini));
}

.lew-button-size-small.lew-button-singleIcon {
  min-width: auto;
  padding: 0px;
  width: calc(var(--lew-form-item-height-small));
  height: calc(var(--lew-form-item-height-small));
}

.lew-button-size-medium.lew-button-singleIcon {
  min-width: auto;
  padding: 0px;
  width: calc(var(--lew-form-item-height-medium));
  height: calc(var(--lew-form-item-height-medium));
}

.lew-button-size-large.lew-button-singleIcon {
  min-width: auto;
  padding: 0px;
  width: calc(var(--lew-form-item-height-large));
  height: calc(var(--lew-form-item-height-large));
}

.lew-button.lew-button-loading.lew-button-singleIcon {
  padding: 0px;

  .lew-button-text {
    display: none;
  }

  .lew-button-icon {
    display: none;
  }
}

.lew-button-loading {
  cursor: progress;
  padding-left: 0px;
}

.lew-button-size-mini.lew-button-loading {
  padding-left: 24px;
}

.lew-button-size-small.lew-button-loading {
  padding-left: 27px;
}

.lew-button-size-medium.lew-button-loading {
  padding-left: 31px;
}

.lew-button-size-large.lew-button-loading {
  padding-left: 34px;
}

/* ================== 类型 & 颜色展开 ================== */
/* Mixin 用来减少重复 */
@mixin button-variant($name) {
  .lew-button-type-fill.lew-button-color-#{$name} {
    --lew-button-bg: var(--lew-color-#{$name});
    --lew-button-color: #fff;
    --lew-button-hover-bg: var(--lew-color-#{$name}-hover);
    --lew-button-active-bg: var(--lew-color-#{$name}-active);
  }
  .lew-button-type-light.lew-button-color-#{$name} {
    --lew-button-bg: var(--lew-color-#{$name}-light);
    --lew-button-color: var(--lew-color-#{$name}-dark);
    --lew-button-hover-bg: var(--lew-color-#{$name}-light-hover);
    --lew-button-active-bg: var(--lew-color-#{$name}-light-active);
  }
  .lew-button-type-ghost.lew-button-color-#{$name} {
    --lew-button-bg: transparent;
    --lew-button-border: var(--lew-form-border-width) solid var(--lew-color-#{$name}-dark);
    --lew-button-color: var(--lew-color-#{$name}-dark);
    --lew-button-hover-bg: var(--lew-bgcolor-2);
    --lew-button-active-bg: var(--lew-bgcolor-4);
    box-shadow: none;
  }
  .lew-button-type-text.lew-button-color-#{$name} {
    --lew-button-bg: transparent;
    --lew-button-color: var(--lew-color-#{$name}-dark);
    --lew-button-hover-bg: var(--lew-bgcolor-2);
    --lew-button-active-bg: var(--lew-bgcolor-4);
    box-shadow: none;
    border: none;
  }
}

/* 生成主题色 */
@include button-variant('blue');
@include button-variant('gray');
@include button-variant('red');
@include button-variant('green');
@include button-variant('yellow');
@include button-variant('indigo');
@include button-variant('purple');
@include button-variant('pink');
@include button-variant('orange');
@include button-variant('cyan');
@include button-variant('teal');
@include button-variant('mint');
@include button-variant('brown');
@include button-variant('black');
@include button-variant('error');
@include button-variant('success');
@include button-variant('warning');
@include button-variant('info');
@include button-variant('normal');
@include button-variant('primary');
@include button-variant('danger');
</style>
