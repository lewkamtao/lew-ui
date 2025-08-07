import type { Property } from 'csstype'
import type { LewButtonProps } from 'lew-ui'
import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'

export const drawerModel = {
  visible: {
    type: Boolean,
    default: false,
  },
}

export const drawerProps = {
  title: {
    type: String,
    validator: validators.string({
      componentName: 'LewDrawer',
      propName: 'title',
    }),
  },
  position: {
    type: String as PropType<DrawerPosition>,
    default: 'right',
    validator: validators.enum({
      componentName: 'LewDrawer',
      propName: 'position',
      values: ['left', 'right', 'top', 'bottom'],
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
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'closeOnClickOverlay',
    }),
  },
  closeByEsc: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'closeByEsc',
    }),
  },
  hideFooter: {
    type: Boolean,
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
  zIndex: {
    type: Number,
    default: 1001,
    validator: validators.number({
      componentName: 'LewDrawer',
      propName: 'zIndex',
    }),
  },
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
