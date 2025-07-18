import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./*.vue')
const routes: RouteRecordRaw[] = []
let tempName = ''

for (const [path, module] of Object.entries(modules)) {
  tempName = path.replace('./', '').replace('.vue', '')
  routes.push({
    name: `R-Lew${tempName}`,
    path: `/${tempName}`,
    component: module,
  })
}

export default routes
