<script lang="ts" setup>
    import LewTree from './LewTree.vue';
    import { LewFlex, LewIcon } from 'lew-ui';
    import { treeProps } from './props';
    defineProps(treeProps);
    const emit = defineEmits(['add', 'edit', 'success']);
    let showTree = ref([] as any);
    const showhide = (id: any) => {
        let i = showTree.value.findIndex((e: any) => e == id);
        if (i >= 0) {
            showTree.value.splice(i, 1);
        } else {
            showTree.value.push(id);
        }
    };
    const checkShowTree = computed(() => (id: any) => {
        let i = showTree.value.findIndex((e: any) => e == id);
        return i >= 0;
    });
</script>

<template>
    <div class="lew-tree-wrapper">
        <lew-flex
            v-for="(item, index) in (options as any)"
            :key="index"
            direction="y"
            gap="0px"
            x="start"
        >
            <div
                class="lew-tree-item"
                :class="{
                    'lew-tree-item-expand': checkShowTree(item.value) && item.children.length > 0,
                    'lew-tree-item-leaf':
                        !item.children ||
                        (item.children && item.children.length === 0) ||
                        item.isLeaf
                }"
                @click.stop="showhide(item.value)"
            >
                <div class="lew-tree-chevron-right">
                    <lew-icon size="14px" type="chevron-right" />
                </div>
                <span>{{ item.label }} </span>
            </div>
            <div v-show="checkShowTree(item.value)" style="margin-left: 20px" direction="y">
                <lew-tree :options="item.children" />
            </div>
        </lew-flex>
    </div>
</template>
<style lang="scss" scoped>
    .lew-tree-item {
        display: inline-flex;
        align-items: center;
        padding: 4px 16px 4px 8px;
        border-radius: var(--lew-border-radius-mini);
        cursor: pointer;
        white-space: nowrap;
        user-select: none;
        .lew-tree-chevron-right {
            transform: rotate(0deg);
            transition: var(--lew-form-transition);
            width: 14px;
            display: inline-flex;
            align-items: center;
            margin-right: 5px;
        }
    }
    .lew-tree-item-leaf {
        .lew-tree-chevron-right {
            display: none;
        }
    }
    .lew-tree-item-expand {
        .lew-tree-chevron-right {
            transform: rotate(90deg);
        }
    }

    .lew-tree-item:hover {
        background-color: var(--lew-bgcolor-3);
        user-select: none;
        .edit-btn {
            opacity: 1;
        }
    }
</style>
