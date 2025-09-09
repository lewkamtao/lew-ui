export const collapseTransitionEmits = {
  beforeAppear: (el: Element) => el,
  appear: (el: Element) => el,
  afterAppear: (el: Element) => el,
  appearCancelled: (el: Element) => el,
  beforeEnter: (el: Element) => el,
  enter: (el: Element, done: () => void) => [el, done],
  afterEnter: (el: Element) => el,
  enterCancelled: (el: Element) => el,
  beforeLeave: (el: Element) => el,
  leave: (el: Element, done: () => void) => [el, done],
  afterLeave: (el: Element) => el,
  leaveCancelled: (el: Element) => el,
} as const

export type LewCollapseTransitionEmits = typeof collapseTransitionEmits
