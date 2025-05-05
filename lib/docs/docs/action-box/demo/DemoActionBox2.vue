<script setup lang="ts">
import { template } from "lodash-es";
import {
  MoreHorizontal,
  Edit,
  Delete,
  Copy,
  Download,
  Share,
  View,
  Archive,
  Settings,
} from "lucide-vue-next";
import { ref, h } from "vue";

const options = ref([
  {
    label: "Edit",
    icon: () => h(Edit, { size: 14 }),
    onClick: () => {
      console.log("Edit");
    },
  },
  {
    label: "Delete",
    icon: () => h(Delete, { size: 14 }),
    onClick: () => {
      console.log("Delete");
    },
  },
  {
    label: "Copy",
    icon: () => h(Copy, { size: 14 }),
    onClick: () => {
      console.log("Copy");
    },
  },
  {
    label: "Download",
    icon: () => h(Download, { size: 14 }),
    onClick: () => {
      console.log("Download");
    },
  },
  {
    label: "Share",
    icon: () => h(Share, { size: 14 }),
    onClick: () => {
      console.log("Share");
    },
  },
  {
    label: "View",
    icon: () => h(View, { size: 14 }),
    onClick: () => {
      console.log("View");
    },
  },
  {
    label: "Archive",
    icon: () => h(Archive, { size: 14 }),
    onClick: () => {
      console.log("Archive");
    },
  },
  {
    label: "Settings",
    icon: () => h(Settings, { size: 14 }),
    onClick: () => {
      console.log("Settings");
    },
  },
]);
</script>
<template>
  <lew-action-box :options="options" :dropdown-threshold="2" />
</template>
