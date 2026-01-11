import type { Property } from 'csstype'
import type { LewButtonProps } from 'lew-ui'
import type { LewDrawerPosition } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validDrawerPositionList } from 'lew-ui/validators'

export const drawerProps = {
  title: {
    type: String,
    validator: validators.string({
      componentName: 'LewDrawer',
      propName: 'title',
    }),
  },
  position: {
    type: String as PropType<LewDrawerPosition>,
    default: 'right',
    typeValues: validDrawerPositionList,
    validator: validators.enum({
      componentName: 'LewDrawer',
      propName: 'position',
      values: validDrawerPositionList,
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '500px',
    validator: validators.widthHeight({
      componentName: 'LewDrawer',
      propName: 'width',
    }),
  },
  height: {
    type: String as PropType<Property.Height>,
    default: '500px',
    validator: validators.widthHeight({
      componentName: 'LewDrawer',
      propName: 'height',
    }),
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'closeOnClickOverlay',
    }),
  },
  closeByEsc: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'closeByEsc',
    }),
  },
  hideFooter: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'hideFooter',
    }),
  },
  okButtonProps: {
    type: Object as PropType<LewButtonProps>,
    validator: validators.object({
      componentName: 'LewDrawer',
      propName: 'okButtonProps',
    }),
  },
  closeButtonProps: {
    type: Object as PropType<LewButtonProps>,
    validator: validators.object({
      componentName: 'LewDrawer',
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
      componentName: 'LewDrawer',
      propName: 'zIndex',
    }),
  },
}

export type LewDrawerProps = ExtractPublicPropTypes<typeof drawerProps>
