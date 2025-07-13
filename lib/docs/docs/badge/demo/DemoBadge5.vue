<script setup lang="ts">
import { Home } from 'lucide-vue-next'
</script>
<template>
    <lew-flex wrap x="start" gap="30">
        <lew-badge round color="red" processing>
            <Home />
        </lew-badge>
        <lew-badge round color="blue" text="Processing" processing />
    </lew-flex>
</template>
