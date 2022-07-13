<!--
 * @Author: Kamtao
 * @Date: 2022-07-13 12:13:00
 * @LastEditTime: 2022-07-13 17:19:58
 * @Description: 
-->
<script setup lang="ts">
import { ref } from 'vue';
let d = ref('2020-12-12');
</script>

<template>
    <lew-date-picker v-model="d"></lew-date-picker>
</template>
