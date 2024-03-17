<script setup lang="ts">
    import {
        DemoCascader1,
        DemoCascader2,
        DemoCascader3,
        DemoCascader4,
        DemoCascader5,
        DemoCascader6,
        DemoCascader7,
        DemoCascader8,
        DemoCascader9,
        DemoCascader10,
        DemoCascader1Code,
        DemoCascader2Code,
        DemoCascader3Code,
        DemoCascader4Code,
        DemoCascader5Code,
        DemoCascader6Code,
        DemoCascader7Code,
        DemoCascader8Code,
        DemoCascader9Code,
        DemoCascader10Code
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
        <lew-title>Cascader</lew-title>
        <lew-demo-box title="尺寸" :code="DemoCascader1Code">
            <demo-cascader1 />
        </lew-demo-box>
        <lew-demo-box title="自由模式" :code="DemoCascader2Code">
            <demo-cascader2 />
            <lew-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content: '开启free之后，可选择任意层级。关闭则仅可选择最后一级。'
                    }
                ]"
            />
        </lew-demo-box>
        <lew-demo-box title="仅展示最后层级" :code="DemoCascader3Code">
            <demo-cascader3 />
            <lew-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content:
                            '开启show-all-levels之后，搭配free模式，可选择任意层级。且仅展示最后层级。'
                    }
                ]"
            />
        </lew-demo-box>
        <lew-demo-box title="异步加载" :code="DemoCascader4Code">
            <demo-cascader4 />
            <lew-alert
                style="margin-top: 20px"
                :size="16"
                :list="[
                    {
                        type: 'info',
                        title: '提示',
                        content: '你可以传入一个异步的请求方法，当返回的树结构中，下钻数据中的 isLeaf 为 true 时，onload 不再触发。'
                    }
                ]"
            />
        </lew-demo-box>
        <lew-demo-box title="可清空的" :code="DemoCascader5Code">
            <demo-cascader5 />
        </lew-demo-box>
        <lew-demo-box title="选择器禁用" :code="DemoCascader6Code">
            <demo-cascader6 />
        </lew-demo-box>
        <lew-demo-box title="只读" :code="DemoCascader7Code">
            <demo-cascader7 />
        </lew-demo-box>
        <lew-demo-box title="选项禁用" :code="DemoCascader8Code">
            <demo-cascader8 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="多选模式" :code="DemoCascader9Code">
            <demo-cascader9 />
        </lew-demo-box>
        <lew-demo-box v-if="false" title="可选任意一级选项" :code="DemoCascader10Code">
            <demo-cascader10 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
