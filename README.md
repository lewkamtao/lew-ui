# Lew UI

A Component Library for Vue3. Doc address: https://lew.kamtao.com

## Install

```bash
npm install lew-ui
```

## How to use

```js
// main.ts
import 'lew-ui/style'
```

```vue
<script setup lang="ts">
// page.vue
import { LewButton } from 'lew-ui'
</script>

<template>
  <LewButton text="Submit" />
</template>
```

## Open Source Libraries

Lew UI uses the following open source libraries:

- [Tippy.js](https://atomiks.github.io/tippyjs/): For creating tooltips and popovers
- [Lucide](https://github.com/lucide-icons/lucide): Provides a clean and beautiful icon set
- [VueUse](https://vueuse.org/): Collection of Vue Composition API utilities
- [Day.js](https://day.js.org/): Lightweight library for date manipulation
- [Yup](https://github.com/jquense/yup): Object schema validation library
- [vue-virt-list](https://github.com/kolarorz/vue-virt-list): Virtual list

We are grateful for the support these excellent open source projects provide to Lew UI.

## License

Lew UI is open source software licensed as MIT.
