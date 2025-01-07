<script setup lang="ts">
const options = ref([
  {
    label: '客厅家具',
    children: [
      {
        label: 'KIVIK 希维克 沙发',
        value: 'kivik'
      },
      {
        label: 'BILLY 比利 书柜',
        value: 'billy'
      },
      {
        label: 'KALLAX 卡莱克斯 储物架',
        value: 'kallax'
      },
      {
        label: 'POÄNG 波昂 扶手椅',
        value: 'poang'
      },
      {
        label: 'LACK 拉克 茶几',
        value: 'lack'
      },
      {
        label: 'EKTORP 爱克托 沙发',
        value: 'ektorp'
      },
      {
        label: 'VITTSJÖ 维特索 电视柜',
        value: 'vittsjo'
      },
      {
        label: 'BESTÅ 贝达 电视柜组合',
        value: 'besta'
      }
    ]
  },
  {
    label: '卧室家具',
    children: [
      {
        label: 'MALM 马尔姆 床',
        value: 'malm'
      },
      {
        label: 'PAX 帕克斯 衣柜',
        value: 'pax'
      },
      {
        label: 'HEMNES 汉尼斯 床头柜',
        value: 'hemnes'
      },
      {
        label: 'BRIMNES 布里姆内斯 床架',
        value: 'brimnes'
      },
      {
        label: 'SONGESAND 松吉桑 衣柜',
        value: 'songesand'
      },
      {
        label: 'TRYSIL 特利斯 床架',
        value: 'trysil'
      },
      {
        label: 'NORDLI 诺德里 床头柜',
        value: 'nordli'
      },
      {
        label: 'KULLEN 库伦 五斗柜',
        value: 'kullen'
      }
    ]
  },
  {
    label: '厨房用品',
    children: [
      {
        label: 'METOD 米多 橱柜',
        value: 'metod'
      },
      {
        label: 'KNOXHULT 诺克胡特 厨房操作台',
        value: 'knoxhult'
      },
      {
        label: 'SUNNERSTA 苏纳思 迷你厨房',
        value: 'sunnersta'
      },
      {
        label: 'TORNVIKEN 托恩维肯 厨房中岛',
        value: 'tornviken'
      },
      {
        label: 'ENHET 安纳特 厨房储物组合',
        value: 'enhet'
      },
      {
        label: 'RÅSKOG 拉斯克 厨用推车',
        value: 'raskog'
      },
      {
        label: 'KUNGSFORS 孔斯福斯 厨房挂杆',
        value: 'kungsfors'
      }
    ]
  },
  {
    label: '办公家具',
    children: [
      {
        label: 'MICKE 米克 书桌',
        value: 'micke'
      },
      {
        label: 'MARKUS 马库斯 办公椅',
        value: 'markus'
      },
      {
        label: 'ALEX 阿来斯 抽屉柜',
        value: 'alex'
      },
      {
        label: 'BEKANT 贝肯特 升降式办公桌',
        value: 'bekant'
      },
      {
        label: 'MILLBERGET 米伯格 转椅',
        value: 'millberget'
      },
      {
        label: 'FLINTAN 福通 办公椅',
        value: 'flintan'
      },
      {
        label: 'GALANT 加兰特 文件柜',
        value: 'galant'
      },
      {
        label: 'LÅNGFJÄLL 朗菲尔 办公椅',
        value: 'langfjall'
      }
    ]
  }
])

const value = ref('')
</script>

<template>
  <lew-flex style="width: 320px" direction="y" gap="10px">
    <lew-select
      v-model="value"
      :options="options"
      placeholder="选择宜家产品"
      searchable
    />
  </lew-flex>
</template>
