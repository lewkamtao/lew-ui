import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LewForm from './LewForm.vue'

describe('lewForm', () => {
  it('renders form fields from options', () => {
    const wrapper = mount(LewForm, {
      props: {
        options: [
          { label: 'Name', field: 'name', as: 'input' },
          { label: 'Age', field: 'age', as: 'input-number' },
        ],
      },
    })
    expect(wrapper.find('.lew-form').exists()).toBe(true)
    expect(wrapper.findAll('.lew-form-item').length).toBeGreaterThanOrEqual(2)
  })

  it('exposes getForm to read nested form data', async () => {
    const wrapper = mount(LewForm, {
      props: {
        options: [{ label: 'Email', field: 'email', as: 'input' }],
      },
    })
    const exposed = wrapper.vm as unknown as { getForm: () => Record<string, unknown> }
    await wrapper.setProps({})
    expect(typeof exposed.getForm).toBe('function')
  })

  it('passes required prop to form item from yup rule', () => {
    const wrapper = mount(LewForm, {
      props: {
        options: [
          {
            label: 'Email',
            field: 'email',
            as: 'input',
            rule: 'Yup.string().email().required()',
          },
        ],
      },
    })
    const formItem = wrapper.findComponent({ name: 'LewFormItem' })
    expect(formItem.props('required')).toBe(true)
  })
})
