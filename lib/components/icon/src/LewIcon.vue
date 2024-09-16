<script lang="ts">
import { defineComponent, h } from 'vue'
import * as mingcute from './mingcute'
import { any2px } from 'lew-ui/utils'

export default defineComponent({
  name: 'LewIcon',

  props: {
    animation: {
      type: String,
      default: undefined
    },

    animationSpeed: {
      type: String,
      default: undefined
    },
	strokeWidth：{
		      type: Number,
      default:1
	},
    size: {
      type: [Number, String],
      default: 24
    }, 

    tag: {
      type: String,
      default: 'i'
    },

    type: {
      type: String,
      default: 'mingcute'
    }
  },

  computed: {
    isRemSize(): boolean {
      return typeof this.size === 'string' && this.size.endsWith('rem')
    }
  },

  render() {
    const { animation, animationSpeed, size, type } = this

    const icon = mingcute.default[`../engine/icons/${type}.ts`]?.default
    const _size = any2px(size)
    return h(
      this.tag as string,

      {
        ...this.$attrs,
        'data-name': type,
        'data-type': type,

        class: {
          'vue-mingcute': true,
          [`vue-mingcute--${type}`]: type,
          [`vue-mingcute--${animation}`]: animation,
          [`vue-mingcute--${animationSpeed}`]: animationSpeed
        },

        style: {
          fontSize: _size
        }
      },
      [
        h('svg', {
          height: '1em',
          width: '1em',
		  'stroke-width': this.strokeWidth,
		  xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          innerHTML: icon?.content
        })
      ]
    )
  }
})
</script>

<style lang="scss">
@keyframes vue-mingcute--spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.vue-mingcute {
  display: inline-block;
  overflow: hidden;

  &--spin {
    animation: vue-mingcute--spin 2s linear infinite;
  }

  &--pulse {
    animation: vue-mingcute--spin 2s infinite steps(8);
  }

  &--slow {
    animation-duration: 3s;
  }

  &--fast {
    animation-duration: 1s;
  }

  &__content {
    display: block;
    height: inherit;
    width: inherit;
  }
}
</style>
