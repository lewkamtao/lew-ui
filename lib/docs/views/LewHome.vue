<script setup lang="ts">
import Icon from 'lew-ui/utils/Icon.vue'
import { random } from 'lodash-es'
import { useRouter } from 'vue-router'
import * as Yup from 'yup'
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
    label: 'Library Name',
    as: 'input',
    rule: Yup.string().required('Please enter the complete library name'),
    props: {
      clearable: true,
    },
  },
  {
    field: 'componentDescription',
    label: 'Description',
    as: 'textarea',
    rule: Yup.string().required(
      'Please describe the key features and advantages',
    ),
    props: {
      clearable: true,
      showCount: true,
      maxLength: 500,
    },
  },
  {
    field: 'category',
    label: 'Category',
    as: 'select',
    rule: Yup.string().required('Please select the library category'),
    props: {
      clearable: true,
      options: [
        {
          label: 'UI Components',
          value: '1',
        },
        {
          label: 'Utility Components',
          value: '2',
        },
        {
          label: 'Layout Components',
          value: '3',
        },
        {
          label: 'Form Components',
          value: '4',
        },
        {
          label: 'Data Display Components',
          value: '5',
        },
      ],
    },
  },
  {
    field: 'features',
    label: 'Features',
    as: 'select-multiple',
    rule: Yup.array()
      .min(1, 'Please select at least one core feature')
      .required('Please select the main features'),
    props: {
      clearable: true,
      options: [
        { label: 'Responsive Design', value: '1' },
        { label: 'Elegant API', value: '2' },
        { label: 'I18n Support', value: '3' },
        { label: 'Rich Animations', value: '4' },
        { label: 'Accessibility', value: '5' },
        { label: 'Event System', value: '6' },
        { label: 'State Management', value: '7' },
        { label: 'Slot Support', value: '8' },
      ],
    },
  },
  {
    field: 'info.releaseDate',
    label: 'Release Date',
    as: 'date-picker',
    rule: Yup.string().required('Please select the initial release date'),
    props: {},
  },
  {
    field: 'info.availabilityPeriod',
    label: 'Support Period',
    as: 'date-range-picker',
    rule: Yup.object().required('Please select the long-term support period'),
    props: {},
  },
  {
    field: 'usageFramework',
    label: 'Framework',
    as: 'radio-group',
    rule: Yup.string().required('Please select the compatible framework'),
    props: {
      options: [
        {
          label: 'Vue 3',
          value: 'vue',
        },
        {
          label: 'React',
          value: 'react',
        },
        {
          label: 'Angular',
          value: 'angular',
        },
      ],
    },
  },
  {
    field: 'targetUsers',
    label: 'Target Users',
    as: 'checkbox-group',
    rule: Yup.array()
      .min(1, 'Please select at least one target user group')
      .required('Please select the primary target users'),
    props: {
      options: [
        { label: 'FE Dev', value: '1' },
        { label: 'FS Dev', value: '2' },
        { label: 'UI/UX', value: '3' },
        { label: 'PM', value: '4' },
      ],
    },
  },
  {
    field: 'devFocus',
    label: 'Dev Focus',
    as: 'tabs',
    rule: Yup.string().required('Please select the main development focus'),
    props: {
      options: [
        {
          label: 'Innovation',
          value: '1',
        },
        {
          label: 'Performance',
          value: '2',
        },
        {
          label: 'User Experience',
          value: '3',
        },
        {
          label: 'Stability',
          value: '4',
        },
      ],
    },
  },
  {
    field: 'info.keywordTags',
    label: 'Keywords',
    as: 'input-tag',
    rule: Yup.array()
      .min(1, 'Please enter at least one keyword')
      .required('Please enter keywords that highlight library features'),
    props: {
      clearable: true,
    },
  },
  {
    field: 'info.isOpenSource',
    label: 'Open Source',
    as: 'switch',
    rule: Yup.boolean().required(
      'Please specify if the library is open source',
    ),
    props: {},
  },
])

const formRef = ref()

onMounted(() => {
  setTimeout(() => {
    sprs()
  }, 1000)
  formRef.value.setForm({
    componentName: 'Lew UI',
    componentDescription:
      'Lew-UI is a lightweight Vue 3 component library focused on providing clean and practical UI components for rapid development of small to medium-sized projects.',
    category: '1',
    features: ['1', '2', '4'],
    usageFramework: 'vue',
    targetUsers: ['1', '2'],
    developmentFocus: '3',
    info: {
      releaseDate: '2022-05-24',
      availabilityPeriod: {
        start: '2022-05-24',
        end: '2099-10-24',
      },
      keywordTags: ['Efficient', 'Easy-to-use', 'Flexible'],
      isOpenSource: true,
    },
  })
})
function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}
function sprs() {
  const duration = 5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 50,
    zIndex: 999,
  }

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

    // @ts-expect-error confetti
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.1, 0.3),
        y: Math.random() - 0.2,
      },
    })

    // @ts-expect-error confetti
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.7, 0.9),
        y: Math.random() - 0.2,
      },
    })
  }, 250)
}

const router = useRouter()
const v = ref('')
const lewPopoverRef = ref()
function submit() {
  LewMessage.error(v.value || 'Password cannot be empty')
  lewPopoverRef.value.hide()
}
function open(type: string) {
  LewDialog[type]({
    title: 'Confirm Action',
    content: 'This action cannot be undone. Are you sure you want to continue?',
  })
}

const breadcrumb_options = ref([
  {
    label: 'Shop',
    value: '/',
    type: 'light',
  },
  {
    label: 'Electronics',
    value: '/electronics',
    type: 'light',
  },
  {
    label: 'Smartphones',
    value: '/electronics/smartphones',
    type: 'light',
  },
  {
    label: 'iPhone 14 Pro Max',
    value: '',
    active: true,
    type: 'light',
  },
])

const tab_options = ref([
  { label: 'Electronics', value: '1', type: 'light' },
  { label: 'Fashion', value: '2', type: 'light' },
  { label: 'Home & Garden', value: '3', type: 'light' },
  { label: 'Sports', value: '4', type: 'light' },
  { label: 'Beauty', value: '5', type: 'light' },
  { label: 'Toys & Games', value: '6', type: 'light' },
  { label: 'Books', value: '7', type: 'light' },
  { label: 'Jewelry', value: '8', type: 'light' },
])

const tabValue = ref('4')
const dropdown_options = ref([
  {
    label: 'Espresso',
    value: 1,
  },
  {
    label: 'Cappuccino',
    value: 2,
  },
  {
    label: 'Latte',
    value: 3,
  },
  {
    label: 'Mocha',
    value: 4,
  },
  {
    label: 'Americano',
    value: 5,
  },
  {
    label: 'Cold Brew',
    value: 6,
  },
])

function message(type: string) {
  const messages = {
    info: 'New Feature: Explore iOS 17 with enhanced iPhone intelligence.',
    success: 'Update Complete: Your device has been successfully updated.',
    warning: 'Apple ID Alert: Please verify your Apple ID email.',
    error: 'Security Alert: Unusual login activity detected on your account.',
  }
  LewMessage[type](
    messages[type as keyof typeof messages] || 'Notification from Apple',
  )
}

function notification(type: string) {
  const notifications = {
    info: {
      title: 'iOS Update Available',
      content:
        'iOS 17 is now available with smarter features. Update now to experience the latest innovations.',
    },
    success: {
      title: 'Apple ID Verified',
      content:
        'Your Apple ID has been successfully verified. Thank you for keeping your account secure.',
    },
    warning: {
      title: 'iCloud Storage Low',
      content:
        'Your iCloud storage is almost full. Upgrade your storage plan to ensure data backup.',
    },
    error: {
      title: 'Security Alert',
      content:
        'Unusual login activity detected on your Apple ID. Please review and update your password.',
    },
  }

  LewNotification[type](
    notifications[type as keyof typeof notifications] || {
      title: 'Apple Notification',
      content: 'Important notification from Apple',
    },
  )
}

const logoLeft = ref('')

function getLogoLeft() {
  const logoElement = document.querySelector('#logo')
  if (logoElement) {
    const rect = logoElement.getBoundingClientRect()
    logoLeft.value = `${rect.left + window.scrollX}px`
  }
}

onMounted(() => {
  getLogoLeft()
  window.addEventListener('resize', getLogoLeft)
})
onUnmounted(() => {
  window.removeEventListener('resize', getLogoLeft)
})
</script>

<template>
  <div class="home-wrapper">
    <LewBg />
    <div :style="{ left: logoLeft }" class="startbox">
      <div class="slogan">
        {{ $t("home.sloganTitle") }}
      </div>
      <p>{{ $t("home.slogan") }}</p>
      <lew-flex x="start">
        <lew-button
          round
          style="margin-top: 20px"
          @click="router.push('/Image')"
        >
          {{ $t("home.getStarted") }}
          <Icon type="chevron-right" />
        </lew-button>
      </lew-flex>
    </div>
    <div class="home">
      <lew-flex direction="x" gap="40">
        <lew-flex class="item" direction="y" x="end" gap="40">
          <lew-flex direction="y" x="end" gap="0px">
            <lew-title :size="16" :bold="200">
              Lew Design 16px
            </lew-title>
            <lew-title :size="24" :bold="400">
              Lew Design 24px
            </lew-title>
            <lew-title :size="32" :bold="600">
              Lew Design 32px
            </lew-title>
            <lew-title :size="40" :bold="800">
              Lew Design 40px
            </lew-title>
          </lew-flex>
          <lew-flex style="width: 500px" x="end" gap="20">
            <lew-avatar size="40" shape="circle" />
            <lew-avatar alt="Larry Page" size="40" shape="circle" />
            <lew-avatar alt="Tim Cook" size="40" shape="circle" />
            <lew-avatar
              shape="circle"
              status="online"
              src="https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_1_ctd06i_.jpeg"
              alt="avatar"
            />
            <lew-avatar
              src=" https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_4_7cwenb_.jpeg"
              status="online"
              shape="circle"
            />

            <lew-avatar
              shape="circle"
              src="https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_2_2s0nai_.jpeg"
              status="away"
              alt="avatar"
            />
            <lew-avatar
              shape="circle"
              status="offline"
              src="https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/apple_leader_3_kntap6_.jpeg"
              alt="avatar"
            />
          </lew-flex>
          <lew-flex x="end" gap="10">
            <lew-tag type="light">
              MacBook
            </lew-tag>
            <lew-tag type="light" color="green">
              iPad
            </lew-tag>
            <lew-tag type="light" color="red">
              iPhone
            </lew-tag>
            <lew-tag type="light" color="warning">
              Watch
            </lew-tag>
            <lew-tag type="light" color="normal">
              AirPods
            </lew-tag>
            <lew-tag type="light" color="blue">
              Vision Pro
            </lew-tag>
          </lew-flex>

          <lew-flex x="end" gap="20">
            <lew-button round text="Explore" color="red" type="light" />
            <lew-button round text="Shop" color="yellow" type="light" />
            <lew-button text="Learn" color="orange" type="light" />
            <lew-button text="Support" color="blue" type="light" />
            <lew-button text="Services" color="cyan" type="light" />
            <lew-button text="Business" color="green" type="light" />
          </lew-flex>
          <lew-flex x="end">
            <lew-breadcrumb :options="breadcrumb_options" />
          </lew-flex>

          <lew-flex x="end" style="width: 380px">
            <lew-tabs v-model="tabValue" :options="tab_options" />
          </lew-flex>

          <lew-flex gap="20" x="end">
            <lew-dropdown :options="dropdown_options">
              <lew-button text="Hover" type="light" color="normal" />
            </lew-dropdown>
          </lew-flex>
        </lew-flex>
        <lew-flex style="width: 450px; margin-top: 0px" class="item">
          <lew-form ref="formRef" row-gap="30" :options="options" />
        </lew-flex>
        <lew-flex class="item" direction="y" gap="20">
          <lew-alert type="warning" title="Please confirm deletion" />
          <lew-alert type="info">
            <template #title>
              New Feature
            </template>
            <template #content>
              Google Photos now offers enhanced photo management features.
            </template>
          </lew-alert>

          <lew-alert
            type="error"
            title="Payment Failed"
            content="Your Apple Pay transaction failed. Please check your card details."
          />

          <lew-alert type="success">
            <template #title>
              Update Complete
            </template>
            <template #content>
              Your device has been successfully updated
            </template>
          </lew-alert>
          <lew-flex wrap x="start" gap="10">
            <lew-button
              text="Error"
              color="pink"
              size="small"
              type="light"
              @click="message('error')"
            />
            <lew-button
              text="Success"
              size="small"
              color="green"
              type="light"
              @click="message('success')"
            />
            <lew-button
              text="Warning"
              size="small"
              color="yellow"
              type="light"
              @click="message('warning')"
            />
            <lew-button
              text="Info"
              size="small"
              color="blue"
              type="light"
              @click="message('info')"
            />
          </lew-flex>
          <lew-flex wrap x="start" gap="10">
            <lew-button
              round
              text="Success"
              type="light"
              color="green"
              @click="notification('success')"
            />
            <lew-button
              round
              text="Warning"
              type="light"
              color="yellow"
              @click="notification('warning')"
            />
            <lew-button
              round
              text="Error"
              type="light"
              color="red"
              @click="notification('error')"
            />
            <lew-button
              round
              text="Info"
              type="light"
              color="blue"
              @click="notification('info')"
            />
          </lew-flex>
          <lew-flex wrap x="start" gap="10">
            <lew-button
              text="Delete"
              type="light"
              color="error"
              @click="open('error')"
            />
            <lew-button
              text="Cancel"
              type="light"
              color="warning"
              @click="open('warning')"
            />
            <lew-button
              text="Submit"
              type="light"
              color="success"
              @click="open('success')"
            />
            <lew-button
              text="View"
              type="light"
              color="info"
              @click="open('info')"
            />
          </lew-flex>
          <lew-flex x="start" gap="10">
            <lew-popover
              ref="lewPopoverRef"
              trigger="click"
              placement="bottom-start"
            >
              <template #trigger>
                <lew-button text="Change Password" />
              </template>
              <template #popover-body>
                <div class="popover-body" style="width: 240px">
                  <lew-input
                    v-model="v"
                    width="100%"
                    placeholder="Enter password"
                  />
                  <lew-flex x="end" style="margin-top: 15px">
                    <lew-button
                      text="Cancel"
                      type="text"
                      size="small"
                      @click="lewPopoverRef.hide()"
                    />
                    <lew-button text="Submit" size="small" @click="submit()" />
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

  .startbox {
    position: fixed;
    left: 50px;
    top: 90px;
    z-index: 999;
    animation: start 3s ease;
    animation-fill-mode: forwards;
    opacity: 0;

    .slogan {
      display: flex;
      font-size: 50px;
      font-weight: 900;
    }
  }
  .home-start-button {
    position: relative;
    z-index: 9999;
  }
  .home {
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    animation: demo 4s ease;
    animation-fill-mode: forwards;
    opacity: 0;
    margin-top: -50px;
    margin-left: 30px;
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
      transform: scale(0.8) perspective(800px) rotateX(0deg) rotateY(0deg)
        rotateZ(0deg) translate(0px, 0px);
    }

    to {
      opacity: 1;
      transform: scale(1.1) perspective(1000px) rotateX(12deg) rotateY(-24deg)
        rotateZ(8deg) translate(-30px, 50px);
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
        transform: scale(0.5) translate(0px, 200px) rotateX(15deg)
          rotateY(-15deg);
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
