import { describe, expect, it } from 'vitest'
import { formatFormByMap, getFormItemRequired, object2class } from './index'

describe('object2class', () => {
  it('builds class names from boolean and string props', () => {
    expect(object2class('lew-btn', { size: 'medium', disabled: true })).toBe(
      ' lew-btn-size-medium lew-btn-disabled',
    )
  })
})

describe('formatFormByMap', () => {
  it('nests dotted field keys into object structure', () => {
    expect(formatFormByMap({ 'user.name': 'Alice', 'user.age': 20 })).toEqual({
      user: { name: 'Alice', age: 20 },
    })
  })
})

describe('getFormItemRequired', () => {
  it('returns true when yup rule is required', () => {
    expect(
      getFormItemRequired({
        field: 'email',
        rule: 'Yup.string().required()',
      }),
    ).toBe(true)
  })

  it('returns false when rule is optional', () => {
    expect(
      getFormItemRequired({
        field: 'note',
        rule: 'Yup.string().optional()',
      }),
    ).toBe(false)
  })
})
