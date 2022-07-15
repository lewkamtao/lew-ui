<template>
    <div style="width: 300px">
        <lew-form-item direction="y" title="常规的">
            <lew-input type="textarea" />
        </lew-form-item>
        <lew-form-item direction="y" title="可清空">
            <lew-input type="textarea" clearable />
        </lew-form-item>
        <lew-form-item direction="y" title="展示数字">
            <lew-input type="textarea" show-count />
        </lew-form-item>
        <lew-form-item direction="y" title="展示数字 + 可清空">
            <lew-input type="textarea" show-count clearable />
        </lew-form-item>
        <lew-form-item direction="y" title="字数限制">
            <lew-input type="textarea" show-count :max-length="30" />
        </lew-form-item>
        <lew-form-item direction="y" title="可缩放的">
            <lew-input
                type="textarea"
                resize="vertical"
                show-count
                :max-length="30"
            />
        </lew-form-item>
    </div>
</template>
