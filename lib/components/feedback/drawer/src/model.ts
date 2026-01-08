import validators from 'lew-ui/validators'

export const drawerModel = {
  visible: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDrawer',
      propName: 'visible',
    }),
  },
}

export type DrawerModel = typeof drawerModel
