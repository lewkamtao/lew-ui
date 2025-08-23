<script lang="ts" setup>
import { orderBy } from 'lodash-es'

const data: any = ref([
  {
    id: 1,
    brand: 'Supreme',
    founded: '1994',
    origin: 'USA',
    style: 'Streetwear',
    popularItems: ['Box Logo T-shirt', 'Hoodies', 'Skateboards'],
    description:
      'Famous for its iconic red box logo and limited release strategy.',
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
      'Known worldwide for its distinctive camouflage patterns and cartoon ape head logo.',
  },
  {
    id: 4,
    brand: 'Palace',
    founded: '2009',
    origin: 'UK',
    style: 'Skate Culture',
    popularItems: ['Tri-Ferg Logo Tee', 'Track Jackets', 'Skate Accessories'],
    description:
      'Originated from London skate culture, famous for its triangular logo and humorous designs.',
  },
])

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
    width: 180,
    field: 'founded',
    sortable: true,
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
    width: 450,
    field: 'popularItems',
    x: 'start',
  },
  {
    title: 'Description',
    width: 350,
    field: 'description',
    type: 'text-trim',
    x: 'start',
  },
]

function sortChange(e: any) {
  if (e.founded) {
    data.value = orderBy(data.value, 'founded', e.founded)
  }
  else {
    data.value = orderBy(data.value, 'id', 'asc')
  }
}
</script>

<template>
  <lew-flex style="width: 100%" direction="y" x="start">
    <lew-table
      :data-source="data"
      :columns="columns"
      multiple
      row-key="id"
      @sort-change="sortChange"
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
