<template>
    <div style="width: 300px">
        <lew-form-item direction="y" title="常规的">
            <lew-input />
        </lew-form-item>
        <lew-form-item direction="y" title="密码可见">
            <lew-input type="password" show-password />
        </lew-form-item>
        <lew-form-item direction="y" title="可清空">
            <lew-input type="password" clearable />
        </lew-form-item>
        <lew-form-item direction="y" title="展示数字">
            <lew-input show-count />
        </lew-form-item>
        <lew-form-item direction="y" title="可清空 + 密码可见">
            <lew-input type="password" clearable show-password />
        </lew-form-item>
        <lew-form-item direction="y" title="展示数字 + 可清空">
            <lew-input type="password" show-count clearable />
        </lew-form-item>
        <lew-form-item direction="y" title="展示数字 + 密码可见">
            <lew-input type="password" show-count show-password />
        </lew-form-item>
        <lew-form-item direction="y" title="展示数字 + 密码可见 + 可清空">
            <lew-input type="password" show-count show-password clearable />
        </lew-form-item>
        <lew-form-item direction="y" title="字数限制">
            <lew-input show-count :max-length="30" />
        </lew-form-item>
    </div>
</template>
