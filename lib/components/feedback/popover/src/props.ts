import type { Property } from 'csstype'
import type { LewOffset, LewPlacement, LewTrigger } from 'lew-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validPlacementList, validTriggerList } from 'lew-ui/validators'

export const popoverProps = {
  trigger: {
    type: String as PropType<LewTrigger>,
    default: 'click',
    typeValues: validTriggerList,
    validator: validators.enum({
      componentName: 'LewPopover',
      propName: 'trigger',
      values: validTriggerList,
    }),
  },
  triggerWidth: {
    type: String as PropType<Property.Width>,
    default: '',
    validator: validators.string({
      componentName: 'LewPopover',
      propName: 'triggerWidth',
    }),
  },
  placement: {
    type: String as PropType<LewPlacement>,
    default: 'top',
    typeValues: validPlacementList,
    validator: validators.enum({
      componentName: 'LewPopover',
      propName: 'placement',
      values: validPlacementList,
    }),
  },
  disabled: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewPopover',
      propName: 'disabled',
    }),
  },
  loading: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewPopover',
      propName: 'loading',
    }),
  },
  hideOnClick: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewPopover',
      propName: 'hideOnClick',
    }),
  },
  clickOutsideToHide: {
    type: Boolean,
    default: true,
    validator: validators.boolean({
      componentName: 'LewPopover',
      propName: 'clickOutsideToHide',
    }),
  },
  offset: {
    type: Array as unknown as PropType<LewOffset>,
    default: [0, 8],
    validator: validators.array({
      componentName: 'LewPopover',
      propName: 'offset',
    }),
  },
  delay: {
    type: Array as unknown as PropType<[number, number]>,
    default: [120, 120],
    validator: validators.array({
      componentName: 'LewPopover',
      propName: 'delay',
    }),
  },
  popoverBodyClassName: {
    type: String,
    default: 'lew-popover-body',
    validator: validators.string({
      componentName: 'LewPopover',
      propName: 'popoverBodyClassName',
    }),
  },
  triggerTarget: {
    type: Object as PropType<Element>,
    default: null,
    validator: validators.object({
      componentName: 'LewPopover',
      propName: 'triggerTarget',
    }),
  },
}

export type PopoverProps = ExtractPublicPropTypes<typeof popoverProps>
