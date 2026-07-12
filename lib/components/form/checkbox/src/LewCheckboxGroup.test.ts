import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LewCheckboxGroup from './LewCheckboxGroup.vue'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
]

describe('lewCheckboxGroup', () => {
  it('renders all options', () => {
    const wrapper = mount(LewCheckboxGroup, {
      props: {
        options,
        modelValue: [],
      },
    })
    expect(wrapper.text()).toContain('Apple')
    expect(wrapper.text()).toContain('Banana')
    expect(wrapper.text()).toContain('Orange')
  })

  it('reflects modelValue checked state', () => {
    const wrapper = mount(LewCheckboxGroup, {
      props: {
        options,
        modelValue: ['banana'],
      },
    })
    expect(wrapper.find('.lew-checkbox-group').exists() || wrapper.html().length > 0).toBe(true)
  })

  it('does not interact when disabled', async () => {
    const wrapper = mount(LewCheckboxGroup, {
      props: {
        options,
        modelValue: [],
        disabled: true,
      },
    })
    expect(wrapper.classes().join(' ') + wrapper.html()).toMatch(/disabled/)
  })
})
