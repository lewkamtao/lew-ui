<script setup lang="ts">
const tableData = ref([
  {
    name: 'John',
    age: 18,
    gender: 'Male',
  },
  {
    name: 'Mary',
    age: 20,
    gender: 'Female',
  },
  {
    name: 'David',
    age: 25,
    gender: 'Male',
  },
  {
    name: 'Sarah',
    age: 22,
    gender: 'Female',
  },
  {
    name: 'Michael',
    age: 30,
    gender: 'Male',
  },
  {
    name: 'Emma',
    age: 19,
    gender: 'Female',
  },
  {
    name: 'James',
    age: 27,
    gender: 'Male',
  },
  {
    name: 'Lisa',
    age: 24,
    gender: 'Female',
  },
  {
    name: 'Robert',
    age: 32,
    gender: 'Male',
  },
  {
    name: 'Anna',
    age: 21,
    gender: 'Female',
  },
]);
const columns = ref([
  {
    title: 'Name',
    field: 'name',
    required: true,
    width: 100,
  },
  {
    title: 'Age',
    field: 'age',
    required: true,
    as: 'input-number',
    width: 100,
  },
  {
    title: 'Gender',
    field: 'gender',
    as: 'tabs',
    required: true,
    props: {
      itemWidth: 80,
      options: [
        {
          label: 'Male',
          value: 'Male',
        },
        {
          label: 'Female',
          value: 'Female',
        },
      ],
    },
    width: 100,
  },
]);

const size = ref('medium');
const sizeOptions = ref([
  {
    label: 'Small',
    value: 'small',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Large',
    value: 'large',
  },
]);
const sortTooltipCustomRender = (row: Record<string, any>) => {
  return h('div', {}, `${row.name} ${row.age} ${row.gender}`);
};
</script>
<template>
  <lew-flex direction="y" x="start">
    <lew-tabs v-model="size" item-width="80px" round :options="sizeOptions" />
    <lew-input-table
      sortable
      :sortTooltipCustomRender="sortTooltipCustomRender"
      :size="size"
      width="500px"
      uniqueField="name"
      :columns="columns"
      v-model="tableData"
    ></lew-input-table>
  </lew-flex>
</template>
