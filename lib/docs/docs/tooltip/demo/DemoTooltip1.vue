<script setup lang="ts">
const content = ref(
  "People are busy every day, pursuing money and status, indulging in trivial matters and worldly affairs. These things fill up life. In the end, how many people with such a life without blank spaces have won others but lost themselves?"
);
</script>

<template>
  <lew-flex direction="y" x="center" gap="30">
    <lew-flex width="400" mode="between">
      <lew-button
        v-tooltip="{
          content,
          placement: 'top-start',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="top-start"
      />
      <lew-button
        v-tooltip="{
          content,
          placement: 'top',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="top"
      />
      <lew-button
        v-tooltip="{
          content,
          placement: 'top-end',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="top-end"
      />
    </lew-flex>
    <lew-flex width="400" mode="between">
      <lew-button
        v-tooltip="{
          content,
          placement: 'left-start',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="left-start"
      />

      <lew-button
        v-tooltip="{
          content,
          placement: 'right-start',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="right-start"
      />
    </lew-flex>
    <lew-flex width="400" mode="between">
      <lew-button
        v-tooltip="{
          content,
          placement: 'left',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="left"
      />
      <lew-button
        v-tooltip="{
          content,
          placement: 'right',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="right"
      />
    </lew-flex>
    <lew-flex width="400" mode="between">
      <lew-button
        v-tooltip="{
          content,
          placement: 'left-end',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="left-end"
      />

      <lew-button
        v-tooltip="{
          content,
          placement: 'right-end',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="right-end"
      />
    </lew-flex>
    <lew-flex width="400" mode="between">
      <lew-button
        v-tooltip="{
          content,
          placement: 'bottom-start',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="bottom-start"
      />
      <lew-button
        v-tooltip="{
          content,
          placement: 'bottom',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="bottom"
      />
      <lew-button
        v-tooltip="{
          content,
          placement: 'bottom-end',
          trigger: 'mouseenter',
        }"
        type="ghost"
        text="bottom-end"
      />
    </lew-flex>
  </lew-flex>
</template>
