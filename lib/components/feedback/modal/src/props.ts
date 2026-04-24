import type { Property } from 'csstype'
import type { LewModalFooterButtonItem } from 'lew-ui'
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
  footerButtons: {
    type: Array as PropType<LewModalFooterButtonItem[]>,
    description:
      '自定义底部按钮列表，顺序即展示顺序；每项 `props` 透传 LewButton（`request` 处理异步），`emitOk` 控制该按钮成功关闭时是否触发 `ok`。不传则默认单个「确认」并关闭，受 hideFooter 控制。',
    validator: validators.array({
      componentName: 'LewModal',
      propName: 'footerButtons',
      minLength: 0,
      itemValidator: item =>
        item != null && typeof item === 'object' && !Array.isArray(item),
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
