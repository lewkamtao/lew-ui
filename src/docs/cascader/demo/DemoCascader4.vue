<script setup lang="ts">
    import axios from '../../../axios/http';
    const onload = (item?: any) => {
        const levelMap: any = {
            0: 'province',
            1: 'city',
            2: 'area',
            3: 'street'
        };

        const _typeKey = item ? item.level + 1 : 0;

        return new Promise<any>((resolve) => {
            // item 不存在的时候 是第一层加载
            axios
                .get({
                    url: `/common/region/${levelMap[_typeKey] || 'province'}/${
                        item ? item.value : 0
                    }`
                })
                .then((res: any) => {
                    const { data, success } = res;
                    if (success) {
                        const options = data.map((e: any) => {
                            return {
                                label: e.name,
                                value: e.code,
                                isLeaf: item?.level ===2
                            };
                        });
                        resolve(options);
                    }
                });
        });
    };
    const v = ref();
</script>
<template>
    <div style="width: 300px">
        <lew-cascader v-model="v" :onload="onload" />
    </div>
</template>
