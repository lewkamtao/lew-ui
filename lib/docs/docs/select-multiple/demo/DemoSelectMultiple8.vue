<script setup lang="ts">
const options = ref([
  {
    label: '智能手机',
    children: [
      {
        label: 'Pixel 6',
        value: 'google_pixel_6'
      },
      {
        label: 'Pixel 6 Pro',
        value: 'google_pixel_6_pro'
      },
      {
        label: 'Pixel 5a',
        value: 'google_pixel_5a'
      },
      {
        label: 'Pixel 4a',
        value: 'google_pixel_4a'
      },
      {
        label: 'Pixel 4',
        value: 'google_pixel_4'
      },
      {
        label: 'Pixel 3a',
        value: 'google_pixel_3a'
      },
      {
        label: 'Pixel 3',
        value: 'google_pixel_3'
      },
      {
        label: 'Pixel 2',
        value: 'google_pixel_2'
      }
    ]
  },
  {
    label: '智能家居',
    children: [
      {
        label: 'Nest Hub',
        value: 'google_nest_hub'
      },
      {
        label: 'Nest Mini',
        value: 'google_nest_mini'
      },
      {
        label: 'Nest Audio',
        value: 'google_nest_audio'
      },
      {
        label: 'Nest Cam',
        value: 'google_nest_cam'
      },
      {
        label: 'Nest Doorbell',
        value: 'google_nest_doorbell'
      },
      {
        label: 'Nest Thermostat',
        value: 'google_nest_thermostat'
      },
      {
        label: 'Nest Protect',
        value: 'google_nest_protect'
      },
      {
        label: 'Nest Wifi',
        value: 'google_nest_wifi'
      }
    ]
  },
  {
    label: '笔记本',
    children: [
      {
        label: 'Pixelbook Go',
        value: 'google_pixelbook_go'
      },
      {
        label: 'Pixelbook',
        value: 'google_pixelbook'
      },
      {
        label: 'Chromebook',
        value: 'google_chromebook'
      },
      {
        label: 'Pixel Slate',
        value: 'google_pixel_slate'
      },
      {
        label: 'Chromebook Pixel',
        value: 'google_chromebook_pixel'
      },
      {
        label: 'Chromebook Flip',
        value: 'google_chromebook_flip'
      },
      {
        label: 'Chromebook Duet',
        value: 'google_chromebook_duet'
      },
      {
        label: 'Chromebook 14',
        value: 'google_chromebook_14'
      }
    ]
  },
  {
    label: '配件',
    children: [
      {
        label: 'Pixel Buds',
        value: 'google_pixel_buds'
      },
      {
        label: 'Pixel Stand',
        value: 'google_pixel_stand'
      },
      {
        label: '充电器',
        value: 'google_charger'
      },
      {
        label: '手机壳',
        value: 'google_phone_case'
      },
      {
        label: '耳机',
        value: 'google_headphones'
      },
      {
        label: '键盘',
        value: 'google_keyboard'
      },
      {
        label: '鼠标',
        value: 'google_mouse'
      },
      {
        label: '充电底座',
        value: 'google_charging_dock'
      }
    ]
  }
])

const value = ref([])
</script>

<template>
  <lew-flex style="width: 320px" direction="y" gap="10px">
    <lew-select-multiple
      v-model="value"
      :options="options"
      placeholder="选择宜家产品"
      searchable
    />
  </lew-flex>
</template>
