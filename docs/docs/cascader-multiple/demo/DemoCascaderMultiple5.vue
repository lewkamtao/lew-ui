<script setup lang="ts">
const selectedProduct = ref();
const productCategories = [
  {
    value: "skincare",
    label: "Skincare",
    children: [
      {
        value: "cleanser",
        label: "Cleansers",
        children: [
          { value: "foam", label: "Foam Cleanser" },
          { value: "gel", label: "Gel Cleanser" },
          { value: "oil", label: "Cleansing Oil" },
        ],
      },
      {
        value: "moisturizer",
        label: "Moisturizers",
        children: [
          { value: "cream", label: "Cream" },
          { value: "lotion", label: "Lotion" },
          { value: "essence", label: "Essence" },
        ],
      },
    ],
  },
  {
    value: "makeup",
    label: "Makeup",
    children: [
      {
        value: "face",
        label: "Face Makeup",
        children: [
          { value: "foundation", label: "Foundation" },
          { value: "concealer", label: "Concealer" },
          { value: "powder", label: "Powder" },
        ],
      },
      {
        value: "eye",
        label: "Eye Makeup",
        children: [
          { value: "eyeshadow", label: "Eyeshadow" },
          { value: "eyeliner", label: "Eyeliner" },
          { value: "mascara", label: "Mascara" },
        ],
      },
    ],
  },
];

function handleChange(value: string[]) {
  console.log("Selected product categories:", value);
}
</script>

<template>
  <div style="width: 300px">
    <lew-cascader-multiple
      v-model="selectedProduct"
      clearable
      :options="productCategories"
      placeholder="Select Beauty Products"
      @change="handleChange"
    />
  </div>
</template>
