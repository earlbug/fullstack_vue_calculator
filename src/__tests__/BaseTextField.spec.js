import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTextField from '../components/BaseTextField.vue'

describe('BaseTextField', () => {
  it('renders label and placeholder from props', () => {
    const wrapper = mount(BaseTextField, {
      props: { label: 'Description', modelValue: '' }
    })

    const label = wrapper.find('label')
    const textarea = wrapper.find('textarea')

    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Description')
    expect(textarea.attributes('placeholder')).toBe('Description')
  })

  it('renders error message when `error` prop is provided', () => {
    const wrapper = mount(BaseTextField, {
      props: { label: 'Notes', modelValue: '', error: 'Required' }
    })

    const err = wrapper.find('p')
    expect(err.exists()).toBe(true)
    expect(err.text()).toBe('Required')
  })

  it('emits `update:modelValue` when textarea value changes', async () => {
    const wrapper = mount(BaseTextField, {
      props: { label: 'Bio', modelValue: '' }
    })

    const textarea = wrapper.find('textarea')
    await textarea.setValue('Hello world')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Hello world'])
  })

  it('renders an empty label text when `label` prop is empty', () => {
    const wrapper = mount(BaseTextField, {
      props: { label: '', modelValue: '' }
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('')
  })
})
