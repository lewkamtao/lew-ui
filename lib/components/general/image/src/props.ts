import type { ExtractPropTypes } from 'vue'
import validators from 'lew-ui/validators'

const objectFitValues = ['fill', 'contain', 'cover', 'none', 'scale-down']
const objectPositionValues = ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right']

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
    type: String,
    default: 200,
    validator: validators.widthHeight({
      componentName: 'LewImage',
      propName: 'width',
    }),
  },
  height: {
    type: String,
    default: 200,
    validator: validators.widthHeight({
      componentName: 'LewImage',
      propName: 'height',
    }),
  },
  objectFit: {
    type: String,
    default: 'cover',
    typeValues: objectFitValues,
    validator: validators.enum({
      componentName: 'LewImage',
      propName: 'objectFit',
      values: objectFitValues,
    }),
  },
  objectPosition: {
    type: String,
    default: 'center',
    typeValues: objectPositionValues,
    validator: validators.enum({
      componentName: 'LewImage',
      propName: 'objectPosition',
      values: objectPositionValues,
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

export type ImageProps = ExtractPropTypes<typeof imageProps>
