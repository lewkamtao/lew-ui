<script setup lang="ts">
interface TabOption {
  label: string
  value: string
}
const options: TabOption[] = [
  { label: 'Fresh Fruits', value: 'fresh_fruit' },
  { label: 'Vegetables', value: 'vegetables' },
  { label: 'Meat', value: 'meat' },
  { label: 'Seafood', value: 'seafood' },
  { label: 'Dairy', value: 'dairy' },
  { label: 'Snacks', value: 'snacks' },
  { label: 'Drinks', value: 'drinks' },
  { label: 'Household Items', value: 'household_items' },
  { label: 'Personal Care', value: 'personal_care' },
  { label: 'Baby Care', value: 'baby_care' },
  { label: 'Baking', value: 'baking' },
  { label: 'Frozen Food', value: 'frozen_food' },
  { label: 'Seasonings', value: 'seasonings' },
  { label: 'Dry Goods', value: 'dry_goods' },
  { label: 'Liquor', value: 'liquor' },
  { label: 'Instant Food', value: 'instant_food' },
  { label: 'Snack Food', value: 'snack_food' },
  { label: 'Imported Food', value: 'imported_food' },
  { label: 'Organic Food', value: 'organic_food' },
  { label: 'Health Supplements', value: 'health_supplements' },
  { label: 'Cleaning Products', value: 'cleaning_products' },
  { label: 'Beauty Care', value: 'beauty_care' },
  { label: 'Kitchen Ware', value: 'kitchen_ware' },
  { label: 'Household Appliances', value: 'household_appliances' },
  { label: 'Mobile Electronics', value: 'mobile_electronics' },
  { label: 'Clothing and Footwear', value: 'clothing_footwear' },
  { label: 'Sports and Outdoors', value: 'sports_outdoors' },
  { label: 'Office Supplies', value: 'office_supplies' },
  { label: 'Books and Audio Video', value: 'books_audio_video' },
  { label: 'Toys', value: 'toys' },
  { label: 'Pet Supplies', value: 'pet_supplies' },
  { label: 'Car Supplies', value: 'car_supplies' },
  { label: 'Tea', value: 'tea' },
  { label: 'Coffee', value: 'coffee' },
  { label: 'Nutrition and Health', value: 'nutrition_health' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Garden Supplies', value: 'garden_supplies' },
  { label: 'Holiday Gifts', value: 'holiday_gifts' },
  { label: 'Bags', value: 'bags' },
]

const modelValue = ref('meat')
</script>

<template>
  <lew-tabs v-model="modelValue" :options="options" />
</template>
