<script setup lang="ts">
const visible = ref(false)
const ok = () => {
    return new Promise<void>((resolve: any) => {
        setTimeout(() => {
            visible.value = false
            resolve(true)
        }, 1000)
    })
}

const close = () => {
    visible.value = false
}
</script>

<template>
    <lew-flex x="start">
        <lew-button @click="visible = true">Async Close</lew-button>
    </lew-flex>
    <lew-drawer
        v-model:visible="visible"
        width="350px"
        title="Simulate Async Request"
        :okButtonProps="{ request: ok }"
        :closeButtonProps="{ request: close }"
    >
        <div class="drawer-body">
            <div>Click confirm, the drawer will close after 1 second.</div>
        </div>
    </lew-drawer>
</template>

<style lang="scss" scoped>
.drawer-body {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 18px;
    font-weight: bolder;
}
</style>
