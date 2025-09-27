<script setup lang="ts">
import type { LewCascaderOption } from "lew-ui/types";
import { LewCascader } from "lew-ui";

const cascaderValue = ref();
async function initMethod(): Promise<LewCascaderOption[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Promise.resolve([
    {
      label: "Beijing",
      value: "beijing",
      children: [
        {
          label: "Chaoyang District",
          value: "chaoyang",
          children: [
            { label: "Sanlitun", value: "sanlitun" },
            { label: "Guomao", value: "guomao" },
          ],
        },
        {
          label: "Haidian District",
          value: "haidian",
          children: [
            { label: "Zhongguancun", value: "zhongguancun" },
            { label: "Wudaokou", value: "wudaokou" },
          ],
        },
      ],
    },
    {
      label: "Shanghai",
      value: "shanghai",
      children: [
        {
          label: "Pudong New District",
          value: "pudong",
          children: [
            { label: "Lujiazui", value: "lujiazui" },
            { label: "Zhangjiang", value: "zhangjiang" },
          ],
        },
        {
          label: "Huangpu District",
          value: "huangpu",
          children: [
            { label: "The Bund", value: "waitan" },
            { label: "Nanjing Road", value: "nanjinglu" },
          ],
        },
      ],
    },
  ]);
}

const updateKey = ref(0);

function load() {
  updateKey.value++;
}
</script>

<template>
  <LewCascader
    :key="updateKey"
    v-model="cascaderValue"
    multiple
    :init-method="initMethod"
    placeholder="Please select region"
    width="300px"
  />
  <lew-button type="ghost" style="margin-top: 20px" @click="load">
    load again {{ updateKey }}
  </lew-button>
</template>
