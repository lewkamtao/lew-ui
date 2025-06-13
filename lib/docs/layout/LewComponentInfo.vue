<script setup lang="ts">
import { renderDescription } from "@/lib/utils";
const getComponentName = () => {
  const { path } = useRoute();
  return path
    .replace("/", "")
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^[A-Z]/, (letter) => letter.toLowerCase());
};
</script>

<template>
  <div>
    <lew-title>{{ $t(`components.${getComponentName()}.name`) }}</lew-title>
    <p
      class="sub-title"
      v-html="
        renderDescription($t(`components.${getComponentName()}.description`))
      "
    ></p>
  </div>
</template>

