import type { Property } from 'csstype'
import type { LewButtonProps } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

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
  /**
   * z-index 层级
   * 默认值 2001 表示使用全局弹出层管理器自动分配层级（从 2001 开始递增）
   * 如果手动设置其他值，则使用用户指定的值（不推荐，可能导致层级冲突）
   */
  zIndex: {
    type: Number,
    default: 2001,
    validator: validators.nonNegativeInteger({
      componentName: 'LewModal',
      propName: 'zIndex',
    }),
  },
}

// Extract prop types
export type ModalProps = ExtractPublicPropTypes<typeof modalProps>
