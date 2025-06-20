<script setup lang="ts">
const visible = ref(false)
const productData = ref({
  name: 'iPhone 15 Pro',
  price: '$999',
  description:
    'The latest iPhone with advanced features including A17 Pro chip, titanium design, and professional camera system.',
  category: 'electronics',
  brand: 'Apple',
  model: 'A3102',
  color: 'Natural Titanium',
  storage: '256GB',
  condition: 'New',
  warranty: '1 Year',
  stock: 15
})

const categories = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Home', value: 'home' },
  { label: 'Sports', value: 'sports' }
]

const handleEdit = () => {
  console.log('Edit product data:', productData.value)
  visible.value = false
}

const handleCancel = () => {
  visible.value = false
}
</script>
<template>
  <lew-flex gap="20" x="start">
    <lew-drawer
      title="Product Details"
      v-model:visible="visible"
      close-on-click-overlay
      position="right"
      width="500px"
    >
      <div class="product-details">
        <lew-flex direction="column" gap="16">
          <div class="product-header">
            <h3>{{ productData.name }}</h3>
            <div class="price">{{ productData.price }}</div>
          </div>

          <div class="product-info">
            <div class="info-item">
              <span class="label">Brand:</span>
              <span class="value">{{ productData.brand }}</span>
            </div>
            <div class="info-item">
              <span class="label">Model:</span>
              <span class="value">{{ productData.model }}</span>
            </div>
            <div class="info-item">
              <span class="label">Color:</span>
              <span class="value">{{ productData.color }}</span>
            </div>
            <div class="info-item">
              <span class="label">Storage:</span>
              <span class="value">{{ productData.storage }}</span>
            </div>
            <div class="info-item">
              <span class="label">Condition:</span>
              <span class="value">{{ productData.condition }}</span>
            </div>
            <div class="info-item">
              <span class="label">Warranty:</span>
              <span class="value">{{ productData.warranty }}</span>
            </div>
            <div class="info-item">
              <span class="label">Stock:</span>
              <span class="value">{{ productData.stock }} units</span>
            </div>
          </div>

          <div class="product-description">
            <h4>Description</h4>
            <p>{{ productData.description }}</p>
          </div>
        </lew-flex>
      </div>

      <template #footer>
        <lew-flex class="lew-drawer-footer" x="end" gap="10">
          <lew-button
            size="small"
            color="gray"
            type="text"
            @click="handleCancel"
            >Cancel</lew-button
          >
          <lew-button size="small" @click="handleEdit">Edit Product</lew-button>
        </lew-flex>
      </template>
    </lew-drawer>
    <lew-button text="View Product Details" @click="visible = true" />
  </lew-flex>
</template>

<style lang="scss" scoped>
.product-details {
  padding: 20px;

  .product-header {
    border-bottom: 1px solid var(--lew-border-color);
    padding-bottom: 16px;
    margin-bottom: 16px;

    h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
    }

    .price {
      font-size: 20px;
      font-weight: 700;
      color: var(--lew-primary-color);
    }
  }

  .product-info {
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid var(--lew-border-color-light);

      .label {
        font-weight: 500;
        color: var(--lew-text-color-secondary);
      }

      .value {
        font-weight: 600;
      }
    }
  }

  .product-description {
    margin-top: 16px;

    h4 {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--lew-text-color-secondary);
    }

    p {
      margin: 0;
      line-height: 1.6;
      color: var(--lew-text-color);
    }
  }
}

.lew-drawer-footer {
  padding: 10px;
}
</style>
