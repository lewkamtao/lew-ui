<script setup lang="ts">
import options from './desc_20241128_380ff83.json'
// 定义数据源
// Start of Selection
const dataSource = ref({
    companyName: '苹果公司',
    establishedYear: '1976年',
    industry: '消费电子与软件',
    headquarters: '美国加利福尼亚州库比蒂诺',
    numberOfEmployees: '147,000',
    revenue: '3658亿美元',
    ceo: '蒂姆·库克',
    products: 'iPhone、iPad、Mac、Apple Watch',
    majorCompetitors: '三星、谷歌、微软',
    corporateCulture: '创新与用户体验',
    sustainabilityInitiatives: '100%可再生能源目标',
    customerSatisfaction: '95%以上的客户满意度',
    marketShare: '全球智能手机市场份额约15%',
    batteryTechnology: '高效能电池技术',
    autopilotFeatures: '无',
    superchargerNetwork: '无',
    safetyRatings: '多项安全测试五星评级',
    deliveryTime: '快速交付与定制服务',
    electricRange: '无',
    userInterface: '直观的用户界面设计',
    afterSalesService: '优质的售后服务',
})
</script>
<template>
    <lew-flex x="start" y="start" :gap="50">
        <lew-desc bordered v-bind="options" :dataSource="dataSource" />
    </lew-flex>
</template>
