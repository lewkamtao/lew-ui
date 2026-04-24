import type { LewDialogPopokFooterButtonItem, LewDialogType } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validDialogTypeList } from 'lew-ui/validators'

export const dialogProps = {
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
  hideIcon: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewDialog',
      propName: 'hideIcon',
    }),
  },
  footerButtons: {
    type: Array as PropType<LewDialogPopokFooterButtonItem[]>,
    description:
      '自定义底部按钮列表；每项 `props` 透传 LewButton，`request` 处理异步（返回 `false` 不关闭），`emitOk` 控制该按钮成功关闭时是否触发 `ok`。不传则默认单个「确认」按钮。',
    validator: validators.array({
      componentName: 'LewDialog',
      propName: 'footerButtons',
      minLength: 0,
      itemValidator: item =>
        item != null && typeof item === 'object' && !Array.isArray(item),
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
