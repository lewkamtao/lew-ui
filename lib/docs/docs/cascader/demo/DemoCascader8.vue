<script setup lang="ts">
const options = [
  {
    value: 1,
    label: '亚洲',
    children: [
      {
        value: 2,
        label: '中国',
        children: [
          { value: 3, label: '北京', desc: '故宫、长城、烤鸭' },
          { value: 4, label: '上海', desc: '外滩、东方明珠、小笼包' },
          { value: 5, label: '杭州', desc: '西湖、龙井茶、丝绸' }
        ]
      },
      {
        value: 6,
        label: '日本',
        children: [
          { value: 7, label: '东京', desc: '秋叶原、寿司、樱花' },
          { value: 8, label: '大阪', desc: '道顿堀、章鱼烧、环球影城' },
          { value: 9, label: '京都', desc: '金阁寺、和服体验、抹茶' }
        ]
      },
      {
        value: 10,
        label: '韩国',
        children: [
          { value: 11, label: '首尔', desc: '明洞、泡菜、韩剧' },
          { value: 12, label: '釜山', desc: '海云台、海鲜、电影节' },
          { value: 13, label: '大邱', desc: '药令市、纺织品、苹果' }
        ]
      }
    ]
  },
  {
    value: 14,
    label: '欧洲',
    disabled: true,
    children: [
      {
        value: 15,
        label: '法国',
        children: [
          {
            value: 16,
            label: '巴黎',
            desc: '埃菲尔铁塔、卢浮宫、香榭丽舍大街'
          },
          { value: 17, label: '马赛', desc: '老港口、地中海风情、肥皂' },
          { value: 18, label: '里昂', desc: '美食之都、丝绸、灯光节' }
        ]
      },
      {
        value: 19,
        label: '英国',
        children: [
          { value: 20, label: '伦敦', desc: '大本钟、伦敦眼、红茶' },
          { value: 21, label: '伯明翰', desc: '工业革命、巧克力工厂、珠宝区' },
          { value: 22, label: '曼彻斯特', desc: '足球、音乐、运河城' }
        ]
      }
    ]
  },
  {
    value: 23,
    label: '北美洲',
    children: [
      {
        value: 24,
        label: '美国',
        children: [
          { value: 25, label: '纽约', desc: '自由女神像、百老汇、中央公园' },
          {
            value: 26,
            label: '洛杉矶',
            desc: '好莱坞、迪士尼乐园、比佛利山庄'
          },
          { value: 27, label: '华盛顿', desc: '白宫、国会大厦、林肯纪念堂' }
        ]
      },
      {
        value: 28,
        label: '加拿大',
        children: [
          { value: 29, label: '多伦多', desc: 'CN塔、尼亚加拉瀑布、枫糖浆' },
          { value: 30, label: '蒙特利尔', desc: '老城区、法语文化、冰球' },
          { value: 31, label: '渥太华', desc: '国会山、丽都运河、郁金香节' }
        ]
      }
    ]
  }
]
const v = ref()
</script>

<template>
  <div style="width: 300px">
    <lew-cascader
      v-model="v"
      :options="options"
      placeholder="请选择您的旅游目的地"
    />
  </div>
</template>
