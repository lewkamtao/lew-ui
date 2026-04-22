<script lang="ts" setup>
const data: any = [
  {
    id: 1,
    brand: 'Supreme',
    founded: '1994',
    origin: 'USA',
    style: 'Streetwear',
    popularItems: ['Box Logo T-shirt', 'Hoodie', 'Skateboard'],
    description:
      'Known for its iconic red box logo and limited release strategy.',
  },
  {
    id: 2,
    brand: 'Off-White',
    founded: '2012',
    origin: 'Italy',
    style: 'High-end Streetwear',
    popularItems: ['Industrial Belt', 'Arrow T-shirt', 'Quotation Mark Shoes'],
    description:
      'Combines high fashion with street culture, known for unique quotation designs and diagonal stripe logo.',
  },
  {
    id: 3,
    brand: 'BAPE',
    founded: '1993',
    origin: 'Japan',
    style: 'Japanese Streetwear',
    popularItems: ['Shark Hoodie', 'Camo Pattern', 'Bapesta Sneakers'],
    description:
      'Famous for its unique camouflage patterns and cartoon ape head logo.',
  },
  {
    id: 4,
    brand: 'Palace',
    founded: '2009',
    origin: 'UK',
    style: 'Skate Culture',
    popularItems: [
      'Tri-Ferg Logo T-shirt',
      'Track Jacket',
      'Skateboard Accessories',
    ],
    description:
      'Originated from London skate culture, famous for its triangular logo and humorous designs.',
  },
]

const columns = [
  {
    title: 'ID',
    width: 50,
    field: 'id',
    x: 'center',
  },
  {
    title: 'Brand',
    width: 100,
    field: 'brand',
    x: 'start',
  },
  {
    title: 'Founded',
    width: 100,
    field: 'founded',
    x: 'center',
  },
  {
    title: 'Origin',
    width: 80,
    field: 'origin',
    x: 'center',
  },
  {
    title: 'Style',
    width: 100,
    field: 'style',
    x: 'start',
  },
  {
    title: 'Popular Items',
    width: 500,
    field: 'popularItems',
    x: 'start',
  },
  {
    title: 'Description',
    width: 350,
    field: 'description',
    x: 'start',
  },
]

const selectedKeys = ref<number[]>([])

function setSelectedBrands() {
  selectedKeys.value = [2, 3]
}
</script>

<template>
  <lew-flex style="width: 100%" direction="y" x="start">
    <lew-button style="margin-bottom: 10px" @click="setSelectedBrands">
      Set Default Selected Brands
    </lew-button>
    <div>Selected: {{ selectedKeys }}</div>
    <lew-table
      v-model:selected-keys="selectedKeys"
      :data-source="data"
      :columns="columns"
      checkable
      multiple
      row-key="id"
    >
      <template #popularItems="{ row }">
        <lew-flex gap="5px" x="start">
          <lew-tag
            v-for="(item, index) in row.popularItems"
            :key="index"
            type="light"
            color="blue"
          >
            {{ item }}
          </lew-tag>
        </lew-flex>
      </template>
    </lew-table>
  </lew-flex>
</template>
