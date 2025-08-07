import type { Property } from 'csstype'
import type { LewButtonProps } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'

// Model definitions
export const modalModel = {
  visible: {
    type: Boolean,
    default: false,
  },
}

// Props definitions
export const modalProps = {
  title: {
    type: String,
    validator(value: string): boolean {
      if (value && value.length > 100) {
        console.warn(`[LewModal] Invalid title: "${value}". Expected: string with length <= 100 characters.`)
        return false
      }
      return true
    },
  },
  width: {
    type: String as PropType<Property.Width>,
    default: 'auto',
    validator(value: Property.Width | number): boolean {
      if (typeof value === 'number') {
        if (value <= 0) {
          console.warn(`[LewModal] Invalid width: "${value}". Expected: positive number.`)
          return false
        }
        return true
      }

      if (typeof value === 'string') {
        const autoRegex = /^auto$/i
        const calcRegex = /^calc\((.+)\)$/
        const percentRegex = /^-?\d+(\.\d+)?%$/
        const pixelRegex = /^-?\d+(\.\d+)?(px|rem|em|vw|vh)?$/

        if (
          autoRegex.test(value)
          || calcRegex.test(value)
          || percentRegex.test(value)
          || pixelRegex.test(value)
        ) {
          return true
        }

        console.warn(`[LewModal] Invalid width: "${value}". Expected: valid CSS width value (e.g., "500px", "50%", "auto", "calc(100% - 20px)").`)
        return false
      }

      console.warn(`[LewModal] Invalid width: "${value}". Expected: number or string.`)
      return false
    },
  },
  maxHeight: {
    type: [String, Number] as PropType<Property.MaxHeight | number>,
    default: 'auto',
    validator(value: Property.MaxHeight | number): boolean {
      if (typeof value === 'number') {
        if (value <= 0) {
          console.warn(`[LewModal] Invalid maxHeight: "${value}". Expected: positive number.`)
          return false
        }
        return true
      }

      if (typeof value === 'string') {
        const autoRegex = /^auto$/i
        const calcRegex = /^calc\((.+)\)$/
        const percentRegex = /^-?\d+(\.\d+)?%$/
        const pixelRegex = /^-?\d+(\.\d+)?(px|rem|em|vh|vw)?$/
        const noneRegex = /^none$/i

        if (
          autoRegex.test(value)
          || calcRegex.test(value)
          || percentRegex.test(value)
          || pixelRegex.test(value)
          || noneRegex.test(value)
        ) {
          return true
        }

        console.warn(`[LewModal] Invalid maxHeight: "${value}". Expected: valid CSS max-height value (e.g., "500px", "50%", "auto", "none", "calc(100vh - 240px)").`)
        return false
      }

      console.warn(`[LewModal] Invalid maxHeight: "${value}". Expected: number or string.`)
      return false
    },
  },
  top: {
    type: [String, Number] as PropType<Property.Top | number>,
    default: 120,
    validator(value: Property.Top | number): boolean {
      if (typeof value === 'number') {
        if (value < 0) {
          console.warn(`[LewModal] Invalid top: "${value}". Expected: non-negative number.`)
          return false
        }
        return true
      }

      if (typeof value === 'string') {
        const autoRegex = /^auto$/i
        const calcRegex = /^calc\((.+)\)$/
        const percentRegex = /^-?\d+(\.\d+)?%$/
        const pixelRegex = /^-?\d+(\.\d+)?(px|rem|em|vh|vw)?$/

        if (
          autoRegex.test(value)
          || calcRegex.test(value)
          || percentRegex.test(value)
          || pixelRegex.test(value)
        ) {
          return true
        }

        console.warn(`[LewModal] Invalid top: "${value}". Expected: valid CSS top value (e.g., "120px", "50%", "auto", "calc(50vh - 200px)").`)
        return false
      }

      console.warn(`[LewModal] Invalid top: "${value}". Expected: number or string.`)
      return false
    },
  },
  hideFooter: {
    type: Boolean,
    default: false,
  },
  closeByEsc: {
    type: Boolean,
    default: false,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  okButtonProps: {
    type: Object as PropType<LewButtonProps>,
  },
  closeButtonProps: {
    type: Object as PropType<LewButtonProps>,
  },
  zIndex: {
    type: Number,
    default: 1001,
    validator(value: number): boolean {
      if (!Number.isInteger(value) || value < 0) {
        console.warn(`[LewModal] Invalid zIndex: "${value}". Expected: non-negative integer.`)
        return false
      }
      return true
    },
  },
}

// Extract prop types
export type ModalProps = ExtractPropTypes<typeof modalProps>
