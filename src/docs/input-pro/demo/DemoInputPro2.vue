<script lang="ts" setup>
const clear = (e: any) => {
    console.log(e);
};
</script>

<template>
    <div style="width: 300px">
        <lew-form-item direction="y" title="预输入">
            <lew-input-pro
                style="width: 250px"
                :options="['梁山伯与朱丽叶', '小城故事多']"
                clearable
                placement="left"
                @clear="clear"
            />
        </lew-form-item>
        <lew-form-item direction="y" title="预输入">
            <lew-input-pro
                style="width: 250px"
                :options="['梁山伯与朱丽叶', '小城故事多']"
                clearable
                placement="right-start"
                @clear="clear"
            />
        </lew-form-item>
        <lew-form-item direction="y" title="气泡方向自定义">
            <lew-input-pro
                style="width: 250px"
                popover-width="250px"
                :options="['詹姆斯', '库里', '汤普森', '利拉德']"
                type="password"
                :arrow="false"
                clearable
            />
        </lew-form-item>
    </div>
</template>
