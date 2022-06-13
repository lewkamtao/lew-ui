<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle, LewCheckboxGroup } from '../../../components';
let check = ref([]);
const getValue = (e) => {
    console.log(e);
    console.log(check.value);
};
</script>

<template>
    <div class="main">
        <LewTitle bold>Checkbox</LewTitle>
        <div>
            <LewCheckboxGroup
                v-model:value="check"
                :options="[
                    { name: 'Luther', id: 1 },
                    { name: 'Diego', id: 2 },
                    { name: '2313', id: 3 },
                    { name: 'Di1333ego', id: 4 },
                ]"
                @update:value="getValue"
            ></LewCheckboxGroup>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin: 30px 0px;
    }
}
</style>
