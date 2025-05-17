<script setup lang="ts">
const tableData = ref([
  {
    name: "张三",
    age: 18,
    gender: "男",
  },
  {
    name: "李四",
    age: 20,
    gender: "女",
  },
]);
const columns = ref([
  {
    title: "姓名",
    field: "name",
    required: true,
    width: 100,
  },
  {
    title: "年龄",
    field: "age",
    required: true,
    as: "input-number",
    width: 100,
  },
  {
    title: "性别",
    field: "gender",
    as: "tabs",
    required: true,
    props: {
      itemWidth: 80,
      options: [
        {
          label: "男",
          value: "男",
        },
        {
          label: "女",
          value: "女",
        },
      ],
    },
    width: 100,
  },
]);

const size = ref("medium");
const sizeOptions = ref([
  {
    label: "小",
    value: "small",
  },
  {
    label: "中",
    value: "medium",
  },
  {
    label: "大",
    value: "large",
  },
]);
</script>
<template>
  <lew-flex direction="y" x="start">
    <lew-tabs v-model="size" item-width="50px" round :options="sizeOptions" />
    <lew-input-table
      :size="size"
      width="500px"
      uniqueField="name"
      :columns="columns"
      v-model="tableData"
    ></lew-input-table>
  </lew-flex>
</template>
