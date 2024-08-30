<script setup lang="ts">
const fantasyCreatureOptions = ref([
  { label: '独角兽', value: 'unicorn' },
  { label: '凤凰', value: 'phoenix' },
  { label: '龙', value: 'dragon' },
  { label: '美人鱼', value: 'mermaid' },
  { label: '精灵', value: 'elf' }
])

const selectedCreature = ref('')
</script>

<template>
  <lew-flex direction="y" x="start">
    <lew-title :size="14">无图标选择</lew-title>
    <lew-radio-group v-model="selectedCreature" block :iconable="false" :options="fantasyCreatureOptions" />
    <br />
    <br />
    <lew-title :size="14">有图标选择</lew-title>
    <lew-radio-group v-model="selectedCreature" block size="small" :options="fantasyCreatureOptions" />
    <lew-radio-group v-model="selectedCreature" block :options="fantasyCreatureOptions" />
    <lew-radio-group v-model="selectedCreature" block size="large" :options="fantasyCreatureOptions" />
    <br />
    <br />
    <lew-title :size="14">禁用选项</lew-title>
    <lew-radio-group v-model="selectedCreature" disabled block size="large" :options="fantasyCreatureOptions" />
    <br />
    <br />
    <lew-title :size="14">只读选项</lew-title>
    <lew-radio-group v-model="selectedCreature" readonly block size="large" :options="fantasyCreatureOptions" />
  </lew-flex>
</template>
