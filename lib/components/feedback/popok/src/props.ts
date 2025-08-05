import type { LewColor, LewPlacement, LewTrigger } from 'lew-ui'
import type { PropType } from 'vue'
import validators, { validColorList, validPlacementList, validTriggerList } from 'lew-ui/validators'

export const popokButtonProps = {
  title: {
    type: null,
  },
  content: {
    type: null,
  },
  type: {
    type: String as PropType<LewColor>,
    typeValues: validColorList,
    default: 'error',
    validator: validators.enum({
      componentName: 'LewPopok',
      propName: 'type',
      values: validColorList,
    }),
  },
  okText: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewPopok',
      propName: 'okText',
    }),
  },
  cancelText: {
    type: String,
    defaultLocale: true,
    validator: validators.string({
      componentName: 'LewPopok',
      propName: 'cancelText',
    }),
  },
  ok: {
    type: Function as PropType<() => Promise<boolean>>,
    default: () => true,
    validator: validators.function({
      componentName: 'LewPopok',
      propName: 'ok',
    }),
  },
  cancel: {
    type: Function as PropType<() => Promise<boolean>>,
    default: () => true,
    validator: validators.function({
      componentName: 'LewPopok',
      propName: 'cancel',
    }),
  },
  width: {
    type: String,
    default: '280px',
    validator: validators.widthHeight({
      componentName: 'LewPopok',
      propName: 'width',
    }),
  },
  trigger: {
    type: String as PropType<LewTrigger>,
    default: 'click',
    typeValues: validTriggerList,
    validator: validators.enum({
      componentName: 'LewPopok',
      propName: 'trigger',
      values: validTriggerList,
    }),
  },

  placement: {
    type: String as PropType<LewPlacement>,
    default: 'top',
    typeValues: validPlacementList,
    validator: validators.enum({
      componentName: 'LewPopok',
      propName: 'placement',
      values: validPlacementList,
    }),
  },
}
