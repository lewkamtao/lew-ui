<script setup lang="ts">
import DocHeading from '../../../layout/DocHeading.vue'
</script>

<template>
  <DocHeading size="16">
    normal
  </DocHeading>
  <lew-flex x="start" y="end">
    <lew-tag size="small">
      Small
    </lew-tag>
    <lew-tag size="medium">
      Medium
    </lew-tag>
    <lew-tag size="large">
      Large
    </lew-tag>
  </lew-flex>
  <DocHeading class="demo-tag3-oversize-heading" size="16">
    oversize
  </DocHeading>
  <lew-flex x="start" y="end">
    <lew-tag size="small" oversize>
      Small
    </lew-tag>
    <lew-tag size="medium" oversize>
      Medium
    </lew-tag>
    <lew-tag size="large" oversize>
      Large
    </lew-tag>
  </lew-flex>
</template>

<style scoped>
.demo-tag3-oversize-heading {
  margin-top: 30px;
}
</style>
