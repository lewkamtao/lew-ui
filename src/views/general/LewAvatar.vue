<script setup lang="ts">
import DemoBox from '../../layout/DemoBox.vue';
import { LewTitle } from '../../../packages';
import { DemoAvatar1, DemoAvatar2 } from '../../demo';

import { ref } from 'vue';

let pre1 = ref(`<script setup lang="ts">
import { LewAvatar } from '../../../../packages';
import { ref } from 'vue';

let avatarUrl = ref(
    'https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/1fb3f5f5bf661efd985d940004b3642_pyapiq_.jpeg',
);
<\/script>

<template>
    <lew-avatar :src="avatarUrl" alt="avatar" />
    <lew-avatar round :src="avatarUrl" alt="avatar" />
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin-right: 20px;
}
<\/style>
`);
let pre2 = ref(`<script setup lang="ts">
import { LewAvatar } from '../../../../packages';
import { ref } from 'vue';

let avatarUrl = ref(
    'https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/1fb3f5f5bf661efd985d940004b3642_pyapiq_.jpeg',
);
<\/script>

<template>
    <lew-avatar :src="avatarUrl" status="online" status-position="top-left" />
    <lew-avatar :src="avatarUrl" status="busy" status-position="top-right" />
    <lew-avatar
        :src="avatarUrl"
        round
        status="away"
        status-position="bottom-left"
    />
    <lew-avatar
        :src="avatarUrl"
        round
        status="offline"
        status-position="bottom-right"
    />
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin-right: 20px;
}
<\/style>
`);
const docsTable = ref([
    {
        param: 'src',
        description: '头像链接',
        type: 'string',
        default: `''`,
    },
    {
        param: 'round',
        description: '头像形状，是否为圆形。',
        type: 'boolean',
        default: 'false',
    },
]);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Avatar</lew-title>
        <demo-box title="普通" :code="pre1">
            <demo-avatar1 />
        </demo-box>
        <demo-box title="普通" :code="pre2">
            <demo-avatar2 />
        </demo-box>
        <lew-title size="16px">Props</lew-title>
        <vxe-table :data="docsTable">
            <vxe-column field="param" title="参数名"></vxe-column>
            <vxe-column field="description" title="描述"></vxe-column>
            <vxe-column field="type" title="类型"></vxe-column>
            <vxe-column field="default" title="默认值"></vxe-column>
        </vxe-table>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
