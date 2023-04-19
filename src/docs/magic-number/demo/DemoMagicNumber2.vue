<script lang="ts" setup>
let num = ref(23141323.23);
let num2 = ref(3242313);

onMounted(() => {
    setInterval(() => {
        num.value += Number((Math.random() * 2000).toFixed(2));
        num.value = Number(num.value.toFixed(2));
    }, 1500);
    setInterval(() => {
        num2.value += parseInt(String(Math.random() * 500));
    }, 1500);
});
</script>

<template>
    <lew-flex x="start" direction="y">
        <lew-flex x="start" y="end">
            当前成交额： <lew-magic-number :value="num" :size="24" /> 元
        </lew-flex>
        <lew-flex x="start" y="end">
            当前访问量：
            <lew-magic-number :value="num2" :size="24" />
        </lew-flex>
    </lew-flex>
</template>
