<script setup lang="ts">
let value = ref('');
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input v-model="value" size="small" />
        <lew-input v-model="value" />
        <lew-input v-model="value" size="large" />
        <lew-input v-model="value" type="password" show-password />
        <lew-input v-model="value" type="password" clearable />
        <lew-input v-model="value" type="password" readonly />
        <lew-input v-model="value" type="password" disabled />
        <lew-input v-model="value" show-count />
        <lew-input v-model="value" type="password" clearable show-password />
        <lew-input v-model="value" type="password" show-count clearable />
        <lew-input v-model="value" type="password" show-count show-password />
        <lew-input
            v-model="value"
            type="password"
            show-count
            show-password
            clearable
        />
        <lew-input v-model="value" show-count :max-length="30" />
        <lew-input v-model="value" auto-width />
    </lew-flex>
</template>
