import type { Property } from 'csstype'
import type { LewModalFooterButtonItem } from 'lew-ui'
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
  footerButtons: {
    type: Array as PropType<LewModalFooterButtonItem[]>,
    description:
      '自定义底部按钮列表；每项 `props` 透传 LewButton（`request` 处理异步），`emitOk` 控制该按钮成功关闭时是否触发 `ok`。不传则默认单个「确认」并关闭，受 hideFooter 控制。',
    validator: validators.array({
      componentName: 'LewDrawer',
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
      componentName: 'LewDrawer',
      propName: 'zIndex',
    }),
  },
}

export type LewDrawerProps = ExtractPublicPropTypes<typeof drawerProps>
