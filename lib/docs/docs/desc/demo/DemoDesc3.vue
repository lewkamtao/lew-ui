<script setup lang="ts">
import { ref } from 'vue';

// 定义数据源
const dataSource = ref({
  companyName: '特斯拉公司',
  establishedYear: '2003年',
  industry: '电动汽车与可再生能源',
  headquarters: '美国加利福尼亚州帕洛阿尔托',
  numberOfEmployees: '70,000',
  revenue: '315亿美元',
  netIncome: '7.21亿美元',
  marketCap: '8000亿美元',
  ceo: '埃隆·马斯克',
  products: '电动汽车、太阳能产品、储能设备',
  rAndDInvestment: '15亿美元',
  patents: '超过3000项',
  globalPresence: '全球多个国家和地区',
  majorCompetitors: '福特、通用汽车、比亚迪',
  corporateCulture: '创新与可持续发展',
  sustainabilityInitiatives: '零排放目标',
  awards: '多项汽车行业大奖',
  partnerships: '与多家科技公司合作',
  socialResponsibility: '积极参与环保活动',
  employeeTraining: '定期技术培训与发展计划',
  customerSatisfaction: '90%以上的客户满意度',
  supplyChain: '全球化供应链管理',
  logistics: '高效的物流与配送系统',
  productQuality: '高标准的质量控制',
  innovationStrategy: '持续技术创新与研发',
  marketShare: '全球电动汽车市场份额20%',
  customerSupport: '24/7客户服务',
  brandValue: '全球品牌价值排名前五',
  financialStability: '持续盈利与增长',
  corporateGovernance: '透明的公司治理结构',
  digitalTransformation: '全面数字化转型',
  employeeDiversity: '多元化的员工队伍',
  communityEngagement: '积极参与社区建设',
  futureVision: '推动全球向可再生能源转型',
  vehicleModels: 'Model S, Model 3, Model X, Model Y',
  batteryTechnology: '先进的电池技术',
  autopilotFeatures: '自动驾驶辅助系统',
  superchargerNetwork: '全球超级充电网络',
  energyProducts: '太阳能屋顶与储能系统',
  safetyRatings: '多项安全测试五星评级',
  manufacturingPlants: '美国、德国、中国等地的工厂',
  deliveryTime: '快速交付与定制服务',
  customerFeedback: '重视客户反馈与改进',
  environmentalImpact: '致力于减少碳足迹',
  researchFacilities: '先进的研发中心',
  electricRange: '长续航里程',
  performanceMetrics: '卓越的加速性能',
  softwareUpdates: '定期推送软件更新',
  resaleValue: '高保值率',
  chargingOptions: '多种充电方式',
  warranty: '全面的保修服务',
  insurancePartnerships: '与保险公司合作提供优惠',
  fleetSales: '企业车队销售解决方案',
  marketExpansion: '持续拓展国际市场',
  customerLoyalty: '高客户忠诚度',
  technologyIntegration: '智能科技与汽车的结合',
  userInterface: '直观的用户界面设计',
  mobileApp: '功能强大的手机应用',
  communityEvents: '定期举办社区活动',
  sustainabilityReports: '发布可持续发展报告',
  electricVehicleIncentives: '支持政府的电动车补贴政策',
  chargingInfrastructure: '推动充电基础设施建设',
  energyEfficiency: '高能效标准',
  productCustomization: '个性化定制选项',
  afterSalesService: '优质的售后服务',
});
// 定义选项
const options = ref([
  {
    field: 'companyName',
    gridArea: '1 / 1 / 1 / 2',
    label: '公司名称',
  },
  {
    field: 'establishedYear',
    gridArea: '1 / 2 / 1 / 3',
    label: '成立年份',
  },
  {
    field: 'industry',
    gridArea: '1 / 3 / 1 / 4',
    label: '行业',
  },
  {
    field: 'headquarters',
    gridArea: '1 / 4 / 1 / 5',
    label: '总部',
  },
  {
    field: 'numberOfEmployees',
    gridArea: '2 / 1 / 2 / 2',
    label: '员工人数',
  },
  {
    field: 'revenue',
    gridArea: '2 / 2 / 2 / 3',
    label: '收入',
  },
  {
    field: 'netIncome',
    gridArea: '2 / 3 / 2 / 4',
    label: '净收入',
  },
  {
    field: 'marketCap',
    gridArea: '2 / 4 / 2 / 5',
    label: '市值',
  },
  {
    field: 'ceo',
    gridArea: '3 / 1 / 3 / 2',
    label: '首席执行官',
  },
  {
    field: 'products',
    gridArea: '3 / 2 / 3 / 3',
    label: '产品',
  },
  {
    field: 'rAndDInvestment',
    gridArea: '3 / 3 / 3 / 4',
    label: '研发投资',
    tips: '公司每年投入大量资金用于研发。',
  },
  {
    field: 'patents',
    gridArea: '3 / 4 / 3 / 5',
    label: '专利数量',
  },
  {
    field: 'globalPresence',
    gridArea: '4 / 1 / 4 / 2',
    label: '全球业务覆盖',
    tips: '公司在多个国家和地区设有分支机构。',
  },
  {
    field: 'majorCompetitors',
    gridArea: '4 / 2 / 4 / 3',
    label: '主要竞争对手',
  },
  {
    field: 'corporateCulture',
    gridArea: '4 / 3 / 4 / 4',
    label: '企业文化',
    tips: '公司倡导创新与可持续发展的文化。',
  },
  {
    field: 'sustainabilityInitiatives',
    gridArea: '4 / 4 / 4 / 5',
    label: '可持续发展举措',
  },
  {
    field: 'awards',
    gridArea: '5 / 1 / 5 / 2',
    label: '获奖情况',
  },
  {
    field: 'partnerships',
    gridArea: '5 / 2 / 5 / 3',
    label: '合作伙伴',
  },
  {
    field: 'socialResponsibility',
    gridArea: '5 / 3 / 5 / 4',
    label: '社会责任',
    tips: '公司积极参与社会公益活动。',
  },
  {
    field: 'employeeTraining',
    gridArea: '5 / 4 / 5 / 5',
    label: '员工培训',
  },
  {
    field: 'customerSatisfaction',
    gridArea: '6 / 1 / 6 / 2',
    label: '客户满意度',
  },
  {
    field: 'supplyChain',
    gridArea: '6 / 2 / 6 / 3',
    label: '供应链管理',
  },
  {
    field: 'logistics',
    gridArea: '6 / 3 / 6 / 4',
    label: '物流系统',
  },
  {
    field: 'productQuality',
    gridArea: '6 / 4 / 6 / 5',
    label: '产品质量',
  },
  {
    field: 'innovationStrategy',
    gridArea: '7 / 1 / 7 / 2',
    label: '创新战略',
  },
  {
    field: 'marketShare',
    gridArea: '7 / 2 / 7 / 3',
    label: '市场份额',
  },
  {
    field: 'customerSupport',
    gridArea: '7 / 3 / 7 / 4',
    label: '客户支持',
  },
  {
    field: 'vehicleModels',
    gridArea: '7 / 4 / 7 / 5',
    label: '车型',
  },
  {
    field: 'batteryTechnology',
    gridArea: '8 / 1 / 8 / 2',
    label: '电池技术',
  },
  {
    field: 'autopilotFeatures',
    gridArea: '8 / 2 / 8 / 3',
    label: '自动驾驶功能',
  },
  {
    field: 'superchargerNetwork',
    gridArea: '8 / 3 / 8 / 4',
    label: '超级充电网络',
  },
  {
    field: 'energyProducts',
    gridArea: '8 / 4 / 8 / 5',
    label: '能源产品',
  },
  {
    field: 'safetyRatings',
    gridArea: '9 / 1 / 9 / 2',
    label: '安全评级',
  },
  {
    field: 'manufacturingPlants',
    gridArea: '9 / 2 / 9 / 3',
    label: '制造工厂',
  },
  {
    field: 'deliveryTime',
    gridArea: '9 / 3 / 9 / 4',
    label: '交付时间',
  },
  {
    field: 'customerFeedback',
    gridArea: '9 / 4 / 9 / 5',
    label: '客户反馈',
  },
  {
    field: 'environmentalImpact',
    gridArea: '10 / 1 / 10 / 2',
    label: '环境影响',
  },
  {
    field: 'researchFacilities',
    gridArea: '10 / 2 / 10 / 3',
    label: '研究设施',
  },
  {
    field: 'electricRange',
    gridArea: '10 / 3 / 10 / 4',
    label: '电动续航',
  },
  {
    field: 'performanceMetrics',
    gridArea: '10 / 4 / 10 / 5',
    label: '性能指标',
  },
  {
    field: 'softwareUpdates',
    gridArea: '11 / 1 / 11 / 2',
    label: '软件更新',
  },
  {
    field: 'resaleValue',
    gridArea: '11 / 2 / 11 / 3',
    label: '转售价值',
  },
  {
    field: 'chargingOptions',
    gridArea: '11 / 3 / 11 / 4',
    label: '充电选项',
  },
  {
    field: 'warranty',
    gridArea: '11 / 4 / 11 / 5',
    label: '保修服务',
  },
  {
    field: 'insurancePartnerships',
    gridArea: '12 / 1 / 12 / 2',
    label: '保险合作',
  },
  {
    field: 'fleetSales',
    gridArea: '12 / 2 / 12 / 3',
    label: '车队销售',
  },
  {
    field: 'marketExpansion',
    gridArea: '12 / 3 / 12 / 4',
    label: '市场扩展',
  },
  {
    field: 'customerLoyalty',
    gridArea: '12 / 4 / 12 / 5',
    label: '客户忠诚度',
  },
  {
    field: 'technologyIntegration',
    gridArea: '13 / 1 / 13 / 2',
    label: '技术整合',
  },
  {
    field: 'userInterface',
    gridArea: '13 / 2 / 13 / 3',
    label: '用户界面',
  },
  {
    field: 'mobileApp',
    gridArea: '13 / 3 / 13 / 4',
    label: '手机应用',
  },
  {
    field: 'communityEvents',
    gridArea: '13 / 4 / 13 / 5',
    label: '社区活动',
  },
  {
    field: 'sustainabilityReports',
    gridArea: '14 / 1 / 14 / 2',
    label: '可持续发展报告',
  },
  {
    field: 'electricVehicleIncentives',
    gridArea: '14 / 2 / 14 / 3',
    label: '电动车激励政策',
  },
  {
    field: 'chargingInfrastructure',
    gridArea: '14 / 3 / 14 / 4',
    label: '充电基础设施',
  },
  {
    field: 'energyEfficiency',
    gridArea: '14 / 4 / 14 / 5',
    label: '能效标准',
  },
  {
    field: 'productCustomization',
    gridArea: '15 / 1 / 15 / 2',
    label: '产品定制',
  },
  {
    field: 'afterSalesService',
    gridArea: '15 / 2 / 15 / 3',
    label: '售后服务',
  },
]);
</script>
<template>
  <lew-flex x="start" y="start" :gap="50">
    <lew-desc
      width="1200"
      direction="x"
      labelX="end"
      :columns="4"
      :dataSource="dataSource"
      :options="options"
    />
  </lew-flex>
</template>
