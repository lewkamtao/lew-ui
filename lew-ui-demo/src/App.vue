<script setup lang="ts">
import {
  LewButton, LewDropdown, LewMessage, DropdownOptions
} from "lew-ui"
import { ref } from 'vue'

const options = ref<DropdownOptions[]>([
  {
    label: '西游记',
    value: '1',
  },
  {
    label: '水浒传',
    value: '2',
  },
  {
    label: '三国演义',
    value: '3',
  },
  {
    label: '红楼梦',
    value: '4',
  },
]);

const change = (e: any) => {
  LewMessage.info(e.label);
};  
</script>

<template>
  <div>
    <lew-button>按钮</lew-button> <lew-button type="fill" round icon="message-circle" />
    <lew-dropdown :options="options" @change="change">
      <lew-button text="hover" />
    </lew-dropdown>
  </div>
</template>

<style scoped></style>
