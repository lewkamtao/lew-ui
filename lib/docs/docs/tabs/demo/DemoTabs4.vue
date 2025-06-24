<script setup lang="ts">
const selectedLang = ref('go');

interface LangOption {
  label: string;
  value: string;
}

const langOptions: LangOption[] = [
  { label: 'Python', value: 'python' },
  { label: 'JavaScript', value: 'js' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'PHP', value: 'php' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'C#', value: 'cs' },
  { label: 'Scala', value: 'scala' },
  { label: 'R', value: 'r' },
  { label: 'Dart', value: 'dart' },
];

const handleLangChange = (option: LangOption) => {
  console.log(option);
  LewMessage.info(`您选择了: ${option.label}`);
};
</script>

<template>
  <lew-flex direction="y" x="start" y="start">
    <lew-tabs
      v-model="selectedLang"
      style="width: 100%"
      type="line"
      :options="langOptions"
      @change="handleLangChange"
    />
  </lew-flex>
</template>
