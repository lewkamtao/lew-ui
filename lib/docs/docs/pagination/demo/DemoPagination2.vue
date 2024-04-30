<script setup lang="ts">
const page = ref(1)
</script>

<template>
  <div>
    <lew-pagination v-model:current-page="page" :total="1000" :visiblePagesCount="5" />
  </div>
  <div>
    <lew-pagination v-model:current-page="page" :total="10000" :visiblePagesCount="7" />
  </div>
  <div>
    <lew-pagination v-model:current-page="page" :total="100000" :visiblePagesCount="9" />
  </div>
  <div>
    <lew-pagination v-model:current-page="page" :total="15000000" :visiblePagesCount="11" />
  </div>
</template>
