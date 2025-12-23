import validators from 'lew-ui/validators'

export const modalModel = {
  visible: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewModal',
      propName: 'visible',
    }),
  },
}

export type ModalModel = typeof modalModel

