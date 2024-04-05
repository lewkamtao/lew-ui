<script setup lang="ts">
    import {
        DemoTree1,
        DemoTree2,
        DemoTree3,
        DemoTree4,
        DemoTree5,
        DemoTree6,
        DemoTree7,
        DemoTree1Code,
        DemoTree2Code,
        DemoTree3Code,
        DemoTree4Code,
        DemoTree5Code,
        DemoTree6Code,
        DemoTree7Code
    } from './demo';
    import LewDemoBox from '../../layout/LewDemoBox.vue';
    import LewDocsTables from '../../layout/LewDocsTables.vue';
    import * as API from './api';

    const options = ref(
        Object.keys(API).map((key: any) => {
            // @ts-ignore
            return API[key];
        })
    );
</script>
<template>
    <div class="demo-wrapper">
        <lew-title>Tree</lew-title>
        <lew-demo-box title="常规" :code="DemoTree1Code">
            <demo-tree1 />
        </lew-demo-box>
        <lew-demo-box title="单选模式" :code="DemoTree2Code">
            <demo-tree2 />
        </lew-demo-box>
        <lew-demo-box title="多选" :code="DemoTree3Code" a>
            <demo-tree3 />
            <lew-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'normal',
                        title: '提示',
                        content: `free 默认是开启的，可自由选择不受父子节点关联控制。`
                    }
                ]"
            />
        </lew-demo-box>
        <lew-demo-box title="多选（父子节点关联严格模式）" :code="DemoTree4Code">
            <demo-tree4 />
            <lew-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'normal',
                        title: '提示',
                        content: `当你手动关闭 free 后，这时候是一种受父子节点关联控制的严格模式。`
                    }
                ]"
            />
        </lew-demo-box>
        <lew-demo-box title="异步请求" :code="DemoTree5Code">
            <demo-tree5 />
        </lew-demo-box>
        <lew-demo-box title="默认全部展开" :code="DemoTree6Code">
            <demo-tree6 />
            <lew-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'normal',
                        title: '提示',
                        content: `当你设置默认展开的时候，初始化的时候会帮你全部展开，这时候展开收起不可切换，这是一个强制全部展开的模式，如果你需要展开收起切换，需要手动控制 expandedKeys，你可以借助某种算法来实现。`
                    }
                ]"
            />
        </lew-demo-box>
        <lew-demo-box title="是否展示checkbox" :code="DemoTree7Code">
            <demo-tree7 />
            <lew-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'normal',
                        title: '提示',
                        content: `当你手动关闭 free 后，这时候是一种受父子节点关联控制的严格模式。`
                    }
                ]"
            />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
