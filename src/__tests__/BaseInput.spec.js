import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseInput from '../components/BaseInput.vue'

describe('BaseInput', () => {
  it('renders label, placeholder and value from props', () => {
    const wrapper = mount(BaseInput, {
      props: { label: 'Name', modelValue: 'John' }
    })

    const label = wrapper.find('label')
    const input = wrapper.find('input')

    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Name')
    expect(input.attributes('placeholder')).toBe('Name')
    expect(input.element.value).toBe('John')
  })

  it('renders error message when `error` prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: { label: 'Email', modelValue: '', error: 'Required' }
    })

    const err = wrapper.find('p')
    expect(err.exists()).toBe(true)
    expect(err.text()).toBe('Required')
  })

  it('emits `update:modelValue` when input value changes', async () => {
    const wrapper = mount(BaseInput, {
      props: { label: 'Age', modelValue: '' }
    })

    const input = wrapper.find('input')
    await input.setValue('25')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['25'])
  })

  it('does not render a label when `label` prop is empty', () => {
    const wrapper = mount(BaseInput, {
      props: { label: '', modelValue: '' }
    })

    expect(wrapper.find('label').exists()).toBe(false)
  })
})



