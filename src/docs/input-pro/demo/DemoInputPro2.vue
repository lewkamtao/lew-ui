<script lang="ts" setup>
const clear = (e: any) => {
    console.log(e);
};
</script>

<template>
    <div style="width: 300px">
        <lew-form-item title="账号">
            <lew-input-pro clearable @clear="clear" />
        </lew-form-item>
        <lew-form-item title="密码">
            <lew-input-pro type="password" clearable />
        </lew-form-item>
    </div>
</template>
