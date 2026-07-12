<script setup lang="ts">
import { Languages, Moon, Settings, Sun } from '@lucide/vue'
import { useDark } from '@vueuse/core'
import docsLocale, { getInitialLocale } from 'docs/locals'
import { setLocale } from 'lew-ui'
import { useRoute, useRouter } from 'vue-router'
import packageJson from '../../package.json'

const version = ref(packageJson.version)

const isDark = useDark({
  selector: 'html',
  valueDark: 'lew-dark',
  valueLight: 'lew-light',
})

const router = useRouter()
const route = useRoute()

function goHome() {
  if (route.name === 'R-LewHome') {
    LewMessage.warning('你已经在首页了！')
  }
  else {
    router.push('/')
  }
}

function goToPage(path: string, isNewTab = false) {
  if (isNewTab) {
    const URL = router.resolve(path).href
    window.open(URL, '_blank')
  }
  else {
    router.push(path)
  }
}

function goToGithub() {
  window.open('https://github.com/lewkamtao/Lew-UI', '_blank')
}

function getLocaleIcon(locale: string) {
  return new URL(`../assets/images/local/${locale}.svg`, import.meta.url).href
}
const localeOptions = ref([
  {
    label: '简体中文',
    value: 'zh',
    checkable: true,
    icon: () => {
      return h('img', {
        src: getLocaleIcon('zh'),
        alt: '简体中文',
        width: 16,
        height: 16,
      })
    },
    onClick: (e: any) => {
      changeLanguage(e)
    },
  },
  {
    label: 'English',
    value: 'en',
    checkable: true,
    icon: () => {
      return h('img', {
        src: getLocaleIcon('us'),
        alt: 'English',
        width: 16,
        height: 16,
      })
    },
    onClick: (e: any) => {
      changeLanguage(e)
    },
  },
])

function changeLanguage(e: any) {
  const { value } = e
  setLocale(value)
  docsLocale.use(value)
  localeOptions.value.forEach((item: any) => {
    if (item.value === e.value) {
      item.checked = true
    }
    else {
      item.checked = false
    }
  })
}

function goToSettings() {
  const link = router.resolve('/check-lang').href
  window.open(link, '_blank')
}

const isDev = ['localhost', '127.0.0.1'].includes(window.location.hostname)

// 初始化语言（异步）
getInitialLocale().then((locale) => {
  changeLanguage({ value: locale })
})
</script>

<template>
  <lew-flex mode="between" class="Header">
    <lew-flex id="logo" class="logo" x="start" @click="goHome">
      <img
        src="../assets/images/logo.png"
        alt="logo"
        srcset=""
        width="30"
        height="30"
      >
      <span style="margin-left: 10px"> Lew UI</span>
      <lew-tag type="light" size="small" style="margin-left: 10px">
        v{{ version }}
      </lew-tag>
    </lew-flex>
    <lew-flex gap="15px" x="center" class="menu">
      <div class="menu-item" @click="goToPage('/')">
        {{ docsLocale.t("home.home") }}
      </div>
      <div class="menu-item" @click="goToPage('/Install')">
        {{ docsLocale.t("home.install") }}
      </div>
      <div class="menu-item" @click="goToPage('/Image')">
        {{ docsLocale.t("home.components") }}
      </div>
    </lew-flex>
    <lew-flex gap="15px" x="end" class="menu">
      <div v-if="isDev" class="menu-item menu-item-icon" @click="goToSettings">
        <Settings :size="18" />
      </div>
      <div class="menu-item menu-item-icon" @click="isDark = !isDark">
        <Sun class="icon-mode-sunny" :size="18" />
        <Moon class="icon-mode-moon" :size="18" />
      </div>
      <lew-dropdown :options="localeOptions">
        <div class="menu-item menu-item-icon">
          <Languages :size="18" />
        </div>
      </lew-dropdown>
      <div class="menu-item menu-item-icon" @click="goToGithub">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </div>
    </lew-flex>
  </lew-flex>
</template>

<style lang="scss" scoped>
.Header {
  position: relative;
  z-index: 2001;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  user-select: none;
  white-space: nowrap;

  .logo {
    display: flex;
    align-items: center;
    font-size: 22px;
    cursor: pointer;

    .lew-badge {
      margin-left: 10px;
    }
  }

  .menu {
    display: flex;
    align-items: center;

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 10px;
      font-size: 16px;
      transition: all 0.25s;
      color: var(--lew-text-color-1);
      cursor: pointer;
      box-sizing: border-box;
      height: 30px;
      border-radius: var(--lew-border-radius-small);
      font-weight: bold;

      svg {
        cursor: pointer;
      }
    }

    .menu-item-icon {
      width: 30px;
      padding: 0px;
    }

    a:hover,
    span:hover,
    .menu-item:hover {
      opacity: 1;
      background-color: var(--lew-bgcolor-4);
    }
  }
}

@media (max-width: 767px) {
  .Header {
    padding: 0px 15px;

    .logo {
      span {
        display: none;
      }
    }

    .menu {
      gap: 5px !important;

      .menu-item {
        margin-right: 5px;
        padding: 5px;
      }

      .menu-item:nth-child(3) {
        margin-right: 0px;
      }

      span {
        margin-right: 0px;
      }

      a {
        margin-right: 5px;
      }
    }
  }
}
</style>

<style lang="scss">
.icon-mode-sunny {
  display: none !important;
}

.icon-mode-moon {
  display: block !important;
}

.lew-dark {
  .logo {
    img {
      filter: invert(100%);
    }
  }

  .icon-mode-sunny {
    display: block !important;
  }

  .icon-mode-moon {
    display: none !important;
  }
}
</style>
