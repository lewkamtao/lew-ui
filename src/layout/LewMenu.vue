<script setup lang="ts">
    import { PropType } from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    type Item = {
        name: string;
        cname: string;
        path: string;
        label: string;
        type: string;
    };

    type Group = {
        title: string;
        items: Item[];
    };

    defineProps({
        group: {
            type: Array as PropType<Group[]>,
            default() {
                return [];
            }
        }
    });

    const toPath = (item: Item) => {
        router.push(item.path);
    };
</script>

<template>
    <div class="siderbar lew-scrollbar">
        <div v-for="(list, i) in group" :key="`group${i}`" class="group">
            <div v-if="list.title" class="title">
                <span> {{ list.title }}</span>
            </div>
            <div
                v-for="(item, j) in list.items"
                :key="`siderbar${j}`"
                class="item"
                :class="{ active: route.path === item.path }"
                :style="`animation-delay: ${(i * 5 + j) * 25}ms;`"
                @click="toPath(item)"
            >
                <span class="name"> {{ item.name }} </span>
                <LewBadge
                    v-if="item.label"
                    :type="item.type"
                    :value="item.label"
                    style="margin-left: 30px"
                >
                </LewBadge>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .siderbar {
        width: var(--lew-siderbar-width);
        height: 100%;
        overflow-y: scroll;
        border-right: var(--lew-border-1);
        user-select: none;

        .group {
            white-space: nowrap;
            margin-top: 20px;
            padding: 5px 0px 5px 20px;

            .title {
                margin: 20px 0px 15px 0px;
                padding: 0px 20px;
                font-size: 14px;
                font-weight: 400;
                height: 20px;
                color: var(--lew-text-color-9);
                overflow: hidden;
                span {
                    display: inline-block;
                    animation: fadeIn 1s ease;
                    animation-fill-mode: forwards;
                    animation-delay: 0.55s;
                    transform: translateY(100px);
                    opacity: 0;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(100px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0px);
                    }
                }
            }

            .item {
                display: flex;
                align-items: center;
                position: relative;
                height: 36px;
                line-height: 36px;
                padding-left: 20px;
                box-sizing: border-box;
                list-style: none;
                width: calc(100% - 20px);
                border-radius: var(--lew-border-radius);
                cursor: pointer;
                font-size: 14px;
                transform: translateX(50px);
                opacity: 0;
                color: var(--lew-text-color-6);
                animation: slideIn 0.75s ease;
                animation-fill-mode: forwards;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(50px);
                    opacity: 0;
                }

                to {
                    transform: translateX(0px);
                    opacity: 1;
                }
            }
            .item:hover {
                color: var(--lew-text-color-0);
                background: var(--lew-bgcolor-2);
            }

            .active {
                color: var(--lew-color-white-text);
                background: var(--lew-color-primary);
            }
            .active:hover {
                color: var(--lew-color-white-text);
                background: var(--lew-color-primary);
            }
        }

        .group:last-child {
            padding-bottom: 150px;
        }
    }
</style>
