<script lang="ts" setup>
import { menuProps, } from './props';
import { MenuOptions } from './props';
import LewMenuItem from './LewMenuItem.vue';
import { watchDebounced } from '@vueuse/core';

const props = defineProps(menuProps);

const generateEnterpriseMenu = (menuData: MenuOptions[], level: number = 1): MenuOptions[] => {
    return menuData.map((item) => {
        const { id, label, value, children, disabled, icon } = item;
        const menuItem: MenuOptions = {
            id,
            label,
            value,
            disabled,
            icon,
            level, // 添加 level 属性
        };

        if (level < 3 && children && children.length > 0) {
            menuItem.children = generateEnterpriseMenu(children, level + 1);
        }

        return menuItem;
    });
}


const watchOptions = { deep: true, debounce: 250, maxWait: 1000 };
const _options = ref([])

watchDebounced(
    () => props.options,
    () => {
        _options.value = generateEnterpriseMenu(props.options);
    },
    watchOptions
);

_options.value = generateEnterpriseMenu(props.options);


</script>

<template>
    <div class="lew-menu">
        <div class="lew-menu-main">
            <lew-menu-item :options="_options" />
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
