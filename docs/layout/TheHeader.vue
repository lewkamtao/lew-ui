<script setup lang="ts">
import { useDark } from '@vueuse/core'
import docsLocale, { getInitialLocale } from 'docs/locals'
import { setLocale } from 'lew-ui'
import { Github, Languages, Moon, Settings, Sun } from 'lucide-vue-next'
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

  {
    label: '日本語',
    value: 'ja',
    checkable: true,
    icon: () => {
      return h('img', {
        src: getLocaleIcon('ja'),
        alt: '日本語',
        width: 16,
        height: 16,
      })
    },
    onClick: (e: any) => {
      changeLanguage(e)
    },
  },
  {
    label: '한국어',
    value: 'ko',
    checkable: true,
    icon: () => {
      return h('img', {
        src: getLocaleIcon('ko'),
        alt: '한국어',
        width: 16,
        height: 16,
      })
    },
    onClick: (e: any) => {
      changeLanguage(e)
    },
  },
  {
    label: 'Español',
    value: 'es',
    checkable: true,
    icon: () => {
      return h('img', {
        src: getLocaleIcon('es'),
        alt: 'Español',
        width: 16,
        height: 16,
      })
    },
    onClick: (e: any) => {
      changeLanguage(e)
    },
  },
  {
    label: 'Français',
    value: 'fr',
    checkable: true,
    icon: () => {
      return h('img', {
        src: getLocaleIcon('fr'),
        alt: 'Français',
        width: 16,
        height: 16,
      })
    },
    onClick: (e: any) => {
      changeLanguage(e)
    },
  },
  {
    label: 'Deutsch',
    value: 'de',
    checkable: true,
    icon: () => {
      return h('img', {
        src: getLocaleIcon('de'),
        alt: 'Deutsch',
        width: 16,
        height: 16,
      })
    },
    onClick: (e: any) => {
      changeLanguage(e)
    },
  },
  {
    label: 'Português',
    value: 'pt',
    checkable: true,
    icon: () => {
      return h('img', {
        src: getLocaleIcon('br'),
        alt: 'Português',
        width: 16,
        height: 16,
      })
    },
    onClick: (e: any) => {
      changeLanguage(e)
    },
  },
  {
    label: 'Italiano',
    value: 'it',
    checkable: true,
    icon: () => {
      return h('img', {
        src: getLocaleIcon('it'),
        alt: 'Italiano',
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
      <div class="menu-item" @click="goToPage('/form-engine', true)">
        <lew-flex gap="5px">
          {{ docsLocale.t("home.formEngine") }}
        </lew-flex>
      </div>
      <div class="menu-item" @click="goToPage('/desc-engine', true)">
        <lew-flex gap="5px">
          {{ docsLocale.t("home.descEngine") }}
        </lew-flex>
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
        <Github :size="18" />
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
