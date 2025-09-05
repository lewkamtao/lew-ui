<script lang="ts" setup>
import {
  ArrowDown,
  BellRing,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  ClockArrowUp,
  Copy,
  Edit2,
  Eye,
  EyeOff,
  FileCheck,
  GripVertical,
  Image,
  Info,
  Loader,
  Maximize2,
  Minimize2,
  Minus,
  MoreHorizontal,
  Plus,
  RotateCw,
  SquareMousePointer,
  Star,
  Trash,
  TriangleAlert,
  UploadCloud,
  UserRound,
  X,
  Tags,
} from "lucide-vue-next";
import { getColorType, iconColorType } from "../utils";

const props = defineProps({
  type: {
    type: String,
    default: "info",
  },
  dark: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "",
  },
  strokeWidth: {
    type: Number,
    default: 2,
  },
  size: {
    type: Number,
    default: 16,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  speed: {
    type: Number,
    default: 1,
  },
  fill: {
    type: String,
    default: "transparent",
  },
});

const iconMap: any = {
  "arrow-down": ArrowDown,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "chevrons-left": ChevronsLeft,
  "chevrons-right": ChevronsRight,
  "chevrons-up-down": ChevronsUpDown,
  "edit-2": Edit2,
  "maximize-2": Maximize2,
  "minimize-2": Minimize2,
  "more-horizontal": MoreHorizontal,
  "rotate-cw": RotateCw,
  "upload-cloud": UploadCloud,
  calendar: Calendar,
  check: Check,
  close: X,
  complete: FileCheck,
  copy: Copy,
  error: CircleAlert,
  image: Image,
  info: BellRing,
  loader: Loader,
  loading: Loader,
  minus: Minus,
  normal: Info,
  pending: ClockArrowUp,
  plus: Plus,
  success: CircleCheck,
  tips: Info,
  trash: Trash,
  uploading: Loader,
  warning: TriangleAlert,
  wrong_size: CircleAlert,
  wrong_type: CircleAlert,
  user: UserRound,
  eye: Eye,
  eye_off: EyeOff,
  star: Star,
  "square-mouse-pointer": SquareMousePointer,
  "grip-vertical": GripVertical,
  tags: Tags,
};
</script>

<template>
  <component
    :is="iconMap[props.type]"
    class="lew-icon"
    :class="{
      'lew-icon-loading': loading,
    }"
    :style="{
      'animation-duration': `${speed}s`,
      color: iconColorType[type]
        ? `var(--lew-color-${color ? color : getColorType(type)}${dark ? '-dark' : ''})`
        : '',
    }"
    :stroke-width
    :size
    :fill
  />
</template>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.lew-icon-loading {
  animation: spin 1s linear infinite;
}
</style>
