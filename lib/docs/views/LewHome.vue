<script setup lang="ts">
import { useRouter } from 'vue-router'
import * as Yup from 'yup'
import { schools } from '@/lib/data'
import { random } from 'lodash-es'

const viewTotal = ref(100000000)

const timer = setInterval(() => {
  viewTotal.value += random(1, 1000000)
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})

const schoolsOptions = schools.map((e, i) => {
  return { label: e, value: i + 1 }
})

const options = ref([
  {
    field: 'input',
    label: 'Input',
    as: 'input',
    rule: Yup.number().required('不能为空'),
    props: {
      clearable: true
    }
  },
  {
    field: 'textarea',
    label: 'Textarea',
    as: 'textarea',
    rule: Yup.string().required('不能为空'),
    props: {
      clearable: true,
      showCount: true,
      maxLength: 300
    }
  },
  {
    field: 'select',
    label: 'Select',
    as: 'select',
    rule: Yup.string().required('此项必填'),
    props: {
      clearable: true,
      options: [
        {
          label: '广东',
          value: '1'
        },
        {
          label: '深圳',
          value: '2'
        },
        {
          label: '杭州',
          value: '3'
        },
        {
          label: '上海',
          value: '4'
        },
        {
          label: '北京',
          value: '5'
        }
      ]
    }
  },
  {
    field: 'select_multiple',
    label: 'SelectMultiple',
    as: 'select-multiple',
    rule: Yup.array().min(1, '至少选择一个').required('此项必填'),
    props: {
      change: (e: any) => {
        console.log(e)
      },
      clearable: true,
      options: schoolsOptions
    }
  },
  {
    field: 'info.date_picker',
    label: 'DatePicker',
    as: 'date-picker',
    rule: Yup.string().required('此项必填'),
    props: {}
  },
  {
    field: 'info.date_range_picker',
    label: 'DateRangePicker',
    as: 'date-range-picker',
    rule: Yup.object().required('此项必填'),
    props: {}
  },
  {
    field: 'radio_group',
    label: 'Radio',
    as: 'radio-group',
    rule: Yup.string().required('此项必填'),
    props: {
      options: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        },
        {
          label: '不公开',
          value: '3'
        }
      ]
    }
  },
  {
    field: 'checkbox_group',
    label: 'Checkbox',
    as: 'checkbox-group',
    rule: Yup.array().min(1, '至少选择一个').required('此项必填'),
    props: {
      options: [
        {
          label: '唱歌',
          value: '1'
        },
        {
          label: '跳舞',
          value: '2'
        },
        {
          label: 'Rap',
          value: '3'
        },
        {
          label: '打篮球',
          value: '4'
        }
      ]
    }
  },
  {
    field: 'tabs',
    label: 'Tabs',
    as: 'tabs',
    rule: Yup.string().required('此项必填'),
    props: {
      options: [
        {
          label: 'Java',
          value: '1'
        },
        {
          label: 'Golang',
          value: '2'
        },
        {
          label: 'C++',
          value: '3'
        },
        {
          label: 'TypeScript',
          value: '4'
        },
        {
          label: 'PHP',
          value: '5'
        },
        {
          label: 'Python',
          value: '6'
        }
      ]
    }
  },
  {
    field: 'info.input_tag',
    label: 'InputTag',
    as: 'input-tag',
    rule: Yup.array().min(1, '至少选择一个').required('不能为空'),
    props: {
      clearable: true
    }
  },
  {
    field: 'info.switch',
    label: 'Switch',
    as: 'switch',
    rule: Yup.boolean().required('此项必填'),
    props: {}
  }
])

let formRef = ref()

onMounted(() => {
  sprs()
  formRef.value.setForm({
    tabs: '1',
    radio_group: '1',
    checkbox_group: ['1', '2'],
    info: { input_tag: ['Red', 'Green', 'Blue'] }
  })
})

const sprs = () => {
  const duration = 3 * 1000
  const animationEnd = Date.now() + duration
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0
  }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

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
  }, 300)
}

const router = useRouter()
const v = ref('')
const lewPopoverRef = ref()
const submit = () => {
  LewMessage.error(v.value || '密码不可为空')
  lewPopoverRef.value.hide()
}
const open = (type: string) => {
  LewDialog[type]({
    title: '删除确认',
    content: '删除之后无法恢复，请确定',
    ok: () => {
      console.log('确定')
    },
    cancel: () => {
      console.log('取消')
    }
  })
}

const breadcrumb_options = ref([
  {
    label: '首页',
    to: '/'
  },
  {
    label: 'Vue',
    to: 'https://vuejs.org/'
  },
  {
    label: '商品列表',
    to: ''
  },
  {
    label: '商品详情',
    to: '',
    active: true
  }
])

const tab_soptions = ref([
  { label: '北京', value: '1' },
  { label: '上海', value: '2' },
  { label: '广州', value: '3' },
  { label: '深圳', value: '4' },
  { label: '乌鲁木齐', value: '5' }
])

const tabValue = ref('2')

const dropdown_options = ref([
  {
    label: '西游记',
    value: '1'
  },
  {
    label: '水浒传',
    value: '2'
  },
  {
    label: '三国演义',
    value: '3'
  },
  {
    label: '红楼梦',
    value: '4'
  }
])

const list = ref([
  {
    type: 'info',
    title: '成功发送一条消息',
    content: ''
  },
  {
    type: 'normal',
    title: '成功发送一条消息',
    content: ''
  },
  {
    type: 'warning',
    title: '成功发送一条消息',
    content: ''
  },

  {
    type: 'error',
    title: '成功发送一条消息',
    content: ''
  },
  {
    type: 'success',
    title: '成功发送一条消息',
    content: ''
  }
])

const message = (type: string) => {
  LewMessage[type]('这是一条demo消息')
}

const notification = (type: string) => {
  // @ts-ignore
  LewNotification[type]({
    title: '提示',
    content: '这是一条demo消息'
  })
}
</script>

<template>
  <div class="home-wrapper">
    <div class="startbox">
      <div class="slogan">
        少就是
        <div class="dm">
          <div class="text"><span>多</span> <span>美</span></div>
        </div>
      </div>
      <p>一个 Vue 3 组件库</p>
      <lew-flex>
        <lew-button
          round
          icon="arrow-right"
          iconPosition="right"
          text="Get started"
          style="margin-top: 20px"
          @click="router.push('/Avatar')"
        />
        <a href="/#/form-engine" target="_blank">
          <lew-button
            round
            text="表单引擎 🎉"
            style="margin-top: 20px"
            color="primary"
            type="light"
          />
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
              成交额： ￥<lew-magic-number sep :value="viewTotal" :size="40" />
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
              statusPosition="bottom-left"
            />
            <lew-avatar
              src="https://q1.qlogo.cn/g?b=qq&s=100&nk=1057072668"
              status="processing"
              statusPosition="bottom-right"
            />
          </lew-flex>
          <lew-flex x="end" gap="10">
            <lew-tag round size="small">primary</lew-tag>
            <lew-tag round size="small" color="green">success</lew-tag>
            <lew-tag round size="small" color="red">error</lew-tag>
            <lew-tag round size="small" color="warning">warning</lew-tag>
            <lew-tag round size="small" color="normal">normal</lew-tag>
          </lew-flex>

          <lew-flex x="end" gap="20">
            <lew-button round text="Cancel" color="red" />
            <lew-button round text="Cancel" color="yellow" />
            <lew-button text="Phone" color="orange" icon="phone" />
            <lew-button text="Confirm" color="blue" icon="box" />
            <lew-button text="Confirm" color="cyan" loading />
          </lew-flex>
          <lew-flex x="end">
            <lew-breadcrumb :options="breadcrumb_options" />
          </lew-flex>

          <lew-flex x="end" style="width: 380px">
            <lew-tabs v-model="tabValue" :options="tab_soptions" />
          </lew-flex>

          <lew-flex gap="20" x="end">
            <lew-dropdown :options="dropdown_options">
              <lew-button text="Hover" type="light" color="normal" />
            </lew-dropdown>
            <lew-dropdown :options="dropdown_options" trigger="click" placement="top">
              <lew-button text="Click" type="light" color="normal" />
            </lew-dropdown>
          </lew-flex>
        </lew-flex>
        <lew-flex style="width: 450px; margin-top: 30px" class="item">
          <lew-form row-gap="30" ref="formRef" :options="options" />
        </lew-flex>
        <lew-flex class="item" direction="y" gap="20">
          <lew-alert :options="list" />
          <lew-flex wrap x="start" gap="20">
            <lew-button
              text="Like"
              color="pink"
              round
              icon="heart"
              type="light"
              @click="message('error')"
            />
            <lew-button text="Save" color="green" @click="message('success')" />
          </lew-flex>
          <lew-flex wrap x="start" gap="20">
            <lew-button text="Notification" color="green" @click="notification('success')" />
            <lew-button text="Notification" color="error" @click="notification('error')" />
          </lew-flex>
          <lew-flex wrap x="start" gap="20">
            <lew-button text="Dialog" type="light" color="error" @click="open('error')" />
            <lew-button text="Cancel" type="light" color="warning" @click="open('warning')" />
          </lew-flex>
          <lew-flex x="start" gap="20">
            <lew-popover ref="lewPopoverRef" trigger="click" placement="bottom-start">
              <template #trigger>
                <lew-button text="Popover" />
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
  perspective: 800;
  overflow: hidden;
  -webkit-perspective: 800;

  .startbox {
    position: fixed;
    left: 50px;
    top: 50px;
    z-index: 99;
    animation: start 3s ease;
    animation-fill-mode: forwards;
    animation-delay: 0.5s;
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
    min-height: 100vh;
    box-sizing: border-box;
    animation: demo 3s ease;
    transform: scale(1) rotateX(0deg) rotateY(0deg);
    animation-fill-mode: forwards;
    animation-delay: 0.5s;
    opacity: 0;
    margin-top: -50px;

    .item {
      flex-shrink: 0;
      width: 350px;
      height: calc(100vh - 70px);
    }
  }

  @keyframes demo {
    from {
      opacity: 0;
      transform: scale(0.8) rotateX(0deg) rotateY(0deg);
    }

    to {
      opacity: 1;
      transform: scale(1.2) rotateX(15deg) rotateY(-15deg);
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
