<script setup lang="ts">
import type { DropdownOptions } from "lew-ui";

const options = ref<DropdownOptions[]>([
  {
    label: "Edit Profile",
    onClick: () => {
      LewMessage.info("Edit Profile");
    },
  },
  {
    label: "Account Settings",
    onClick: () => {
      LewMessage.info("Account Settings");
    },
  },
  {
    isDividerLine: true,
  },
  {
    label: "Notifications",
    onClick: () => {
      LewMessage.info("Notifications");
    },
  },
  {
    label: "Sign Out",
    onClick: () => {
      LewMessage.info("Sign Out");
    },
  },
]);
</script>
<template>
  <lew-flex gap="30" x="start">
    <lew-dropdown :options="options">
      <lew-button text="Hover" type="fill" />
    </lew-dropdown>
    <lew-dropdown :options="options" trigger="click">
      <lew-button text="Click" type="ghost" />
    </lew-dropdown>
  </lew-flex>
</template>
