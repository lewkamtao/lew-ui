<script lang="ts" setup>
import { ref } from 'vue';
let v = ref([]);
</script>
<template>
    <div>
        <lew-form-item direction="y" title="标签输入框">
            <lew-input-tag v-model="v" type="normal" />
        </lew-form-item>
        <p>值：{{ v }}</p>
    </div>
</template>
