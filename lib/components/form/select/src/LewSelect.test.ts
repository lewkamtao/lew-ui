import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LewSelect from './LewSelect.vue'

const options = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
]

describe('lewSelect', () => {
  it('renders select root element', () => {
    const wrapper = mount(LewSelect, {
      props: {
        'modelValue': '',
        options,
        'onUpdate:modelValue': () => {},
      },
    })
    expect(wrapper.find('.lew-select').exists()).toBe(true)
  })

  it('reflects selected value in single mode', async () => {
    const wrapper = mount(LewSelect, {
      props: {
        'modelValue': 'a',
        options,
        'onUpdate:modelValue': (v: string) => wrapper.setProps({ modelValue: v }),
      },
    })
    expect(wrapper.props('modelValue')).toBe('a')
  })

  it('is not interactive when disabled', () => {
    const wrapper = mount(LewSelect, {
      props: {
        'modelValue': '',
        options,
        'disabled': true,
        'onUpdate:modelValue': () => {},
      },
    })
    expect(wrapper.find('.lew-select-disabled').exists()).toBe(true)
  })
})
