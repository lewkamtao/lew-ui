import type { Component, VNode } from 'vue'

export type LewThemeColor
  = | 'black'
    | 'blue'
    | 'brown'
    | 'cyan'
    | 'gray'
    | 'green'
    | 'indigo'
    | 'mint'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow'

export type LewStatusColor
  = | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'normal'
    | 'primary'
    | 'danger'

export type LewColor = LewThemeColor | LewStatusColor

export type LewSize = 'small' | 'medium' | 'large'

export type LewDirection = 'x' | 'y'

export type LewComponentSource
  = | string
    | number
    | boolean
    | VNode
    | Component
    | ((...args: any[]) => any)
    | Promise<Component>
    | Record<string, any>
    | null
    | undefined

export type LewXAlignment = 'start' | 'center' | 'end' | 'left' | 'right'
export type LewYAlignment = 'start' | 'center' | 'end' | 'top' | 'bottom'

export type LewStatus = 'pending' | 'loading' | 'done' | 'error' | 'warning'

export type LewTrigger = 'hover' | 'click' | 'mouseenter' | 'manual'

export type LewMenuTrigger = 'left-click' | 'right-click' | 'hover'

export type LewPlacement
  = | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'

export type LewOffset = [number, number]
