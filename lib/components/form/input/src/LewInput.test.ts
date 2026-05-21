import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LewInput from './LewInput.vue'

describe('lewInput', () => {
  it('renders input with model value', () => {
    const wrapper = mount(LewInput, {
      props: {
        'modelValue': 'hello',
        'onUpdate:modelValue': () => {},
      },
    })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('hello')
  })

  it('emits update:modelValue on input', async () => {
    let value = ''
    const wrapper = mount(LewInput, {
      props: {
        'modelValue': value,
        'onUpdate:modelValue': (v?: string) => {
          value = v ?? ''
          wrapper.setProps({ modelValue: value })
        },
      },
    })
    const input = wrapper.find('input')
    await input.setValue('world')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['world'])
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(LewInput, {
      props: {
        'modelValue': '',
        'disabled': true,
        'onUpdate:modelValue': () => {},
      },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('shows clear icon when clearable and has value', () => {
    const wrapper = mount(LewInput, {
      props: {
        'modelValue': 'text',
        'clearable': true,
        'onUpdate:modelValue': () => {},
      },
    })
    expect(wrapper.find('.lew-form-icon-close').exists()).toBe(true)
  })
})
