import type { Property } from 'csstype'
import type { LewDialogPopokFooterButtonItem, LewPlacement, LewPopokType, LewTrigger } from 'lew-ui/types'
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
  footerButtons: {
    type: Array as PropType<LewDialogPopokFooterButtonItem[]>,
    description:
      '自定义底部按钮列表；每项 `props` 透传 LewButton，`request` 处理异步（返回 `false` 不关闭），`emitOk` 控制该按钮成功关闭时是否触发 `ok`。不传则默认单个「确认」按钮。',
    validator: validators.array({
      componentName: 'LewPopok',
      propName: 'footerButtons',
      minLength: 0,
      itemValidator: item =>
        item != null && typeof item === 'object' && !Array.isArray(item),
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: '350px',
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
