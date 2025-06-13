<script setup lang="ts">
const data = ref({
  name: "Steve Jobs",
  title: "Co-founder of Apple Inc.",
  quote: "Stay hungry, stay foolish.",
});
</script>

<template>
  <lew-popover trigger="click" placement="bottom-start">
    <template #trigger>
      <lew-tag style="cursor: pointer">Steve Jobs</lew-tag>
    </template>
    <template #popover-body>
      <div class="popover-body">
        <lew-flex x="center" y="center">
          <lew-avatar
            size="120"
            shape="circle"
            src="https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/146d572968e09c8bdc4f45ef58ca110_cn9qli_.jpeg"
          />
        </lew-flex>

        <div class="info">
          <h3 class="name">{{ data.name }}</h3>
          <span class="title">{{ data.title }}</span>
        </div>

        <div class="quote">
          <p>"{{ data.quote }}"</p>
        </div>
      </div>
    </template>
  </lew-popover>
</template>

<style lang="scss" scoped>
.popover-body {
  padding: 16px;
  box-sizing: border-box;
  width: 280px;

  .info {
    margin: 16px 0;
    text-align: center;

    .name {
      margin: 0 0 4px;
      font-size: 18px;
      font-weight: 600;
      color: var(--lew-text-color-1);
    }

    .title {
      font-size: 14px;
      color: var(--lew-text-color-2);
    }
  }

  .quote {
    padding-top: 16px;
    border-top: 1px solid var(--lew-border-color);

    p {
      margin: 0;
      font-size: 14px;
      color: var(--lew-text-color-2);
      font-style: italic;
      text-align: center;
    }
  }
}
</style>
