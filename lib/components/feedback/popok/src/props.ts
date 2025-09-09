import type { Property } from 'csstype'
import type { LewPlacement, LewPopokType, LewTrigger } from 'lew-ui/types'
import type { PropType } from 'vue'
import validators, { validPlacementList, validPopokTypeList, validTriggerList } from 'lew-ui/validators'

export const popokButtonProps = {
  icon: {
    type: null,
    typePopKeys: ['LewComponentSource'],
  },
  title: {
    type: null,
    typePopKeys: ['LewComponentSource'],
  },
  content: {
    type: null,
    typePopKeys: ['LewComponentSource'],
  },
  hideIcon: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewPopok',
      propName: 'hideIcon',
    }),
  },
  type: {
    type: String as PropType<LewPopokType>,
    typeValues: validPopokTypeList,
    default: 'error',
    validator: validators.enum({
      componentName: 'LewPopok',
      propName: 'type',
      values: validPopokTypeList,
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
    type: String as PropType<Property.Width>,
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
