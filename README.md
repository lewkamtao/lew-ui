# Lew UI

A Component Library for Vue3. Doc address: https://lew.kamtao.com

## Install

```bash
npm install lew-ui
# or
pnpm add lew-ui
```

## How to use

### 按需引入（推荐）

```ts
// main.ts — 全局主题样式（必引）
import 'lew-ui/style'
```

```vue
<script setup lang="ts">
import { LewButton, LewMessage } from 'lew-ui'
</script>

<template>
  <LewButton text="Submit" @click="LewMessage.success('ok')" />
</template>
```

### 全量注册

```ts
import { createApp } from 'vue'
import LewUI from 'lew-ui'
import 'lew-ui/style'
import App from './App.vue'

createApp(App).use(LewUI).mount('#app')
```

全量注册后可在模板中直接使用组件；`LewMessage` / `LewDialog` / `LewNotification` 会挂到 `app.config.globalProperties`（并兼容挂到 `window`）。更推荐始终通过 `import` 使用命令式 API。

### 国际化

```ts
import { setLocale } from 'lew-ui'

setLocale('en')
```

## Open Source Libraries

Lew UI uses the following open source libraries:

- [Tippy.js](https://atomiks.github.io/tippyjs/): For creating tooltips and popovers
- [Lucide](https://github.com/lucide-icons/lucide): Provides a clean and beautiful icon set
- [VueUse](https://vueuse.org/): Collection of Vue Composition API utilities
- [Day.js](https://day.js.org/): Lightweight library for date manipulation
- [Yup](https://jquense/yup): Object schema validation library

We are grateful for the support these excellent open source projects provide to Lew UI.

## License

Lew UI is open source software licensed as MIT.
