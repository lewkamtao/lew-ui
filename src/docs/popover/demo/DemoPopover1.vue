<script setup lang="ts">
import { LewMessage } from 'lew-ui';
import { ref } from 'vue';

let v = ref('');
const submit = (instance: any) => {
    LewMessage.error(v.value || '密码不可为空');
    instance.hide();
};
</script>

<template>
    <lew-popover trigger="click" placement="bottom-start">
        <template #trigger>
            <lew-button>进入保险箱</lew-button>
        </template>
        <template #popover-body="{ instance }">
            <div class="popover-body" style="width: 300px">
                <lew-form-item direction="y" title="请输入密码">
                    <lew-input v-model="v" />
                </lew-form-item>
                <lew-flex x="end">
                    <lew-button
                        type="blank"
                        size="small"
                        @click="instance.hide()"
                        >取消
                    </lew-button>
                    <lew-button size="small" @click="submit(instance)"
                        >提交
                    </lew-button>
                </lew-flex>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.popover-body {
    padding: 15px;
    box-sizing: border-box;
}
</style>
