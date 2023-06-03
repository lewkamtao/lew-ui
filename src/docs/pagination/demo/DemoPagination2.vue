<script setup lang="ts">
const page = ref(1)
</script>

<template>
  <div>
    <lew-pagination
      v-model:current-page="page"
      :total="1000"
      :visible-pages-count="5"
    />
  </div>
  <div>
    <lew-pagination
      v-model:current-page="page"
      :total="10000"
      :visible-pages-count="7"
    />
  </div>
  <div>
    <lew-pagination
      v-model:current-page="page"
      :total="100000"
      :visible-pages-count="9"
    />
  </div>
  <div>
    <lew-pagination
      v-model:current-page="page"
      :total="15000000"
      :visible-pages-count="12"
    />
  </div>
</template>
