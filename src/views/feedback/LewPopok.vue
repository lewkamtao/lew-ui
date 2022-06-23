<script setup lang="ts">
import DemoBox from '../../layout/DemoBox.vue';
import { LewTitle } from '../../../packages';
import DemoPopok1 from '../../demo/feedback/Popok/DemoPopok1.vue';
import DemoPopok2 from '../../demo/feedback/Popok/DemoPopok2.vue';
import { ref } from 'vue';
let pre1 = ref(`<script setup lang="ts">
import { LewButton, LewPopok, LewMessage } from '../../../../packages';
// 确认
const ok = () => {
    LewMessage.success('确定');
};
// 取消
const cancel = () => {
    LewMessage.info('取消');
};
<\/script>

<template>
    <lew-popok
        title="删除确认"
        content="删除之后无法恢复，请确认！"
        @ok="ok"
        @cancel="cancel"
    > 
        <lew-button>click 触发</lew-button>
    </lew-popok>
</template>
`);
let pre2 = ref(`<script setup lang="ts">
import { LewButton, LewPopok, LewMessage } from '../../../../packages';

// 确认
const ok = () => {
    LewMessage.success('确定');
};
// 取消
const cancel = () => {
    LewMessage.info('取消');
};
<\/script> 

<template>
    <lew-popok
        title="删除确认"
        content="删除之后无法恢复，请确认！"
        trigger="hover"
        @ok="ok"
        @cancel="cancel"
    >
        <lew-button>hover 触发</lew-button>
    </lew-popok>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Popok</lew-title>
        <demo-box title="简单的询问" badge="click" :code="pre1">
            <demo-popok-1> </demo-popok-1>
        </demo-box>

        <demo-box title="简单的询问" badge="hover" :code="pre2">
            <demo-popok-2> </demo-popok-2>
        </demo-box>
    </div>
</template>
