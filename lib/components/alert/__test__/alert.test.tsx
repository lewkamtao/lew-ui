import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LewAlert from '../src/LewAlert.vue'
import { reactive } from 'vue'
import type { AlertItem } from '../src/props'

describe('LewAlert', () => {
  it('props', () => {
    const wrapper = shallowMount(LewAlert, {
      props: {
        options: [
          {
            type: 'info',
            title: '成功发送一条消息',
            content: ''
          }
        ] as AlertItem[]
      }
    })
    const groupWrapper = wrapper.find<HTMLDivElement>('.lew-alert-group')
    expect(groupWrapper.find('.lew-alert.lew-alert-info')).toBeTruthy()
    expect(groupWrapper.html()).toContain('成功发送一条消息')
  })

  it('click-close', async () => {
    const options = reactive<AlertItem[]>([
      {
        type: 'success',
        title: 'hi success title',
        content: 'hi success content'
      },
      {
        type: 'error',
        title: 'oh error title',
        content: 'hoh error content'
      }
    ])
    const wrapper = shallowMount(LewAlert, {
      props: {
        options
      }
    })
    const groupWrapper = wrapper.find<HTMLDivElement>('.lew-alert-group')
    const alertsWrapper = groupWrapper.findAll('.lew-alert')
    expect(alertsWrapper.length).toBe(options.length)
    expect(alertsWrapper[0].classes()).toContain('lew-alert-success')
    alertsWrapper[0].find('.btn-close').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')?.[0]).toEqual([0])
    options.splice(0, 1)
    await wrapper.setProps({ options })
    expect(groupWrapper.findAll('.lew-alert').length).toBe(options.length)
    expect(alertsWrapper[0].classes()).toContain('lew-alert-error')
  })
})
