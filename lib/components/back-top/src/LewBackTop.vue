<script lang="ts" setup>
import { throttle } from 'lodash-es';
import { backTopProps } from './props';
import { useEventListener } from '../../../hooks';
import Icon from 'lew-ui/utils/Icon.vue';

const props = defineProps(backTopProps);

const emit = defineEmits(['click']);

const dom = shallowRef<HTMLElement>();

const showBackTop = ref(false);

const backTopStyle = computed(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`,
}));

const toBackUp = () => {
  if (!dom.value) return;
  const scrollDom = dom.value as HTMLElement;
  scrollDom.scrollTop = 0;

  emit('click');
};

const handleScroll = () => {
  if (dom.value) showBackTop.value = dom.value.scrollTop >= props.valveHeight;
};

const throttledScrollHandler = throttle(handleScroll, 250);

useEventListener(window, 'scroll', throttledScrollHandler);

onMounted(() => {
  dom.value = document.documentElement;
  if (props.target) {
    dom.value =
      document.querySelector<HTMLElement>(`.${props.target}`) ?? undefined;
    if (!dom.value) {
      throw new Error(`target is not existed: ${props.target}`);
    }
  }
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="showBackTop"
      class="lew-back-top"
      :style="backTopStyle"
      @click="toBackUp"
    >
      <slot>
        <Icon :size="20" type="chevron-up" />
      </slot>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.lew-back-top {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--lew-bgcolor-0);
  box-shadow: var(--lew-box-shadow);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: var(--lew-color-primary);
}
</style>
