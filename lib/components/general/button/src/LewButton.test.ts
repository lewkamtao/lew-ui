import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import LewButton from './LewButton.vue'

describe('lewButton', () => {
  it('renders button text', () => {
    const wrapper = mount(LewButton, {
      props: { text: 'Submit' },
    })
    expect(wrapper.text()).toContain('Submit')
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(LewButton, {
      props: { text: 'Submit', disabled: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('emits click when enabled', async () => {
    const wrapper = mount(LewButton, {
      props: { text: 'Submit' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('shows loading state from prop', () => {
    const wrapper = mount(LewButton, {
      props: { text: 'Save', loading: true },
    })
    expect(wrapper.find('.lew-button-loading-icon').exists()).toBe(true)
  })

  it('runs request handler on click', async () => {
    const request = vi.fn().mockResolvedValue(undefined)
    const wrapper = mount(LewButton, {
      props: { text: 'Async', request },
    })
    await wrapper.trigger('click')
    expect(request).toHaveBeenCalledOnce()
  })
})
