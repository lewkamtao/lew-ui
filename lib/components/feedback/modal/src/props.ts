import type { Property } from 'csstype'
import type { LewButtonProps } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

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
    validator: validators.stringLength({
      componentName: 'LewModal',
      propName: 'title',
      maxLength: 100,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewModal',
      propName: 'width',
    }),
  },
  maxHeight: {
    type: [String, Number] as PropType<Property.MaxHeight | number>,
    default: 'auto',
    validator: validators.widthHeight({
      componentName: 'LewModal',
      propName: 'maxHeight',
    }),
  },
  top: {
    type: [String, Number] as PropType<Property.Top | number>,
    default: 120,
    validator: validators.widthHeight({
      componentName: 'LewModal',
      propName: 'top',
    }),
  },
  hideFooter: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewModal',
      propName: 'hideFooter',
    }),
  },
  closeByEsc: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewModal',
      propName: 'closeByEsc',
    }),
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewModal',
      propName: 'closeOnClickOverlay',
    }),
  },
  okButtonProps: {
    type: Object as PropType<LewButtonProps>,
    typeComponents: [{ name: 'LewButtonProps', path: '/Button' }],
    validator: validators.object({
      componentName: 'LewModal',
      propName: 'okButtonProps',
    }),
  },
  closeButtonProps: {
    type: Object as PropType<LewButtonProps>,
    typeComponents: [{ name: 'LewButtonProps', path: '/Button' }],
    validator: validators.object({
      componentName: 'LewModal',
      propName: 'closeButtonProps',
    }),
  },
  hideOkButton: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewModal',
      propName: 'hideOkButton',
    }),
  },
  hideCloseButton: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewModal',
      propName: 'hideCloseButton',
    }),
  },
  zIndex: {
    type: Number,
    default: 1001,
    validator: validators.nonNegativeInteger({
      componentName: 'LewModal',
      propName: 'zIndex',
    }),
  },
}

// Extract prop types
export type ModalProps = ExtractPublicPropTypes<typeof modalProps>
