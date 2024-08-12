<script setup lang="ts">
import P_1 from './playground/P_1.vue'
import P_2 from './playground/P_2.vue'
import P_3 from './playground/P_3.vue'

const route = useRoute()
const { id }: any = route.query

const componentMap: Record<string, any> = {
  '1': P_1,
  '2': P_2,
  '3': P_3
}
</script>

<template>
  <component :is="componentMap[id]"></component>
</template>
