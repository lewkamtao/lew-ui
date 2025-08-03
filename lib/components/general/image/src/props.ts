import type { ExtractPropTypes, PropType } from 'vue'
import validators from 'lew-ui/validators'

export type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export const imageProps = {
  src: {
    type: String,
    validator: validators.string({
      componentName: 'LewImage',
      propName: 'src',
    }),
  },
  alt: {
    type: String,
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
    type: String as PropType<ObjectFit>,
    default: 'cover',
    typeDesc: `fill | contain | cover | none | scale-down`,
    validator: validators.enum({
      componentName: 'LewImage',
      propName: 'objectFit',
      values: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    }),
  },
  objectPosition: {
    type: String,
    default: 'center',
    typeDesc: `center | top | bottom | left | right | top left | top right | bottom left | bottom right`,
    validator: validators.enum({
      componentName: 'LewImage',
      propName: 'objectPosition',
      values: [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top left',
        'top right',
        'bottom left',
        'bottom right',
      ],
    }),
  },
  lazy: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewImage',
      propName: 'lazy',
    }),
  },
  loading: {
    type: Boolean,
    validator: validators.boolean({
      componentName: 'LewImage',
      propName: 'loading',
    }),
  },
  title: {
    type: String,
    validator: validators.string({
      componentName: 'LewImage',
      propName: 'title',
    }),
  },
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
