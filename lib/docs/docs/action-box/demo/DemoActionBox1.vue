<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { ref, h } from "vue";

const options = ref([
  {
    label: "Edit",
    onClick: () => {
      console.log("Edit");
    },
  },
  {
    label: "Delete",
    onClick: () => {
      console.log("Delete");
    },
  },
  {
    label: "Copy",
    onClick: () => {
      console.log("Copy");
    },
  },
  {
    label: "Download",
    onClick: () => {
      console.log("Download");
    },
  },
  {
    label: "Share",
    onClick: () => {
      console.log("Share");
    },
  },
  {
    label: "View",
    onClick: () => {
      console.log("View");
    },
  },
  {
    label: "Archive",
    onClick: () => {
      console.log("Archive");
    },
  },
  {
    label: "Settings",
    onClick: () => {
      console.log("Settings");
    },
  },
]);
</script>
<template>
  <lew-action-box :options="options" :dropdown-threshold="2" />
</template>
