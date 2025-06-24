<script lang="ts" setup>
import Icon from 'lew-ui/utils/Icon.vue';

const props = defineProps({
  sortValue: {
    type: String,
  },
  size: {
    type: String,
    default: 'medium',
  },
});

const getSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 12;
    case 'medium':
      return 14;
    case 'large':
      return 16;
    default:
      return 14;
  }
});
</script>

<template>
  <lew-flex direction="y" gap="0" class="lew-table-sort-icon-wrapper">
    <Icon
      class="lew-table-sort-icon"
      :style="{
        opacity: sortValue === 'asc' ? 1 : 0.2,
        transform: 'rotate(180deg) translateY(-2px)',
        color: sortValue === 'asc' ? 'var(--lew-color-primary-dark)' : '',
      }"
      :size="getSize"
      :stroke-width="2.5"
      type="chevron-down"
    />
    <Icon
      class="lew-table-sort-icon"
      :style="{
        opacity: sortValue === 'desc' ? 1 : 0.2,
        transform: 'translateY(-2px)',
        color: sortValue === 'desc' ? 'var(--lew-color-primary-dark)' : '',
      }"
      :size="getSize"
      :stroke-width="2.5"
      type="chevron-down"
    />
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-table-sort-icon-wrapper {
  width: 20px;
}
</style>
