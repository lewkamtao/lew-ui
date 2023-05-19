<template>
    <lew-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        @preview="handlePreview"
    >
        <lew-button type="success" icon="file-text" text="select"></lew-button>
        <lew-button
            type="primary"
            icon="upload"
            text="upload"
            style="margin-left: 10px"
            @click="submit"
        ></lew-button>
    </lew-upload>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const uploadRef = ref();

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
]);

function handlePreview(file) {
    if (file?.response?.data) {
        window.open(file.response.data);
    }
}

function submit(event) {
    event.stopPropagation();
    uploadRef.value.submit();
    console.log(fileList);
}
</script>

<style scoped></style>
