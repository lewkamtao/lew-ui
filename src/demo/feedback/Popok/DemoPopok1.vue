<script setup lang="ts">
import { LewButton, LewPopok, LewMessage } from '../../../../packages';
// 确认
const ok = () => {
    LewMessage.success('确定');
};
// 取消
const cancel = () => {
    LewMessage.info('取消');
};
</script>

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
