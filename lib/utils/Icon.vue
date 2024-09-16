<script lang="ts" setup>
import {
  CircleCheck,
  Info,
  TriangleAlert,
  CircleAlert,
  BellRing,
  X,
  Copy,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader,
  Check,
  Calendar,
  Minimize2,
  Maximize2,
  Trash,
  ClockArrowUp,
  FileCheck,
  UploadCloud,
  Minus,
  Image,
  Plus,
  MoreHorizontal
} from 'lucide-vue-next'
import { getColorType } from './index'
import { isString } from 'lodash-es'

const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  dark: {
    type: Boolean,
    default: false
  },
  size: {
    type: Number,
    default: 16
  },
  spinning: {
    type: Boolean,
    default: false
  },
  speed: {
    type: Number,
    default: 1
  }
})
const iconMap: any = {
  success: CircleCheck,
  normal: BellRing,
  warning: TriangleAlert,
  error: CircleAlert,
  info: Info,
  close: X,
  copy: Copy,
  loader: Loader,
  check: Check,
  calendar: Calendar,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  trash: Trash,
  'minimize-2': Minimize2,
  'maximize-2': Maximize2,
  uploading: Loader,
  pending: ClockArrowUp,
  complete: FileCheck,
  wrong_type: CircleAlert,
  wrong_size: CircleAlert,
  'upload-cloud': UploadCloud,
  minus: Minus,
  image: Image,
  plus: Plus,
  'more-horizontal': MoreHorizontal
}

const status = [
  'normal',
  'warning',
  'success',
  'error',
  'danger',
  'info',
  'primary'
]
</script>

<template>
  <component
    class="lew-icon"
    :class="{
      'lew-icon-spinning': spinning
    }"
    :style="{
      'animation-duration': speed,
      color: status.includes(type)
        ? `var(--lew-color-${getColorType(type)}${dark ? '-dark' : ''})`
        : ''
    }"
    :size
    :is="iconMap[props.type]"
  ></component>
</template>
<style lang="scss" scoped>
@keyframes vue-feather--spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.lew-icon-spinning {
  animation: vue-feather--spin 1s linear infinite;
}
</style>
