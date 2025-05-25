<script setup lang="ts">
import {
  PieChart,
  BarChart,
  Book,
  Flame,
  CheckSquare,
  Smile,
  Users,
  Palette,
} from "lucide-vue-next";

const options = ref([
  {
    label: "Data Analysis",
    value: "Data Analysis",
    children: [
      {
        label: "Dashboard",
        value: "Dashboard",
        icon: () => h(PieChart, { size: 14 }),
      },
      {
        label: "Performance",
        value: "Performance Monitoring",
        icon: () => h(BarChart, { size: 14 }),
      },
    ],
  },
  {
    label: "Content Management",
    value: "Content Management",
    children: [
      {
        label: "User Guide",
        value: "User Guide",
        icon: () => h(Book, { size: 14 }),
        tagProps: {
          text: "Beta",
          color: "green",
          type: "ghost",
          round: true,
        },
      },
      {
        label: "Hotspot Mgmt",
        value: "Hotspot Management",
        icon: () => h(Flame, { size: 14 }),
        tagProps: {
          text: "Beta",
          color: "green",
          type: "ghost",
          round: true,
        },
      },
      {
        label: "Checklist",
        value: "Checklist",
        icon: () => h(CheckSquare, { size: 14 }),
      },
      {
        label: "Satisfaction Survey",
        value: "Satisfaction Survey",
        icon: () => h(Smile, { size: 14 }),
        tagProps: {
          text: "HOT",
          color: "red",
          type: "ghost",
          round: true,
        },
      },
    ],
  },
  {
    label: "Settings",
    value: "Personalized Settings",
    children: [
      {
        label: "Group Mgmt",
        value: "Group Management",
        icon: () => h(Users, { size: 14 }),
      },
      {
        label: "Theme Settings",
        value: "Theme Settings",
        icon: () => h(Palette, { size: 14 }),
      },
    ],
  },
]);

let modelValue = ref("User Guide");

const change = (item: any) => {
  console.log(item);
};
</script>
<template>
  <div class="menu lew-scrollbar">
    <lew-menu :options="options" v-model="modelValue" @change="change" />
  </div>
</template>

<style lang="scss" scoped>
.menu {
  height: 600px;
  width: 250px;
  overflow-y: auto;
  border: 1px var(--lew-bgcolor-2) solid;
}
</style>
