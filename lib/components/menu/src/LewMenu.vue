<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core';
import { LewTextTrim, LewTag } from 'lew-ui';
import { menuProps, MenuOptions } from './props';

const props = defineProps(menuProps);

const emit = defineEmits(['change']);

const generateEnterpriseMenu = (
    menuData: MenuOptions[],
    level = 1
): MenuOptions[] => {
    return menuData.map((item) => {
        const { children } = item;
        const menuItem: MenuOptions = {
            ...item,
            level, // 添加 level 属性
        };

        if (level < 3 && children && children.length > 0) {
            menuItem.children = generateEnterpriseMenu(children, level + 1);
        }

        return menuItem;
    });
};

const watchOptions = { deep: true, debounce: 250, maxWait: 1000 };
const _options = ref<MenuOptions[]>([]);

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
        <template v-for="(item, index) in _options" :key="item.label">
            <div class="lew-menu-item">
                <lew-text-trim :text="item.label" />
                <lew-tag
                    v-if="item.tagText"
                    :color="item.tagColor"
                    round
                    size="small"
                    type="light"
                    >{{ item.tagText }}
                </lew-tag>
            </div>
            <template
                v-for="(cItem, index) in item.children"
                :key="cItem.label"
            >
                <div
                    class="lew-menu-item lew-menu-item-child"
                    :class="{
                        'lew-menu-item-last':
                            item.children && index === item.children.length - 1,
                        'lew-menu-item-actived': cItem.value === actived,
                    }"
                    @click="emit('change', cItem)"
                >
                    <lew-icon
                        v-if="cItem.icon"
                        class="lew-menu-icon"
                        :type="cItem.icon"
                        size="14"
                    ></lew-icon>
                    <lew-text-trim :text="cItem.label" />
                    <lew-tag
                        v-if="cItem.tagText"
                        :color="cItem.tagColor"
                        round
                        size="small"
                        type="light"
                        >{{ cItem.tagText }}
                    </lew-tag>
                </div>
            </template>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.lew-menu {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-radius: 4px;
    padding: 2px 6px;
    margin: 0px 3px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    height: auto;
    max-width: 300px;

    .lew-menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--lew-text-color-8);
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        font-weight: 400;
        padding: 0px 15px;
        box-sizing: border-box;
    }
    .lew-menu-item-child {
        color: var(--lew-text-color-3);
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        border-radius: var(--lew-border-radius);
        transition: var(--lew-form-transition);
    }
    .lew-menu-icon {
        flex-shrink: 0;
    }
    .lew-menu-item-child:hover {
        background-color: var(--lew-bgcolor-2);
        color: var(--lew-text-color-1);
    }
    .lew-menu-item-actived {
        background-color: var(--lew-color-primary-light);
        color: var(--lew-color-primary-dark);
    }
    .lew-menu-item-actived:hover {
        background-color: var(--lew-color-primary-light);
        color: var(--lew-color-primary-dark);
    }
    .lew-menu-item-last {
        margin-bottom: 20px;
    }
}
</style>
