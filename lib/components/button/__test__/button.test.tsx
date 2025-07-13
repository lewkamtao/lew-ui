import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LewButton from '../src/LewButton.vue'

describe('Button', () => {
  it('default', () => {
    const text = '添加'
    const buttonComponent = shallowMount(LewButton, {
      slots: {
        default: text,
      },
    })
    expect(buttonComponent.find('.lew-button').text()).toBe(text)
  })

  it('default-props', () => {
    const buttonComponent = shallowMount(LewButton)
    // 默认type为primary
    expect(buttonComponent.find('.lew-button').classes()).toContain(
      'lew-button-primary',
    )
    // 默认size为medium
    expect(buttonComponent.find('.lew-button').classes()).toContain(
      'lew-button-medium',
    )
  })

  it('set-props', () => {
    const buttonComponent = shallowMount(LewButton, {
      props: {
        type: 'fill',
        size: 'small',
      },
    })
    expect(buttonComponent.find('.lew-button').classes()).toContain(
      'lew-button-success',
    )
    expect(buttonComponent.find('.lew-button').classes()).toContain(
      'lew-button-small',
    )
  })

  it('click', () => {
    const buttonComponent = shallowMount(LewButton)
    buttonComponent.trigger('click')
    expect(buttonComponent.emitted().click).toBeTruthy()
  })

  it('disabled-click', () => {
    const buttonComponent = shallowMount(LewButton, {
      props: {
        disabled: true,
      },
    })
    buttonComponent.trigger('click')
    // button 设置 disabled 属性后，点击事件不会触发
    expect(buttonComponent.emitted().click).toBeFalsy()
  })
})
