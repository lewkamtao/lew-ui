<script setup lang="ts">
    const options = [
        {
            value: 1,
            label: 'Asia',
            disabled: true,
            children: [
                {
                    value: 2,
                    label: 'China',
                    disabled: true,
                    children: [
                        { value: 3, disabled: true, label: 'Beijing' },
                        { value: 4, disabled: true, label: 'Shanghai' },
                        { value: 5, label: 'Hangzhou' }
                    ]
                },
                {
                    value: 6,
                    label: 'Japan',
                    disabled: true,
                    children: [
                        { value: 7, label: 'Tokyo' },
                        { value: 8, label: 'Osaka' },
                        { value: 9, label: 'Kyoto' }
                    ]
                },
                {
                    value: 10,
                    label: 'Korea',
                    children: [
                        { value: 11, disabled: true, label: 'Seoul' },
                        { value: 12, disabled: true, label: 'Busan' },
                        { value: 13, label: 'Taegu' }
                    ]
                }
            ]
        },
        {
            value: 14,
            label: 'Europe',
            disabled: true,
            children: [
                {
                    value: 15,
                    label: 'France',
                    children: [
                        { value: 16, disabled: true, label: 'Paris' },
                        { value: 17, label: 'Marseille' },
                        { value: 18, label: 'Lyon' }
                    ]
                },
                {
                    value: 19,
                    label: 'UK',
                    children: [
                        { value: 20, label: 'London' },
                        { value: 21, label: 'Birmingham' },
                        { value: 22, label: 'Manchester' }
                    ]
                }
            ]
        },
        {
            value: 23,
            label: 'North America',
            children: [
                {
                    value: 24,
                    label: 'US',
                    children: [
                        { value: 25, label: 'New York' },
                        { value: 26, disabled: true, label: 'Los Angeles' },
                        { value: 27, label: 'Washington' }
                    ]
                },
                {
                    value: 28,
                    label: 'Canada',
                    children: [
                        { value: 29, label: 'Toronto' },
                        { value: 30, disabled: true, label: 'Montreal' },
                        { value: 31, label: 'Ottawa' }
                    ]
                }
            ]
        }
    ];

    const v = ref();

    const change = (e: any) => {
        console.log(e);
    };
</script>

<template>
    <lew-flex direction="y" gap="20px" style="width: 300px">
        <lew-tree-select
            v-model="v"
            key-field="value"
            label-field="label"
            :data-source="options"
            @change="change"
        >
        </lew-tree-select>
    </lew-flex>
</template>
