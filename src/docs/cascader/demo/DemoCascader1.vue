<script setup lang="ts">
const getOptions = (depth = 3, iterator = 1, prefix = '') => {
    const length = 120;
    const options: any = [];
    for (let i = 1; i <= length; ++i) {
        if (iterator === 1) {
            options.push({
                value: `广东-${i}`,
                label: `广东-${i}`,
                disabled: i % 5 === 0,
                children: getOptions(depth, iterator + 1, '' + String(i)),
            });
        } else if (iterator === depth) {
            options.push({
                value: `广东-${prefix}-${i}`,
                label: `广东-${prefix}-${i}`,
                disabled: i % 5 === 0,
            });
        } else {
            options.push({
                value: `广东-${prefix}-${i}`,
                label: `广东-${prefix}-${i}`,
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
    <lew-flex direction="y" gap="20px" style="width: 300px">
        <lew-cascader :options="options" />
        <lew-cascader :options="options" select-trigger="hover" />
    </lew-flex>
</template>
