<script setup lang="ts">
import type { LewTabsOption } from "lew-ui/types";

const options: LewTabsOption[] = [
  { label: "Nike", value: "nike" },
  { label: "Adidas", value: "adidas" },
  { label: "Puma", value: "puma" },
  { label: "Under Armour", value: "under_armour" },
  { label: "Reebok", value: "reebok" },
];

const value = ref("adidas");
</script>

<template>
  <lew-tabs v-model="value" :options="options" />
</template>
