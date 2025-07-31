import type { ExtractPropTypes } from 'vue'

export const backTopProps = {
  // Layout props
  right: {
    type: Number,
    default: 40,
    validator(value: number): boolean {
      if (value < 0) {
        console.warn(`[LewBackTop] Invalid right: "${value}". Expected: non-negative number.`)
        return false
      }
      return true
    },
  },
  bottom: {
    type: Number,
    default: 40,
    validator(value: number): boolean {
      if (value < 0) {
        console.warn(`[LewBackTop] Invalid bottom: "${value}". Expected: non-negative number.`)
        return false
      }
      return true
    },
  },

  // Behavior props
  valveHeight: {
    type: Number,
    default: 50,
    validator(value: number): boolean {
      if (value < 0) {
        console.warn(`[LewBackTop] Invalid valveHeight: "${value}". Expected: non-negative number.`)
        return false
      }
      return true
    },
  },
  target: {
    type: String,
    validator(value: string): boolean {
      // Skip validation in SSR environment
      if (typeof document === 'undefined')
        return true

      if (value && !document.querySelector(value)) {
        console.warn(
          `[LewBackTop] Invalid target: "${value}". Expected: valid CSS selector or empty string.`,
        )
        return false
      }
      return true
    },
  },
}

export type BackTopProps = ExtractPropTypes<typeof backTopProps>
