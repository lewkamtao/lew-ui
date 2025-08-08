import type { LewDialogType } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validDialogTypeList } from 'lew-ui/validators'

export const dialogProps = {
  type: {
    type: String as PropType<LewDialogType>,
    default: 'normal',
    typeValues: validDialogTypeList,
    validator: validators.enum({
      componentName: 'LewDialog',
      propName: 'type',
      values: validDialogTypeList,
    }),
  },
  okText: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewDialog',
      propName: 'okText',
    }),
  },
  cancelText: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewDialog',
      propName: 'cancelText',
    }),
  },
  ok: {
    type: Function as PropType<() => Promise<boolean>>,
    default: () => Promise.resolve(true),
    validator: validators.function({
      componentName: 'LewDialog',
      propName: 'ok',
    }),
  },
  cancel: {
    type: Function as PropType<() => Promise<boolean>>,
    default: () => Promise.resolve(true),
    validator: validators.function({
      componentName: 'LewDialog',
      propName: 'cancel',
    }),
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDialog',
      propName: 'closeOnClickOverlay',
    }),
  },
  closeByEsc: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDialog',
      propName: 'closeByEsc',
    }),
  },
  transformOrigin: {
    type: String,
    default: '0 0',
    hidden: true,
    validator: validators.string({
      componentName: 'LewDialog',
      propName: 'transformOrigin',
    }),
  },
}

export type LewDialogProps = ExtractPublicPropTypes<typeof dialogProps>
