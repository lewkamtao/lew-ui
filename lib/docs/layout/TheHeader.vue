<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'
import { Sun, Moon, Github, Languages } from 'lucide-vue-next'
import { setLocale } from 'lew-ui'
import docsLocale, { getInitialLocale } from '@/locals'

const version = ref('v2.6.0')

const isDark = useDark({
  selector: 'html',
  valueDark: 'lew-dark',
  valueLight: 'lew-light'
})

const router = useRouter()
const route = useRoute()

const goHome = () => {
  if (route.name === 'R-LewHome') {
    LewMessage.warning('你已经在首页了！')
  } else {
    router.push('/')
  }
}

const goToPage = (path: string, isNewTab = false) => {
  if (isNewTab) {
    const URL = router.resolve(path).href
    window.open(URL, '_blank')
  } else {
    router.push(path)
  }
}

const goToGithub = () => {
  window.open('https://github.com/lewkamtao/Lew-UI', '_blank')
}

const localeOptions = ref([
  {
    label: '简体中文',
    value: 'zh',
    checkbox: true,
    renderIcon: () => {
      return h('img', {
        src: 'https://goodies.icons8.com/web/common/header/flags/zh.svg',
        alt: '简体中文',
        width: 16,
        height: 16
      })
    }
  },
  {
    label: 'English',
    value: 'en',
    checkbox: true,
    renderIcon: () => {
      return h('img', {
        src: 'https://goodies.icons8.com/web/common/header/flags/us.svg',
        alt: 'English',
        width: 16,
        height: 16
      })
    }
  },

  {
    label: '日本語',
    value: 'ja',
    checkbox: true,
    renderIcon: () => {
      return h('img', {
        src: 'https://goodies.icons8.com/web/common/header/flags/ja.svg',
        alt: '日本語',
        width: 16,
        height: 16
      })
    }
  },
  {
    label: '한국어',
    value: 'ko',
    checkbox: true,
    renderIcon: () => {
      return h('img', {
        src: 'https://goodies.icons8.com/web/common/header/flags/ko.svg',
        alt: '한국어',
        width: 16,
        height: 16
      })
    }
  },
  {
    label: 'Español',
    value: 'es',
    checkbox: true,
    renderIcon: () => {
      return h('img', {
        src: 'https://goodies.icons8.com/web/common/header/flags/es.svg',
        alt: 'Español',
        width: 16,
        height: 16
      })
    }
  },
  {
    label: 'Français',
    value: 'fr',
    checkbox: true,
    renderIcon: () => {
      return h('img', {
        src: 'https://goodies.icons8.com/web/common/header/flags/fr.svg',
        alt: 'Français',
        width: 16,
        height: 16
      })
    }
  },
  {
    label: 'Deutsch',
    value: 'de',
    checkbox: true,
    renderIcon: () => {
      return h('img', {
        src: 'https://goodies.icons8.com/web/common/header/flags/de.svg',
        alt: 'Deutsch',
        width: 16,
        height: 16
      })
    }
  },
  {
    label: 'Português',
    value: 'pt',
    checkbox: true,
    renderIcon: () => {
      return h('img', {
        src: 'https://goodies.icons8.com/web/common/header/flags/br.svg',
        alt: 'Português',
        width: 16,
        height: 16
      })
    }
  },
  {
    label: 'Italiano',
    value: 'it',
    checkbox: true,
    renderIcon: () => {
      return h('img', {
        src: 'https://goodies.icons8.com/web/common/header/flags/it.svg',
        alt: 'Italiano',
        width: 16,
        height: 16
      })
    }
  }
])

const changeLanguage = (e: any) => {
  const { value } = e
  setLocale(value)
  docsLocale.use(value)
  localeOptions.value.map((item: any) => {
    if (item.value === e.value) {
      item.checked = true
    } else {
      item.checked = false
    }
  })
}

// 初始化语言（异步）
getInitialLocale().then((locale) => {
  changeLanguage({ value: locale })
})
</script>

<template>
  <lew-flex mode="between" class="Header">
    <lew-flex class="logo" id="logo" x="start" @click="goHome">
      <img
        src="../assets/images/logo.png"
        alt="logo"
        srcset=""
        width="30"
        height="30"
      />
      <span style="margin-left: 10px"> Lew UI</span>
      <lew-tag type="light" size="small" style="margin-left: 10px">
        Beta {{ version }}
      </lew-tag>
    </lew-flex>
    <lew-flex gap="15" class="menu">
      <div class="menu-item" @click="goToPage('/')">
        {{ docsLocale.t('home.home') }}
      </div>
      <div class="menu-item" @click="goToPage('/Install')">
        {{ docsLocale.t('home.install') }}
      </div>
      <div class="menu-item" @click="goToPage('/Image')">
        {{ docsLocale.t('home.components') }}
      </div>
      <div class="menu-item" @click="goToPage('/form-engine', true)">
        <lew-flex gap="5">
          {{ docsLocale.t('home.formEngine') }}
        </lew-flex>
      </div>
      <div class="menu-item" @click="goToPage('/desc-engine', true)">
        <lew-flex gap="5"> {{ docsLocale.t('home.descEngine') }} </lew-flex>
      </div>
    </lew-flex>
    <lew-flex gap="15" x="end" class="menu">
      <div class="menu-item menu-item-icon" @click="isDark = !isDark">
        <Sun class="icon-mode-sunny" :size="18" />
        <Moon class="icon-mode-moon" :size="18" />
      </div>
      <lew-dropdown :options="localeOptions" @change="changeLanguage">
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
  z-index: 1001;
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
    .menu-item:nth-child(5) {
      margin-right: 50px;
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
