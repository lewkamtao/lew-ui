import type { ExtractPropTypes, PropType } from 'vue'

export type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export const imageProps = {
    src: {
        type: String,
        validator: (value: string) => {
            if (!value) {
                console.warn('[LewImage] src 不能为空')
                return false
            }
            return true
        },
    },
    alt: {
        type: String,
        validator: (value: string) => {
            if (value.length > 100) {
                console.warn('[LewImage] alt 文本不应超过100个字符')
                return false
            }
            return true
        },
    },
    width: {
        type: [Number, String],
        default: 200,
        validator: (value: number | string) => {
            if (typeof value === 'number' && value <= 0) {
                console.warn('[LewImage] width 必须大于0')
                return false
            }
            return true
        },
    },
    height: {
        type: [Number, String],
        default: 200,
        validator: (value: number | string) => {
            if (typeof value === 'number' && value <= 0) {
                console.warn('[LewImage] height 必须大于0')
                return false
            }
            return true
        },
    },
    objectFit: {
        type: String as PropType<ObjectFit>,
        default: 'cover',
        typeDesc: `fill | contain | cover | none | scale-down`,
        validator: (value: ObjectFit) => {
            const validValues: ObjectFit[] = [
                'fill',
                'contain',
                'cover',
                'none',
                'scale-down',
            ]
            if (!validValues.includes(value)) {
                console.warn(
                    `[LewImage] objectFit 必须是以下值之一: ${validValues.join(', ')}`,
                )
                return false
            }
            return true
        },
    },
    objectPosition: {
        type: String,
        default: 'center',
        typeDesc: `center | top | bottom | left | right | top left | top right | bottom left | bottom right`,
        validator: (value: string) => {
            const validPositions = [
                'center',
                'top',
                'bottom',
                'left',
                'right',
                'top left',
                'top right',
                'bottom left',
                'bottom right',
            ]
            if (
                !validPositions.includes(value) &&
                !/^\d+(%|px|em|rem)(\s+\d+(%|px|em|rem))?$/.test(value)
            ) {
                console.warn('[LewImage] objectPosition 格式不正确')
                return false
            }
            return true
        },
    },
    lazy: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '',
        validator: (value: string) => {
            if (value.length > 50) {
                console.warn('[LewImage] title 不应超过50个字符')
                return false
            }
            return true
        },
    },
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
