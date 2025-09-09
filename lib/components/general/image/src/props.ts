import type { Property } from 'csstype'
import type { LewImageObjectFit, LewImageObjectPosition } from 'lew-ui/types'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import validators, { validObjectFitList, validObjectPositionList } from 'lew-ui/validators'

export const imageProps = {
  src: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewImage',
      propName: 'src',
    }),
  },
  alt: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewImage',
      propName: 'alt',
    }),
  },
  width: {
    type: String as PropType<Property.Width>,
    default: 200,
    validator: validators.widthHeight({
      componentName: 'LewImage',
      propName: 'width',
    }),
  },
  height: {
    type: String as PropType<Property.Height>,
    default: 200,
    validator: validators.widthHeight({
      componentName: 'LewImage',
      propName: 'height',
    }),
  },
  objectFit: {
    type: String as PropType<LewImageObjectFit>,
    default: 'cover',
    typeValues: validObjectFitList,
    validator: validators.enum({
      componentName: 'LewImage',
      propName: 'objectFit',
      values: validObjectFitList,
    }),
  },
  objectPosition: {
    type: String as PropType<LewImageObjectPosition>,
    default: 'center',
    typeValues: validObjectPositionList,
    validator: validators.enum({
      componentName: 'LewImage',
      propName: 'objectPosition',
      values: validObjectPositionList,
    }),
  },
  lazy: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewImage',
      propName: 'lazy',
    }),
  },
  loading: {
    type: Boolean,
    default: false,
    validator: validators.boolean({
      componentName: 'LewImage',
      propName: 'loading',
    }),
  },
  title: {
    type: String,
    default: '',
    validator: validators.string({
      componentName: 'LewImage',
      propName: 'title',
    }),
  },
}

export type LewImageProps = ExtractPublicPropTypes<typeof imageProps>
