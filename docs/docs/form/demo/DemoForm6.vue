<script setup lang="ts">
import * as Yup from 'yup'

const options = ref([
  {
    field: 'category',
    label: 'Product Category',
    as: 'select',
    rule: Yup.string().required('Please select a category'),
    props: {
      clearable: true,
      initMethodId: 'categoryMethod',
    },
  },
  {
    field: 'tags',
    label: 'Product Tags',
    as: 'select',
    rule: Yup.array()
      .min(2, 'Please select at least 2 tags')
      .required('Please select tags'),
    props: {
      multiple: true,
      clearable: true,
      initMethodId: 'tagsMethod',
    },
  },
  {
    field: 'department',
    label: 'Department Structure',
    as: 'tree-select',
    rule: Yup.string().required('Please select a department'),
    props: {
      clearable: true,
      initMethodId: 'departmentMethod',
    },
  },
  {
    field: 'location',
    label: 'Warehouse Location',
    as: 'cascader',
    rule: Yup.string().required('Please select warehouse location'),
    props: {
      clearable: true,
      initMethodId: 'locationMethod',
      free: true,
    },
  },
])

const formMethods = {
  categoryMethod: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: 'Electronics', value: 'electronics' },
          { label: 'Clothing', value: 'clothing' },
          { label: 'Home & Garden', value: 'home_garden' },
          { label: 'Sports & Outdoors', value: 'sports' },
          { label: 'Books & Media', value: 'books' },
          { label: 'Automotive', value: 'automotive' },
          { label: 'Health & Beauty', value: 'health_beauty' },
          { label: 'Toys & Games', value: 'toys_games' },
        ])
      }, 3000)
    }),

  tagsMethod: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { label: 'New Arrival', value: 'new_arrival' },
          { label: 'Best Seller', value: 'best_seller' },
          { label: 'Limited Edition', value: 'limited_edition' },
          { label: 'On Sale', value: 'on_sale' },
          { label: 'Free Shipping', value: 'free_shipping' },
          { label: 'Premium Quality', value: 'premium_quality' },
          { label: 'Eco Friendly', value: 'eco_friendly' },
          { label: 'Customer Favorite', value: 'customer_favorite' },
        ])
      }, 3000)
    }),

  departmentMethod: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            key: 'sales',
            label: 'Sales Department',
            children: [
              {
                key: 'sales_online',
                label: 'Online Sales',
                children: [
                  {
                    key: 'sales_online_retail',
                    label: 'Retail Sales',
                  },
                  {
                    key: 'sales_online_wholesale',
                    label: 'Wholesale Sales',
                  },
                ],
              },
              {
                key: 'sales_offline',
                label: 'Offline Sales',
                children: [
                  {
                    key: 'sales_offline_store',
                    label: 'Store Sales',
                  },
                  {
                    key: 'sales_offline_partner',
                    label: 'Partner Sales',
                  },
                ],
              },
            ],
          },
          {
            key: 'marketing',
            label: 'Marketing Department',
            children: [
              {
                key: 'marketing_digital',
                label: 'Digital Marketing',
                children: [
                  {
                    key: 'marketing_digital_social',
                    label: 'Social Media',
                  },
                  {
                    key: 'marketing_digital_seo',
                    label: 'SEO & SEM',
                  },
                ],
              },
              {
                key: 'marketing_traditional',
                label: 'Traditional Marketing',
                children: [
                  {
                    key: 'marketing_traditional_print',
                    label: 'Print Media',
                  },
                  {
                    key: 'marketing_traditional_tv',
                    label: 'TV & Radio',
                  },
                ],
              },
            ],
          },
          {
            key: 'operations',
            label: 'Operations Department',
            children: [
              {
                key: 'operations_logistics',
                label: 'Logistics',
                children: [
                  {
                    key: 'operations_logistics_warehouse',
                    label: 'Warehouse Management',
                  },
                  {
                    key: 'operations_logistics_shipping',
                    label: 'Shipping & Delivery',
                  },
                ],
              },
              {
                key: 'operations_customer',
                label: 'Customer Service',
                children: [
                  {
                    key: 'operations_customer_support',
                    label: 'Support Team',
                  },
                  {
                    key: 'operations_customer_returns',
                    label: 'Returns & Refunds',
                  },
                ],
              },
            ],
          },
        ])
      }, 3000)
    }),

  locationMethod: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            label: 'North America',
            value: 'north_america',
            children: [
              {
                label: 'United States',
                value: 'us',
                children: [
                  { label: 'New York', value: 'ny' },
                  { label: 'Los Angeles', value: 'la' },
                  { label: 'Chicago', value: 'chicago' },
                  { label: 'Houston', value: 'houston' },
                ],
              },
              {
                label: 'Canada',
                value: 'canada',
                children: [
                  { label: 'Toronto', value: 'toronto' },
                  { label: 'Vancouver', value: 'vancouver' },
                  { label: 'Montreal', value: 'montreal' },
                ],
              },
            ],
          },
          {
            label: 'Europe',
            value: 'europe',
            children: [
              {
                label: 'United Kingdom',
                value: 'uk',
                children: [
                  { label: 'London', value: 'london' },
                  {
                    label: 'Manchester',
                    value: 'manchester',
                  },
                  {
                    label: 'Birmingham',
                    value: 'birmingham',
                  },
                ],
              },
              {
                label: 'Germany',
                value: 'germany',
                children: [
                  { label: 'Berlin', value: 'berlin' },
                  { label: 'Munich', value: 'munich' },
                  { label: 'Hamburg', value: 'hamburg' },
                ],
              },
            ],
          },
          {
            label: 'Asia Pacific',
            value: 'asia_pacific',
            children: [
              {
                label: 'China',
                value: 'china',
                children: [
                  { label: 'Shanghai', value: 'shanghai' },
                  { label: 'Beijing', value: 'beijing' },
                  { label: 'Shenzhen', value: 'shenzhen' },
                ],
              },
              {
                label: 'Japan',
                value: 'japan',
                children: [
                  { label: 'Tokyo', value: 'tokyo' },
                  { label: 'Osaka', value: 'osaka' },
                  { label: 'Yokohama', value: 'yokohama' },
                ],
              },
            ],
          },
        ])
      }, 3000)
    }),
}

const updateKey = ref(0)

function loadAgain() {
  updateKey.value++
}
</script>

<template>
  <lew-form
    :key="updateKey"
    :form-methods="formMethods"
    direction="y"
    :options="options"
    width="320px"
  />
  <lew-button style="margin-top: 20px" @click="loadAgain">
    Load again
  </lew-button>
</template>
