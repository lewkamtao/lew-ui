<script setup lang="ts">
import { LewMessage } from 'lew-ui';
import { ref } from 'vue';

let v = ref('');
const popRef: any = ref(null);
const submit = () => {
    LewMessage.error(v.value || '密码不可为空');
    popRef.value.hide();
};
</script>

<template>
    <lew-popover ref="popRef" trigger="click" placement="bottom-start">
        <template #trigger>
            <lew-button>进入保险箱</lew-button>
        </template>
        <template #popover-body>
            <div class="popover-body">
                <lew-form-item direction="y" title="请输入密码">
                    <lew-input v-model="v" />
                </lew-form-item>

                <div class="footer">
                    <lew-button type="blank" size="small" @click="popRef.hide()"
                        >取消
                    </lew-button>
                    <lew-button size="small" @click="submit">提交</lew-button>
                </div>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.popover-body {
    padding: 15px;
    box-sizing: border-box;
    .footer {
        display: flex;
        justify-content: end;
        margin-top: -10px;
        .lew-button {
            margin-left: 10px;
        }
    }
}
</style>
