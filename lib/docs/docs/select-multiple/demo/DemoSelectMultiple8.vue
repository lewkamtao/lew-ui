<script setup lang="ts">
const options = ref([
    {
        label: 'Smartphones',
        children: [
            {
                label: 'Pixel 6',
                value: 'google_pixel_6',
            },
            {
                label: 'Pixel 6 Pro',
                value: 'google_pixel_6_pro',
            },
            {
                label: 'Pixel 5a',
                value: 'google_pixel_5a',
            },
            {
                label: 'Pixel 4a',
                value: 'google_pixel_4a',
            },
            {
                label: 'Pixel 4',
                value: 'google_pixel_4',
            },
            {
                label: 'Pixel 3a',
                value: 'google_pixel_3a',
            },
            {
                label: 'Pixel 3',
                value: 'google_pixel_3',
            },
            {
                label: 'Pixel 2',
                value: 'google_pixel_2',
            },
        ],
    },
    {
        label: 'Smart Home',
        children: [
            {
                label: 'Nest Hub',
                value: 'google_nest_hub',
            },
            {
                label: 'Nest Mini',
                value: 'google_nest_mini',
            },
            {
                label: 'Nest Audio',
                value: 'google_nest_audio',
            },
            {
                label: 'Nest Cam',
                value: 'google_nest_cam',
            },
            {
                label: 'Nest Doorbell',
                value: 'google_nest_doorbell',
            },
            {
                label: 'Nest Thermostat',
                value: 'google_nest_thermostat',
            },
            {
                label: 'Nest Protect',
                value: 'google_nest_protect',
            },
            {
                label: 'Nest Wifi',
                value: 'google_nest_wifi',
            },
        ],
    },
    {
        label: 'Laptops',
        children: [
            {
                label: 'Pixelbook Go',
                value: 'google_pixelbook_go',
            },
            {
                label: 'Pixelbook',
                value: 'google_pixelbook',
            },
            {
                label: 'Chromebook',
                value: 'google_chromebook',
            },
            {
                label: 'Pixel Slate',
                value: 'google_pixel_slate',
            },
            {
                label: 'Chromebook Pixel',
                value: 'google_chromebook_pixel',
            },
            {
                label: 'Chromebook Flip',
                value: 'google_chromebook_flip',
            },
            {
                label: 'Chromebook Duet',
                value: 'google_chromebook_duet',
            },
            {
                label: 'Chromebook 14',
                value: 'google_chromebook_14',
            },
        ],
    },
    {
        label: 'Accessories',
        children: [
            {
                label: 'Pixel Buds',
                value: 'google_pixel_buds',
            },
            {
                label: 'Pixel Stand',
                value: 'google_pixel_stand',
            },
            {
                label: 'Charger',
                value: 'google_charger',
            },
            {
                label: 'Phone Case',
                value: 'google_phone_case',
            },
            {
                label: 'Headphones',
                value: 'google_headphones',
            },
            {
                label: 'Keyboard',
                value: 'google_keyboard',
            },
            {
                label: 'Mouse',
                value: 'google_mouse',
            },
            {
                label: 'Charging Dock',
                value: 'google_charging_dock',
            },
        ],
    },
])

const value = ref(['google_pixel_buds', 'google_pixel_stand'])
</script>

<template>
    <lew-flex style="width: 320px" direction="y" gap="10px">
        <lew-select-multiple
            v-model="value"
            :options="options"
            value-layout="tag"
            placeholder="Select Products"
            searchable
        />
    </lew-flex>
</template>
