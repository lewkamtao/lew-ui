<script setup lang="ts">
const getOptions = (depth = 5, iterator = 1, prefix = '') => {
    const length = 12;
    const options: any = [];
    for (let i = 1; i <= length; ++i) {
        if (iterator === 1) {
            options.push({
                value: `v-${i}`,
                label: `l-${i}`,
                disabled: i % 5 === 0,
                children: getOptions(depth, iterator + 1, '' + String(i)),
            });
        } else if (iterator === depth) {
            options.push({
                value: `v-${prefix}-${i}`,
                label: `l-${prefix}-${i}`,
                disabled: i % 5 === 0,
            });
        } else {
            options.push({
                value: `v-${prefix}-${i}`,
                label: `l-${prefix}-${i}`,
                disabled: i % 5 === 0,
                children: getOptions(depth, iterator + 1, `${prefix}-${i}`),
            });
        }
    }
    return options;
};
const options = getOptions();
</script>

<template>
    <div style="width: 300px">
        <lew-cascader :options="options" />
    </div>
</template>
