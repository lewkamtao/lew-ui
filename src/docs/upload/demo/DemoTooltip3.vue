<template>
    <lew-upload
        v-model:file-list="fileList"
        list-type="picture"
        @preview="handlePreview"
    >
        <lew-button icon="upload" text="upload"></lew-button>
    </lew-upload>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const fileList = reactive([
    {
        name: 'dog.jpg',
        status: 'success',
        url: 'https://cdn.pixabay.com/photo/2023/05/13/19/20/dog-7991199_960_720.jpg',
        response: {
            code: 200,
            data: 'https://cdn.pixabay.com/photo/2023/05/13/19/20/dog-7991199_960_720.jpg',
        },
    },
    {
        name: 'seagull.jpg',
        status: 'success',
        url: 'https://cdn.pixabay.com/photo/2023/05/14/05/04/seagull-7991991_960_720.jpg',
        response: {
            code: 200,
            data: 'https://cdn.pixabay.com/photo/2023/05/14/05/04/seagull-7991991_960_720.jpg',
        },
    },
    {
        name: 'blue-tongue-skink',
        status: 'success',
        url: 'https://cdn.pixabay.com/photo/2023/04/10/10/28/blue-tongue-skink-7913420_960_720.jpg',
        response: {
            code: 200,
            data: 'https://cdn.pixabay.com/photo/2023/04/10/10/28/blue-tongue-skink-7913420_960_720.jpg',
        },
    },
]);

function handlePreview(file: any) {
    if (file?.response?.data) {
        window.open(file.response.data);
    }
}
</script>

<style scoped></style>
