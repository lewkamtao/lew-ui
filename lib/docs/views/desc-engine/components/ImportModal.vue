<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { parseToStandardJSON } from 'lew-ui/utils'
const visible = ref(false)
const fieldOptions = ref('')

const defaultOptions = `{
  companyName: '公司名称',
  establishedYear: '成立年份',
  industry: '所属行业',
  headquarters: '总部所在地',
  numberOfEmployees: '员工数量',
  revenue: '年收入',
  ceo: '首席执行官',
  products: '主要产品',
  majorCompetitors: '主要竞争对手',
  corporateCulture: '企业文化',
  sustainabilityInitiatives: '可持续发展计划',
  customerSatisfaction: '客户满意度',
  marketShare: '市场份额',
  batteryTechnology: '电池技术',
  autopilotFeatures: '自动驾驶功能',
  superchargerNetwork: '超级充电网络',
  safetyRatings: '安全评级',
  deliveryTime: '交付时间',
  electricRange: '电动续航里程',
  userInterface: '用户界面',
  afterSalesService: '售后服务'
}`

const open = () => {
    fieldOptions.value = ''
    visible.value = true
}
const emit = defineEmits(['import'])
// Start of Selection
const ok = () => {
    if (!fieldOptions.value) {
        emit('import', parseToStandardJSON(defaultOptions))
        visible.value = false
        return
    }

    try {
        const parsedData = parseToStandardJSON(fieldOptions.value)
        if (typeof parsedData === 'object' && parsedData !== null) {
            emit('import', cloneDeep(parsedData))
            visible.value = false
        } else {
            LewMessage.warning(
                '输入的内容不符合对象格式，请输入一个有效的 JSON 对象字符串！',
            )
        }
    } catch (error) {
        LewMessage.warning(
            '输入的内容不符合对象格式，请输入一个有效的 JSON 对象字符串！',
        )
    }
}
defineExpose({ open })
</script>

<template>
    <lew-modal
        v-model:visible="visible"
        width="500"
        :closeButtonProps="{
            request: () => {
                visible = false
            },
        }"
        :okButtonProps="{
            request: ok,
        }"
        title="导入字段"
    >
        <div class="import-modal-content lew-scrollbar">
            <lew-textarea
                height="400"
                :placeholder="defaultOptions"
                v-model="fieldOptions"
            />
        </div>
    </lew-modal>
</template>
<style lang="scss" scoped>
.import-modal-content {
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    max-height: 80vh;
}
</style>
