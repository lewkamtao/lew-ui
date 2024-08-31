<script lang="ts" setup>
const data: any = [
  {
    id: 1,
    name: '苹果',
    ticker: 'AAPL',
    price: 150.25,
    marketCap: '2.5T',
    peRatio: 28.5,
    dividend: '0.88%',
    sector: '科技',
    industry: '消费电子'
  },
  {
    id: 2,
    name: '微软',
    ticker: 'MSFT',
    price: 305.75,
    marketCap: '2.3T',
    peRatio: 32.1,
    dividend: '0.75%',
    sector: '科技',
    industry: '软件'
  },
  {
    id: 3,
    name: '亚马逊',
    ticker: 'AMZN',
    price: 3300.50,
    marketCap: '1.7T',
    peRatio: 58.7,
    dividend: 'N/A',
    sector: '消费者周期性',
    industry: '电子商务'
  },
  {
    id: 4,
    name: '谷歌',
    ticker: 'GOOGL',
    price: 2750.25,
    marketCap: '1.8T',
    peRatio: 27.8,
    dividend: 'N/A',
    sector: '通信服务',
    industry: '互联网内容与信息'
  },
  {
    id: 5,
    name: '特斯拉',
    ticker: 'TSLA',
    price: 725.60,
    marketCap: '730B',
    peRatio: 370.2,
    dividend: 'N/A',
    sector: '消费者周期性',
    industry: '汽车制造'
  }
]

const columns = [
  {
    title: 'ID',
    width: 50,
    field: 'id',
    x: 'center',
    fixed: 'left'
  },
  {
    title: '公司名称',
    width: 100,
    field: 'name',
    x: 'center',
    fixed: 'left'
  },
  {
    title: '股票代码',
    width: 100,
    field: 'ticker',
    x: 'center'
  },
  {
    title: '股价',
    width: 100,
    field: 'price',
    x: 'center'
  },
  {
    title: '市值',
    width: 100,
    field: 'marketCap',
    x: 'center'
  },
  {
    title: '市盈率',
    width: 100,
    field: 'peRatio',
    x: 'center'
  },
  {
    title: '股息率',
    width: 100,
    field: 'dividend',
    x: 'center'
  },
  {
    title: '行业',
    width: 150,
    field: 'industry'
  },
  {
    title: '操作',
    width: 120,
    field: 'action',
    fixed: 'right',
    x: 'center'
  }
]

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`
}

const v = ref('')

const submit = () => {
  LewMessage.error(v.value || '请输入有效的股票价格')
  v.value = ''
}
const success = (e: any) => {
  e.hide()
  LewMessage.success('操作成功')
}
const error = (e: any) => {
  e.hide()
  LewMessage.error('操作取消')
}
</script>

<template>
  <lew-table :data-source="data" :columns="columns">
    <template #price="{ row }"> {{ formatPrice(row.price) }} </template>
    <template #industry="{ row }">
      <lew-tag type="light" color="blue" size="small">{{ row.sector }}</lew-tag>
      <lew-tag type="light" color="green" size="small">{{ row.industry }}</lew-tag>
    </template>
    <template #action>
      <lew-flex gap="5">
        <lew-popover trigger="click" placement="top">
          <template #trigger>
            <lew-button size="small" text="更新价格" type="text" />
          </template>
          <template #popover-body="{ hide }">
            <lew-flex direction="y" gap="20" class="popover-body">
              <lew-input v-model="v" placeholder="输入新的股价" />
              <lew-flex x="end" gap="5">
                <lew-button text="取消" type="text" size="small" @click="hide()" />
                <lew-button text="确认" size="small" @click="hide(), submit()" />
              </lew-flex>
            </lew-flex>
          </template>
        </lew-popover>
        <lew-popok
          title="关注确认"
          content="是否将该股票添加到您的关注列表？"
          placement="top"
          width="200px"
          @ok="success"
          @cancel="error"
        >
          <lew-button size="small" text="关注" type="text" />
        </lew-popok>
      </lew-flex>
    </template>
  </lew-table>
</template>
<style lang="scss" scoped>
.popover-body {
  padding: 15px;
  box-sizing: border-box;
}
</style>
