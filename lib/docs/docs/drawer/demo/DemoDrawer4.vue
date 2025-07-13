<script setup lang="ts">
const visible = ref(false)
</script>
<template>
    <lew-flex gap="20" x="start">
        <lew-drawer
            title="New Product"
            close-by-esc
            v-model:visible="visible"
            position="right"
        >
            <lew-image
                preview-group-key="cover"
                object-position="top"
                :width="150"
                :height="150"
                src="https://app.tngeek.com/api_sso/open/file/b4c64ae_cat-8321993_1280.webp"
            />
        </lew-drawer>
        <lew-button text="Right" @click="visible = true" />
    </lew-flex>
</template>
