<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'

const version = ref('2.1.7')

const isDark = useDark({
  selector: 'html',
  valueDark: 'lew-dark',
  valueLight: 'lew-light'
})

const router = useRouter()
const route = useRoute()

const gohome = () => {
  if (route.name === 'R-LewHome') {
    LewMessage.warning('你已经在首页了！')
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="Header">
    <div class="logo" @click="gohome">
      <img src="../assets/images/logo.png" alt="logo" srcset="" width="30" height="30" />
      <span style="margin-left: 10px"> Lew UI</span>
      <lew-tag type="light" size="small" style="margin-left: 10px"> Beta {{ version }} </lew-tag>
    </div>
    <lew-flex gap="15" x="end" class="menu">
      <div class="menu-item" @click="router.push(`/`)">首页</div>
      <div class="menu-item" @click="router.push(`/Install`)">指南</div>
      <div class="menu-item" @click="router.push(`/Avatar`)">组件</div>
      <div class="menu-item menu-item-icon" @click="isDark = !isDark">
        <lew-icon class="icon-mode-sunny" type="sun" size="18" />
        <lew-icon class="icon-mode-moon" type="moon" size="18" />
      </div>
      <div class="menu-item menu-item-icon">
        <a target="_blank" href="https://github.com/lewkamtao/Lew-UI">
          <lew-icon size="18" type="github" />
        </a>
      </div>
    </lew-flex>
  </div>
</template>

<style lang="scss" scoped>
.Header {
  position: relative;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  background: var(--lew-bgcolor-0);
  border-bottom: var(--lew-border-1);
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
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      opacity: 0.8;
      font-size: 14px;
      transition: all 0.25s;
      color: var(--lew-text-color-1);
      cursor: pointer;
      box-sizing: border-box;
      height: 30px;
      border-radius: var(--lew-border-radius-small);

      svg {
        cursor: pointer;
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .menu-item-icon {
      width: 30px;
      padding: 0px;
    }
    .menu-item:nth-child(3) {
      margin-right: 50px;
    }

    a:hover,
    span:hover,
    .menu-item:hover {
      opacity: 1;
      background-color: var(--lew-bgcolor-3);
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
