import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Calculator from '../views/Calculator.vue'

describe('Calculator', () => {
	function clickByText(wrapper, text) {
		const btn = wrapper.findAll('button').find(w => w.text() === text)
		if (!btn) throw new Error(`button with text ${text} not found`)
		return btn.trigger('click')
	}

	it('renders display and buttons', () => {
		const wrapper = mount(Calculator)

		const display = wrapper.find('#display')
		const buttons = wrapper.findAll('.calcBtn')

		expect(display.exists()).toBe(true)
		expect(buttons.length).toBeGreaterThan(0)
	})

	it('updates the display when number buttons are clicked', async () => {
		const wrapper = mount(Calculator)

		await clickByText(wrapper, '7')

		const display = wrapper.find('#display')
		expect(display.element.value).toBe('7')
	})

	it('performs addition and appends to history', async () => {
		const wrapper = mount(Calculator)

		await clickByText(wrapper, '1')
		await clickByText(wrapper, '+')
		await clickByText(wrapper, '2')
		await clickByText(wrapper, '=')

		// DOM updated after clicks
		await wrapper.vm.$nextTick()

		const display = wrapper.find('#display')
		expect(display.element.value).toBe('3')

		const histItems = wrapper.findAll('#hist')
		const last = histItems[histItems.length - 1]
		expect(last).toBeTruthy()
		expect(last.text()).toBe('1+2 = 3')
	})

	it('shows Error on division by zero', async () => {
		const wrapper = mount(Calculator)

		await clickByText(wrapper, '1')
		await clickByText(wrapper, '/')
		await clickByText(wrapper, '0')
		await clickByText(wrapper, '=')

		await wrapper.vm.$nextTick()

		const display = wrapper.find('#display')
		expect(display.element.value).toBe('Error')
	})
})

