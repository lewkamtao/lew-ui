<template>
    <lew-form direction="y" style="width: 300px">
        <lew-form-item label="小的">
            <lew-input size="small" />
        </lew-form-item>
        <lew-form-item label="常规">
            <lew-input />
        </lew-form-item>
        <lew-form-item label="大的">
            <lew-input size="large" />
        </lew-form-item>
        <lew-form-item label="密码可见">
            <lew-input type="password" show-password />
        </lew-form-item>
        <lew-form-item label="可清空">
            <lew-input type="password" clearable />
        </lew-form-item>
        <lew-form-item label="只读">
            <lew-input type="password" readonly />
        </lew-form-item>
        <lew-form-item label="禁用">
            <lew-input type="password" disabled />
        </lew-form-item>
        <lew-form-item label="展示数字">
            <lew-input show-count />
        </lew-form-item>
        <lew-form-item label="可清空 + 密码可见">
            <lew-input type="password" clearable show-password />
        </lew-form-item>
        <lew-form-item label="展示数字 + 可清空">
            <lew-input type="password" show-count clearable />
        </lew-form-item>
        <lew-form-item label="展示数字 + 密码可见">
            <lew-input type="password" show-count show-password />
        </lew-form-item>
        <lew-form-item label="展示数字 + 密码可见 + 可清空">
            <lew-input type="password" show-count show-password clearable />
        </lew-form-item>
        <lew-form-item label="字数限制">
            <lew-input show-count :max-length="30" />
        </lew-form-item>
        <lew-form-item label="宽度自适应">
            <lew-input auto-width />
        </lew-form-item>
    </lew-form>
</template>
