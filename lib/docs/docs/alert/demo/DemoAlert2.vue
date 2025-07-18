<template>
  <lew-flex direction="y">
    <lew-alert type="error">
      <template #title>
        Sign In Failed
      </template>
      <template #content>
        Your sign-in attempt failed. Please check your username and
        password.
      </template>
    </lew-alert>

    <lew-alert type="success">
      <template #title>
        Registration Complete
      </template>
      <template #content>
        You have successfully registered for Google services.
      </template>
    </lew-alert>

    <lew-alert type="warning">
      <template #title>
        System Maintenance
      </template>
      <template #content>
        The system will be under maintenance tonight. Please complete your work
        in advance.
      </template>
    </lew-alert>

    <lew-alert type="info">
      <template #title>
        New Feature Available
      </template>
      <template #content>
        Google Photos is now available with enhanced photo management
        features.
      </template>
    </lew-alert>

    <lew-alert type="normal">
      <template #title>
        System Update Required
      </template>
      <template #content>
        Your system needs to be updated. Please update as soon as possible to
        ensure security.
      </template>
    </lew-alert>
  </lew-flex>
</template>
