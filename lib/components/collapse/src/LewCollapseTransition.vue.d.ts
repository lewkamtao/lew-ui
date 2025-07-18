import type { DefineComponent } from 'vue'

declare const LewCollapseTransition: DefineComponent<
  {
    name?: string
    dimension?: 'height' | 'width'
    duration?: number
  },
  {},
  any
>

export default LewCollapseTransition
