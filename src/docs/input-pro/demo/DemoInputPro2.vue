<script lang="ts" setup>
const clear = (e: any) => {
    console.log(e);
};
let options = [
    {
        label: '愚不可及',
        value: '愚不可及',
    },
    {
        label: '有教无类',
        value: '有教无类',
    },
    {
        label: '欲罢不能',
        value: '欲罢不能',
    },
    {
        label: '用行舍藏',
        value: '用行舍藏',
    },
    {
        label: '择善而从',
        value: '择善而从',
    },
];
</script>

<template>
    <lew-form style="width: 300px">
        <lew-form-item direction="y" title="预输入">
            <lew-input-pro
                style="width: 250px"
                :options="options"
                clearable
                placement="left"
                @clear="clear"
            />
        </lew-form-item>
        <lew-form-item direction="y" title="预输入">
            <lew-input-pro
                style="width: 250px"
                :options="options"
                clearable
                placement="right-start"
                @clear="clear"
            />
        </lew-form-item>
        <lew-form-item direction="y" title="气泡方向自定义">
            <lew-input-pro
                style="width: 250px"
                popover-width="250px"
                :options="options"
                :arrow="false"
                clearable
            />
        </lew-form-item>
    </lew-form>
</template>
