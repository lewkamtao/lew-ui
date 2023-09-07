<script setup lang="ts">
type Options = {
    type: string;
    title: string;
    content: string;
    closeable?: boolean;
};

const list = ref<Options[]>([]);

const addAlert = (e: Options) => {
    list.value.unshift(e);
};
const close = (e: number) => {
    list.value.splice(e, 1);
};
</script>

<template>
    <lew-flex wrap gap="20" x="start">
        <lew-button
            text="点我"
            @click="
                addAlert({
                    type: 'info',
                    title: '成功发送一条消息',
                    content: '',
                })
            "
        />
        <lew-button
            text="点我"
            color="red"
            @click="
                addAlert({
                    type: 'error',
                    title: '成功发送一条消息',
                    content: '',
                })
            "
        />
        <lew-button
            text="点我"
            color="warning"
            @click="
                addAlert({
                    type: 'warning',
                    title: '成功发送一条消息',
                    content: '',
                })
            "
        />
        <lew-button
            text="点我"
            color="green"
            @click="
                addAlert({
                    type: 'success',
                    title: '成功发送一条消息',
                    closeable: true,
                    content: '',
                })
            "
        />
        <lew-button
            text="点我"
            color="normal"
            @click="
                addAlert({
                    type: 'normal',
                    title: '成功发送一条消息',
                    closeable: true,
                    content:
                        'Well the Ukraine girls really knock me out They leave the West behind And Moscow girls make me sing and shout That Georgia s always on my mind Aw come on!',
                })
            "
        />
    </lew-flex>
    <div style="margin-top: 20px;">
        <LewAlert :list="list" @close="close"> </LewAlert>
    </div>
</template>
