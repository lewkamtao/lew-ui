<script lang="ts" setup>
import { ref } from 'vue';
let v = ref('');
</script>
<template>
    <div style="width: 300px">
        <lew-form-item title="账号">
            <lew-input v-model="v" />
        </lew-form-item>
        <p>值：{{ v }}</p>
    </div>
</template>
