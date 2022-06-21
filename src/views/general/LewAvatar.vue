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
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
