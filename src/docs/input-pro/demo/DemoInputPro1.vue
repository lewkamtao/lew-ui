<script lang="ts" setup>
import { ref } from 'vue';
let v = ref('');
</script>
<template>
    <div style="width: 300px">
        <lew-form-item direction="y" title="预输入">
            <lew-input-pro
                v-model="v"
                style="width: 250px"
                placement="top"
                :options="[
                    '愚不可及',
                    '欲罢不能',
                    '有教无类',
                    '用行舍藏',
                    '择善而从',
                ]"
            >
            </lew-input-pro>
        </lew-form-item>
        <p>值：{{ v }}</p>
    </div>
</template>
