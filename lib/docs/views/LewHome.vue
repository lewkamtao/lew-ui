<script setup lang="ts">
import { useRouter } from 'vue-router'
import * as Yup from 'yup'
import { random } from 'lodash-es'
import LewBg from '../layout/LewBg.vue'

const viewTotal = ref(1000000000)

const timer = setInterval(() => {
  viewTotal.value += random(10000, 5000000)
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})

const options = ref([
  {
    field: 'componentName',
    label: '组件库名称',
    as: 'input',
    rule: Yup.string().required('请输入组件库的完整名称'),
    props: {
      clearable: true
    }
  },
  {
    field: 'componentDescription',
    label: '组件库描述',
    as: 'textarea',
    rule: Yup.string().required('请简要描述组件库的主要特点和优势'),
    props: {
      clearable: true,
      showCount: true,
      maxLength: 500
    }
  },
  {
    field: 'category',
    label: '组件库类型',
    as: 'select',
    rule: Yup.string().required('请选择组件库所属的类型'),
    props: {
      clearable: true,
      options: [
        {
          label: 'UI组件库',
          value: '1'
        },
        {
          label: '功能组件库',
          value: '2'
        },
        {
          label: '布局组件库',
          value: '3'
        },
        {
          label: '表单组件库',
          value: '4'
        },
        {
          label: '数据展示组件库',
          value: '5'
        }
      ]
    }
  },
  {
    field: 'features',
    label: '组件库特性',
    as: 'select-multiple',
    rule: Yup.array().min(1, '请至少选择一项组件库的核心特性').required('请选择组件库的主要特性'),
    props: {
      change: (e: any) => {
        console.log(e)
      },
      clearable: true,
      options: [
        { label: '响应式设计', value: '1' },
        { label: '优雅的用法', value: '2' },
        { label: '多语言支持', value: '3' },
        { label: '丰富的动画效果', value: '4' },
        { label: '无障碍访问', value: '5' },
        { label: '强大的事件系统', value: '6' },
        { label: '灵活的状态管理', value: '7' },
        { label: '丰富的插槽支持', value: '8' }
      ]
    }
  },
  {
    field: 'info.releaseDate',
    label: '发布日期',
    as: 'date-picker',
    rule: Yup.string().required('请选择组件库的首次发布日期'),
    props: {}
  },
  {
    field: 'info.availabilityPeriod',
    label: '支持周期',
    as: 'date-range-picker',
    rule: Yup.object().required('请选择组件库的长期支持周期'),
    props: {}
  },
  {
    field: 'usageFramework',
    label: '适用框架',
    as: 'radio-group',
    rule: Yup.string().required('请选择组件库适用的前端框架'),
    props: {
      options: [
        {
          label: 'Vue 3',
          value: 'vue'
        },
        {
          label: 'React',
          value: 'react'
        },
        {
          label: 'Angular',
          value: 'angular'
        }
      ]
    }
  },
  {
    field: 'targetUsers',
    label: '目标用户',
    as: 'checkbox-group',
    rule: Yup.array().min(1, '请至少选择一个目标用户群体').required('请选择组件库的主要目标用户'),
    props: {
      options: [
        { label: '前端', value: '1' },
        { label: '全栈', value: '2' },
        { label: 'UI设计师', value: '3' },
        { label: '产品经理', value: '4' }
      ]
    }
  },
  {
    field: 'developmentFocus',
    label: '开发重点',
    as: 'tabs',
    rule: Yup.string().required('请选择组件库的主要开发重点'),
    props: {
      options: [
        {
          label: '功能创新',
          value: '1'
        },
        {
          label: '性能优化',
          value: '2'
        },
        {
          label: '用户体验',
          value: '3'
        },
        {
          label: '稳定性',
          value: '4'
        }
      ]
    }
  },
  {
    field: 'info.keywordTags',
    label: '关键词标签',
    as: 'input-tag',
    rule: Yup.array()
      .min(1, '请至少输入一个描述组件库特点的关键词')
      .required('请输入能够突出组件库特色的关键词标签'),
    props: {
      clearable: true
    }
  },
  {
    field: 'info.isOpenSource',
    label: '开源状态',
    as: 'switch',
    rule: Yup.boolean().required('请指明组件库是否为开源项目'),
    props: {}
  }
])

let formRef = ref()

onMounted(() => {
  setTimeout(() => {
    sprs()
  }, 1000)
  formRef.value.setForm({
    componentName: 'Lew UI',
    componentDescription:
      'Lew-UI 是一个基于 Vue3 的轻量级组件库，专注于提供简洁实用的UI组件，适合快速构建中小型项目。',
    category: '1',
    features: ['1', '2', '4'],
    usageFramework: 'vue',
    targetUsers: ['1', '2'],
    developmentFocus: '3',
    info: {
      releaseDate: '2022-05-24',
      availabilityPeriod: {
        start: '2022-05-24',
        end: '2099-10-24'
      },
      keywordTags: ['高效', '易用', '灵活'],
      isOpenSource: true
    }
  })
})

const sprs = () => {
  const duration = 5 * 1000 // 增加持续时间到5秒
  const animationEnd = Date.now() + duration
  const defaults = {
    startVelocity: 30, // 增加初始速度
    spread: 360,
    ticks: 50, // 增加碎片数量
    zIndex: 999
  }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration) // 增加碎片数量

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.1, 0.3),
        y: Math.random() - 0.2
      }
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.7, 0.9),
        y: Math.random() - 0.2
      }
    })
  }, 250) // 稍微减少间隔时间以增加密度
}

const router = useRouter()
const v = ref('')
const lewPopoverRef = ref()
const submit = () => {
  LewMessage.error(v.value || '密码不能为空')
  lewPopoverRef.value.hide()
}
const open = (type: string) => {
  LewDialog[type]({
    title: '确认操作',
    content: '此操作不可逆，请确认是否继续？',
    ok: () => {
      console.log('确认')
    },
    cancel: () => {
      console.log('取消')
    }
  })
}

const breadcrumb_options = ref([
  {
    label: '腾讯云',
    value: '/',
    type: 'light'
  },
  {
    label: '云服务器',
    value: '/cvm',
    type: 'light'
  },
  {
    label: '实例',
    value: '/cvm/instance',
    type: 'light'
  },
  {
    label: 'CVM-1234567890',
    value: '',
    active: true,
    type: 'light'
  }
])

const tab_options = ref([
  { label: '空调', value: '1', type: 'light' },
  { label: '冰箱', value: '2', type: 'light' },
  { label: '洗衣机', value: '3', type: 'light' },
  { label: '热水器', value: '4', type: 'light' },
  { label: '厨房电器', value: '5', type: 'light' },
  { label: '生活电器', value: '6', type: 'light' },
  { label: '智能家居系统', value: '7', type: 'light' },
  { label: '商用空调', value: '8', type: 'light' }
])

const tabValue = ref('4')
const dropdown_options = ref([
  {
    label: '红烧肉',
    value: 1
  },
  {
    label: '小笼包',
    value: 2
  },
  {
    label: '麻婆豆腐',
    value: 3
  },
  {
    label: '糖醋鱼',
    value: 4
  },
  {
    label: '宫保鸡丁',
    value: 5
  },
  {
    label: '水煮鱼',
    value: 6
  }
])
const list = ref([
  {
    type: 'info',
    title: '新功能提示',
    content: '探索全新的iOS 17,体验更智能的iPhone'
  },
  {
    type: 'normal',
    title: 'Apple ID提醒',
    content: '请验证您的Apple ID电子邮件地址'
  },
  {
    type: 'success',
    title: '更新完成',
    content: '您的设备已成功更新至最新版本'
  }
])

const message = (type: string) => {
  const messages = {
    info: '新功能提示：探索全新的iOS 17，体验更智能的iPhone。',
    success: '更新完成：您的设备已成功更新至最新版本。',
    warning: 'Apple ID提醒：请验证您的Apple ID电子邮件地址。',
    error: '安全警告：检测到您的账户有异常登录活动。'
  }
  LewMessage[type](messages[type as keyof typeof messages] || '这是一条来自Apple的通知')
}

const notification = (type: string) => {
  const notifications = {
    info: {
      title: 'iOS 更新提醒',
      content: '新版 iOS 17 现已推出，带来更智能的体验。立即更新以享受最新功能。'
    },
    success: {
      title: 'Apple ID 验证成功',
      content: '您的 Apple ID 已成功验证。感谢您保护账户安全。'
    },
    warning: {
      title: 'iCloud 存储空间不足',
      content: '您的 iCloud 存储空间即将用完。升级存储计划以确保数据安全备份。'
    },
    error: {
      title: '安全警告',
      content: '检测到您的 Apple ID 有异常登录活动。请立即检查并更新密码。'
    }
  }

  // @ts-ignore
  LewNotification[type](
    notifications[type as keyof typeof notifications] || {
      title: 'Apple 通知',
      content: '这是一条来自 Apple 的重要通知'
    }
  )
}
</script>

<template>
  <div class="home-wrapper">
    <LewBg />
    <div class="startbox">
      <div class="slogan">
        少即是
        <div class="dm">
          <div class="text"><span>多</span> <span>美</span></div>
        </div>
      </div>
      <p>一个好看易用的 Vue3 组件库</p>
      <lew-flex x="start">
        <lew-button
          round
          icon="arrow-right"
          iconPosition="right"
          text="开始使用"
          style="margin-top: 20px"
          @click="router.push('/Image')"
        />
        <a href="/#/form-engine" target="_blank">
          <lew-button round text="表单引擎" style="margin-top: 20px" color="primary" type="light" />
        </a>
      </lew-flex>
    </div>
    <div class="home">
      <lew-flex direction="x" gap="40">
        <lew-flex class="item" direction="y" x="end" gap="40">
          <lew-flex direction="y" x="end" gap="0px">
            <lew-title :size="16" :bold="200"> Lew Design 16px </lew-title>
            <lew-title size="24px" :bold="400"> Lew Design 24px </lew-title>
            <lew-title size="32px" :bold="600"> Lew Design 32px </lew-title>
            <lew-title size="40px" :bold="600">
              本月流水： $<lew-magic-number sep :value="viewTotal" :size="40" />
            </lew-title>
          </lew-flex>
          <lew-flex x="end" gap="20">
            <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
            <lew-badge round value="3">
              <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
            </lew-badge>
            <lew-badge round value="99+">
              <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
            </lew-badge>
            <lew-badge type="light" color="blue" round value="99+">
              <lew-avatar src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668" />
            </lew-badge>
            <lew-avatar
              src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
              status="online"
              statusPlacement="bottom-left"
            />
            <lew-avatar
              src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
              status="processing"
              statusPlacement="bottom-right"
            />
          </lew-flex>
          <lew-flex x="end" gap="10">
            <lew-tag type="light">911</lew-tag>
            <lew-tag type="light" color="green">Cayenne</lew-tag>
            <lew-tag type="light" color="red">Panamera</lew-tag>
            <lew-tag type="light" color="warning">718 Boxster</lew-tag>
            <lew-tag type="light" color="normal">Macan</lew-tag>
            <lew-tag type="light" color="blue">Taycan Cross Turismo</lew-tag>
          </lew-flex>

          <lew-flex x="end" gap="20">
            <lew-button round text="御 Mavic" color="red" type="light" />
            <lew-button round text="经纬 Matrice" color="yellow" type="light" />
            <lew-button text="精灵 Phantom" color="orange" type="light" />
            <lew-button text="悟 Inspire" color="blue" type="light" />
            <lew-button text="如影 Ronin" color="cyan" type="light" />
            <lew-button text="禅思 Zenmuse" color="green" type="light" />
          </lew-flex>
          <lew-flex x="end">
            <lew-breadcrumb :options="breadcrumb_options" />
          </lew-flex>

          <lew-flex x="end" style="width: 380px">
            <lew-tabs v-model="tabValue" :options="tab_options" />
          </lew-flex>

          <lew-flex gap="20" x="end">
            <lew-dropdown :options="dropdown_options">
              <lew-button text="悬停" type="light" color="normal" />
            </lew-dropdown>
            <lew-dropdown :options="dropdown_options" trigger="click" placement="top">
              <lew-button text="点击" type="light" color="normal" />
            </lew-dropdown>
          </lew-flex>
        </lew-flex>
        <lew-flex style="width: 450px; margin-top: 0px" class="item">
          <lew-form row-gap="30" ref="formRef" :options="options" />
        </lew-flex>
        <lew-flex class="item" direction="y" gap="20">
          <lew-alert :options="list" />
          <lew-flex wrap x="start" gap="10">
            <lew-button
              text="错误"
              color="pink"
              size="small"
              type="light"
              @click="message('error')"
            />
            <lew-button
              text="成功"
              size="small"
              color="green"
              type="light"
              @click="message('success')"
            />
            <lew-button
              text="警告"
              size="small"
              color="yellow"
              type="light"
              @click="message('warning')"
            />
            <lew-button
              text="信息"
              size="small"
              color="blue"
              type="light"
              @click="message('info')"
            />
            <lew-button
              text="普通"
              size="small"
              color="normal"
              type="light"
              @click="message('normal')"
            />
          </lew-flex>
          <lew-flex wrap x="start" gap="10">
            <lew-button
              round
              text="成功通知"
              type="light"
              color="green"
              @click="notification('success')"
            />
            <lew-button
              round
              text="警告提示"
              type="light"
              color="yellow"
              @click="notification('warning')"
            />
            <lew-button
              round
              text="错误信息通知"
              type="light"
              color="red"
              @click="notification('error')"
            />
            <lew-button round text="信息" type="light" color="blue" @click="notification('info')" />
            <lew-button
              round
              text="普通消息提醒"
              type="light"
              color="normal"
              @click="notification('normal')"
            />
          </lew-flex>
          <lew-flex wrap x="start" gap="10">
            <lew-button text="删除" type="light" color="error" @click="open('error')" />
            <lew-button text="取消预订" type="light" color="warning" @click="open('warning')" />
            <lew-button
              text="提交新的申请表单"
              type="light"
              color="success"
              @click="open('success')"
            />
            <lew-button text="查看" type="light" color="info" @click="open('info')" />
          </lew-flex>
          <lew-flex x="start" gap="10">
            <lew-popover ref="lewPopoverRef" trigger="click" placement="bottom-start">
              <template #trigger>
                <lew-button text="修改密码" />
              </template>
              <template #popover-body>
                <div class="popover-body" style="width: 240px">
                  <lew-input v-model="v" placeholder="请输入密码" />
                  <lew-flex x="end" style="margin-top: 15px">
                    <lew-button
                      text="取消"
                      type="text"
                      size="small"
                      @click="lewPopoverRef.hide()"
                    />
                    <lew-button text="提交" size="small" @click="submit()" />
                  </lew-flex>
                </div>
              </template>
            </lew-popover>
          </lew-flex>
        </lew-flex>
      </lew-flex>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popover-body {
  padding: 10px;
  box-sizing: border-box;
}

.home-wrapper {
  width: 100%;
  overflow: hidden;

  .startbox {
    position: fixed;
    left: 50px;
    top: 90px;
    z-index: 99;
    animation: start 3s ease;
    animation-fill-mode: forwards;
    opacity: 0;

    .slogan {
      display: flex;
      font-size: 50px;
      font-weight: 900;
      cursor: pointer;

      .dm {
        width: 50px;
        overflow: hidden;

        .text {
          display: flex;
          transition: all 0.5s ease;
        }
      }
    }

    .slogan:hover {
      .text {
        transform: translateX(-100%);
      }
    }
  }

  .home {
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    animation: demo 4s ease;
    animation-fill-mode: forwards;
    opacity: 0;
    margin-top: -50px;
    z-index: 99;
    .item {
      flex-shrink: 0;
      width: 350px;
      height: calc(100vh - 70px);
    }
  }

  @keyframes demo {
    from {
      opacity: 0;
      transform: scale(0.8) perspective(800px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
        translate(0px, 0px);
    }

    to {
      opacity: 1;
      transform: scale(1) perspective(1000px) rotateX(12deg) rotateY(-24deg) rotateZ(8deg)
        translate(-30px, 50px);
    }
  }

  @keyframes start {
    from {
      opacity: 0;
      transform: translateY(15%);
    }

    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
}

@media (max-width: 767px) {
  .home-wrapper {
    .startbox {
      left: 50%;
      top: 25px;
      text-align: center;
      white-space: nowrap;
    }

    @keyframes start {
      from {
        opacity: 0;
        transform: translate(-50%, 100%);
      }

      to {
        opacity: 1;
        transform: translate(-50%, 50%);
      }
    }

    @keyframes demo {
      from {
        opacity: 0;
        transform: scale(0.3) translate(0px, 200px) rotateX(0deg) rotateY(0deg);
      }

      to {
        opacity: 1;
        transform: scale(0.5) translate(0px, 200px) rotateX(15deg) rotateY(-15deg);
      }
    }

    .home {
      .item {
        flex-shrink: 0;
        width: 300px;
        height: calc(100vh - 70px);
      }
    }
  }
}
</style>
