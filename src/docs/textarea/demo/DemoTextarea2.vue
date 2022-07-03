<template>
    <div style="width: 300px">
        <lew-form-item title="账号" direction="y">
            <lew-textarea show-count />
        </lew-form-item>

        <lew-form-item title="限制字数" direction="y">
            <lew-textarea show-count :max-length="30" />
        </lew-form-item>

        <lew-form-item title="中文算2个字符，英文算1个" direction="y">
            <lew-textarea show-count nice-count :max-length="30" />
        </lew-form-item>
    </div>
</template>
