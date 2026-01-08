<script setup lang="ts">
const options = ref([
  {
    label: 'Living Room Furniture',
    children: [
      {
        label: 'KIVIK Sofa',
        value: 'kivik',
      },
      {
        label: 'BILLY Bookcase',
        value: 'billy',
      },
      {
        label: 'KALLAX Shelf Unit',
        value: 'kallax',
      },
      {
        label: 'POÄNG Armchair',
        value: 'poang',
      },
      {
        label: 'LACK Coffee Table',
        value: 'lack',
      },
      {
        label: 'EKTORP Sofa',
        value: 'ektorp',
      },
      {
        label: 'VITTSJÖ TV Unit',
        value: 'vittsjo',
      },
      {
        label: 'BESTÅ TV Storage Combination',
        value: 'besta',
      },
    ],
  },
  {
    label: 'Bedroom Furniture',
    children: [
      {
        label: 'MALM Bed',
        value: 'malm',
      },
      {
        label: 'PAX Wardrobe',
        value: 'pax',
      },
      {
        label: 'HEMNES Bedside Table',
        value: 'hemnes',
      },
      {
        label: 'BRIMNES Bed Frame',
        value: 'brimnes',
      },
      {
        label: 'SONGESAND Wardrobe',
        value: 'songesand',
      },
      {
        label: 'TRYSIL Bed Frame',
        value: 'trysil',
      },
      {
        label: 'NORDLI Bedside Table',
        value: 'nordli',
      },
      {
        label: 'KULLEN 5-drawer Chest',
        value: 'kullen',
      },
    ],
  },
  {
    label: 'Kitchen Items',
    children: [
      {
        label: 'METOD Cabinet',
        value: 'metod',
      },
      {
        label: 'KNOXHULT Kitchen Base Cabinet',
        value: 'knoxhult',
      },
      {
        label: 'SUNNERSTA Mini-kitchen',
        value: 'sunnersta',
      },
      {
        label: 'TORNVIKEN Kitchen Island',
        value: 'tornviken',
      },
      {
        label: 'ENHET Kitchen Storage Combination',
        value: 'enhet',
      },
      {
        label: 'RÅSKOG Kitchen Cart',
        value: 'raskog',
      },
      {
        label: 'KUNGSFORS Kitchen Rail',
        value: 'kungsfors',
      },
    ],
  },
  {
    label: 'Office Furniture',
    children: [
      {
        label: 'MICKE Desk',
        value: 'micke',
      },
      {
        label: 'MARKUS Office Chair',
        value: 'markus',
      },
      {
        label: 'ALEX Drawer Unit',
        value: 'alex',
      },
      {
        label: 'BEKANT Sit/Stand Desk',
        value: 'bekant',
      },
      {
        label: 'MILLBERGET Swivel Chair',
        value: 'millberget',
      },
      {
        label: 'FLINTAN Office Chair',
        value: 'flintan',
      },
      {
        label: 'GALANT Filing Cabinet',
        value: 'galant',
      },
      {
        label: 'LÅNGFJÄLL Office Chair',
        value: 'langfjall',
      },
    ],
  },
])

const value = ref([])
</script>

<template>
  <lew-flex style="width: 320px" direction="y" gap="10px">
    <lew-select
      v-model="value"
      :options="options"
      placeholder="Select IKEA Product"
      searchable
    />
  </lew-flex>
</template>
