<script lang="ts" setup>
const num = ref(81414.2323)

function change() {
  num.value = Number((Math.random() * 100000).toFixed(2))
}
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-magic-text type="primary">
      在平坦的路面上曲折前行
    </lew-magic-text>
    <lew-magic-text type="error">
      在平坦的路面上曲折前行
    </lew-magic-text>
    <lew-magic-text type="warning">
      在平坦的路面上曲折前行
    </lew-magic-text>
    <lew-magic-text type="success">
      在平坦的路面上曲折前行
    </lew-magic-text>
    <lew-magic-text type="normal">
      在平坦的路面上曲折前行
    </lew-magic-text>
  </lew-flex>
</template>
