<script setup lang="ts">
const value = ref(false)
const mockFn = (v: boolean) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(v)
            resolve(true)
            LewMessage.success('发送成功')
        }, 1000)
    })
}
const change = (e: unknown) => {
    console.log(e)
    console.log(value.value)
}
</script>

<template>
    <lew-flex direction="y" x="start" y="end">
        <lew-switch
            v-model="value"
            size="small"
            :request="mockFn"
            @change="change"
        />
        <lew-switch
            v-model="value"
            size="medium"
            :request="mockFn"
            @change="change"
        />
        <lew-switch
            v-model="value"
            size="large"
            :request="mockFn"
            @change="change"
        />
    </lew-flex>
</template>
