import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./*/index.ts')
const capitalizeRegex = /(?:^|[\s_-]+)\w/g
const routes: RouteRecordRaw[] = []
let tempName = ''

for (const [path, module] of Object.entries(modules)) {
  tempName = path.replace(/^\.\/(.*)\/index.ts$/, '$1')
  tempName = tempName
    .replace(capitalizeRegex, match => match.toUpperCase())
    .replace('-', '')

  routes.push({
    name: `R-Lew${tempName}`,
    path: `/${tempName}`,
    component: module,
  })
}

export default routes
