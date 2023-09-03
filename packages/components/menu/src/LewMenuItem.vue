<script lang="ts" setup>
import { menuProps } from './props';
defineProps(menuProps);
</script>

<template>
    <div v-for="item in options" class="lew-menu-item">
        {{ item.label }}
        <div :style="{ paddingLeft: `${item.level * 10}px` }">
            <lew-menu-item :options="item.children">{{ item.label }}</lew-menu-item>
        </div>
    </div>
</template>
 
<style lang="scss" scoped>
.lew-menu {
    display: inline;
    border-radius: 4px;
    padding: 2px 6px;
    margin: 0px 3px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
}
</style>
