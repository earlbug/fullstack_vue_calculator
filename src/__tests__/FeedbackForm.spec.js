import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FeedbackForm from '../views/FeedbackForm.vue'

describe('FeedbackForm', () => {
  it('renders form and submit button', () => {
    const wrapper = mount(FeedbackForm, {
      global: {
        stubs: ['BaseInput', 'BaseTextField']
      }
    })

    const form = wrapper.find('form')
    const submit = wrapper.find('button[type="submit"]')

    expect(form.exists()).toBe(true)
    expect(submit.exists()).toBe(true)
  })
})


