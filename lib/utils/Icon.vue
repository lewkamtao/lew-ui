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
  ChevronsLeft,
  ChevronsRight,
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
  MoreHorizontal,
  RotateCw,
  Edit2
} from 'lucide-vue-next'
import { iconColorType, getColorType } from './index'

const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  dark: {
    type: Boolean,
    default: false
  },
  strokeWidth: {
    type: Number,
    default: 2
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
  normal: Info,
  warning: TriangleAlert,
  error: CircleAlert,
  info: BellRing,
  tips: Info,
  close: X,
  copy: Copy,
  loader: Loader,
  loading: Loader,
  check: Check,
  calendar: Calendar,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevrons-left': ChevronsLeft,
  'chevrons-right': ChevronsRight,
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
  'rotate-cw': RotateCw,
  'more-horizontal': MoreHorizontal,
  'edit-2': Edit2
}
</script>

<template>
  <component
    class="lew-icon"
    :class="{
      'lew-icon-spinning': spinning
    }"
    :style="{
      'animation-duration': speed,
      color: iconColorType[type]
        ? `var(--lew-color-${getColorType(type)}${dark ? '-dark' : ''})`
        : ''
    }"
    :strokeWidth
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
