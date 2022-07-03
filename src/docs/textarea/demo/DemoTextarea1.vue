<script lang="ts" setup>
import { ref } from 'vue';
let v = ref('');
</script>

<template>
    <div style="width: 300px">
        <lew-form-item title="账号">
            <lew-textarea v-model="v" />
        </lew-form-item>
        值： {{ v }}
    </div>
</template>
