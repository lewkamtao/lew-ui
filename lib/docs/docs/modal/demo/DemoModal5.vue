<script setup lang="ts">
const visible1 = ref(false)
const visible2 = ref(false)

const ok1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      visible1.value = false
      resolve(true)
    }, 1000)
  })
}

const ok2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      visible2.value = false
      resolve(true)
    }, 1000)
  })
}
const close1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      visible1.value = false
      resolve(true)
    }, 1000)
  })
}

const close2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      visible2.value = false
      resolve(true)
    }, 1000)
  })
}
</script>

<template>
  <lew-flex x="start">
    <lew-button @click="visible1 = true">Product Details</lew-button>
  </lew-flex>
  <lew-modal
    v-model:visible="visible1"
    closeOnClickOverlay
    closeByEsc
    width="1000px"
    title="BILLY Bookcase"
    :closeButtonProps="{
      request: close1,
    }"
    :okButtonProps="{
      request: ok1,
    }"
  >
    <div class="modal-body">
      <div class="product-container">
        <lew-image
          previewGroupKey="cover"
          object-position="top"
          :width="500"
          :height="618.5"
          src="https://www.ikea.com/ext/ingkadam/m/25a9522d6281b1e6/original/PH198117.JPG?f=xl"
        />
        <div class="product-info">
          <h2>BILLY Bookcase</h2>
          <p class="price">$69.99</p>
          <div class="description">
            <p>Height: 79 1/2"</p>
            <p>Width: 31 1/2"</p>
            <p>Depth: 11"</p>
            <p>Material: Particleboard, Paper foil</p>
          </div>
          <div class="features">
            <h3>Product Features</h3>
            <ul>
              <li>Adjustable shelves</li>
              <li>Can be extended with additional units</li>
              <li>Perfect for books, decorative items, and more</li>
            </ul>
          </div>
          <lew-flex x="start">
            <lew-button @click="visible2 = true">Assembly Guide</lew-button>
          </lew-flex>
        </div>
      </div>
    </div>
  </lew-modal>

  <lew-modal
    v-model:visible="visible2"
    closeOnClickOverlay
    closeByEsc
    width="400px"
    title="Assembly Guide"
    :okButtonProps="{
      request: ok2,
    }"
    :closeButtonProps="{
      request: close2,
    }"
  >
    <div class="modal-body">
      <div class="assembly-container">
        <lew-image
          previewGroupKey="cover"
          object-position="top"
          width="100%"
          :height="200"
          src="https://www.ikea.com/ext/ingkadam/m/626443a5d2937a9/original/PH189246.jpg?f=xs"
        />
        <div class="assembly-steps">
          <h3>Assembly Steps</h3>
          <ol>
            <li>Attach back panel</li>
            <li>Install shelves</li>
            <li>Add door (optional)</li>
            <li>Secure to wall</li>
          </ol>
        </div>
      </div>
    </div>
  </lew-modal>
</template>
<style lang="scss" scoped>
.modal-body {
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  font-family: 'Noto Sans', sans-serif;
}

.product-container {
  display: flex;
  gap: 0px;
  align-items: flex-start;
}

.product-info {
  flex: 1;
  background-color: var(--lew-bgcolor-2);
  padding: 24px;
  box-shadow: var(--lew-box-shadow);

  h2 {
    font-size: 28px;
    margin-bottom: 12px;
    font-weight: 900;
    color: var(--lew-text-color-0);
    border-bottom: 2px solid var(--lew-color-primary-dark);
    padding-bottom: 8px;
  }

  .price {
    font-size: 24px;
    color: var(--lew-color-primary-dark);
    font-weight: 900;
    margin-bottom: 24px;
    background-color: var(--lew-color-primary-light);
    padding: 8px 16px;
    border-radius: var(--lew-border-radius-mini);
    display: inline-block;
  }

  .description {
    margin-bottom: 24px;
    color: var(--lew-text-color-2);
    background-color: var(--lew-bgcolor-0);
    padding: 16px;
    border-radius: var(--lew-border-radius-mini);

    p {
      margin: 8px 0;
      font-size: 15px;
      line-height: 1.5;
      display: flex;
      align-items: center;

      &::before {
        content: '•';
        color: var(--lew-color-primary-dark);
        margin-right: 8px;
        font-size: 18px;
      }
    }
  }

  .features {
    margin-bottom: 24px;
    background-color: var(--lew-bgcolor-0);
    padding: 16px;
    border-radius: var(--lew-border-radius-mini);

    h3 {
      margin-bottom: 12px;
      font-size: 18px;
      font-weight: 900;
      color: var(--lew-text-color-0);
      display: flex;
      align-items: center;

      &::before {
        content: '✨';
        margin-right: 8px;
      }
    }

    ul {
      padding-left: 24px;

      li {
        margin: 8px 0;
        font-size: 15px;
        line-height: 1.5;
        color: var(--lew-text-color-2);
        position: relative;

        &::marker {
          color: var(--lew-color-primary-dark);
        }
      }
    }
  }
}

.assembly-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.assembly-steps {
  width: 100%;
  background-color: var(--lew-bgcolor-1);
  padding: 16px;
  border-radius: var(--lew-border-radius-mini);
  box-sizing: border-box;
  h3 {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 900;
    color: var(--lew-text-color-0);
    display: flex;
    align-items: center;

    &::before {
      content: '📋';
      margin-right: 8px;
    }
  }

  ol {
    padding-left: 24px;

    li {
      margin: 8px 0;
      font-size: 15px;
      line-height: 1.5;
      color: var(--lew-text-color-2);
      position: relative;

      &::marker {
        color: var(--lew-color-primary-dark);
        font-weight: 900;
      }
    }
  }
}
</style>
