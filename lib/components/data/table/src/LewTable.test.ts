import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LewTable from './LewTable.vue'

describe('lewTable', () => {
  it('renders table wrapper with columns', () => {
    const wrapper = mount(LewTable, {
      props: {
        columns: [
          { title: 'Name', field: 'name', width: 120 },
          { title: 'Age', field: 'age', width: 80 },
        ],
        dataSource: [
          { name: 'Alice', age: 20 },
          { name: 'Bob', age: 22 },
        ],
      },
    })
    expect(wrapper.find('.lew-table-wrapper').exists()).toBe(true)
    expect(wrapper.find('.lew-table').exists()).toBe(true)
  })

  it('shows empty state when dataSource is empty', () => {
    const wrapper = mount(LewTable, {
      props: {
        columns: [{ title: 'Name', field: 'name', width: 120 }],
        dataSource: [],
      },
    })
    expect(wrapper.find('.lew-table-empty').exists()).toBe(true)
  })

  it('accepts checkable prop for selection mode', () => {
    const wrapper = mount(LewTable, {
      props: {
        'columns': [{ title: 'Name', field: 'name', width: 120 }],
        'dataSource': [{ name: 'Alice' }],
        'checkable': true,
        'selectedKeys': [],
        'onUpdate:selectedKeys': () => {},
      },
    })
    expect(wrapper.props('checkable')).toBe(true)
  })
})
