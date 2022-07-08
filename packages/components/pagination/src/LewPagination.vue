<!--
 * @Author: Kamtao
 * @Date: 2022-07-07 09:22:34
 * @LastEditTime: 2022-07-08 10:59:33
 * @Description: 
-->
<script lang="ts" setup>
import { paginationProps } from './porps';

defineProps(paginationProps);
</script>

<template>
    <div class="lew-pagination">
        <slot />
    </div>
</template>

<style lang="scss"></style>
