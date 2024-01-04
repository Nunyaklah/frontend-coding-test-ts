import { mount } from '@vue/test-utils'
import Shop from '../../views/Shop.vue'
import axios from 'axios'
import ItemCard from '../../components/ItemCard.vue'

jest.mock('axios')

describe('Shop.vue', () => {
  it('fetches data successfully', async () => {
    // Mock Axios response
    const mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      // Add more items as needed
    ]
    axios.get.mockResolvedValue({ data: mockData })

    // Mount the component
    const wrapper = mount(Shop)

    // Wait for the next tick to allow the asynchronous operation to complete
    await wrapper.vm.$nextTick()

    // Assert that the component renders correctly
    expect(wrapper.exists()).toBe(true)

    // Check if the items are rendered correctly
    const itemCards = wrapper.findAllComponents(ItemCard)
    expect(itemCards).toHaveLength(mockData.length)

    // Additional assertions as needed
    // For example, you might want to check if specific data is rendered correctly
    expect(itemCards[0].props('item')).toEqual(mockData[0])
    expect(itemCards[1].props('item')).toEqual(mockData[1])
  })

  it('handles data fetching error', async () => {
    // Mock Axios to simulate an error
    axios.get.mockRejectedValue(new Error('Failed to fetch data'))

    // Mount the component
    const wrapper = mount(Shop)

    // Wait for the next tick to allow the asynchronous operation to complete
    await wrapper.vm.$nextTick()

    // Assert that the component renders correctly
    expect(wrapper.exists()).toBe(true)

    // Check if the error message is displayed
    expect(wrapper.find('.error-message').text()).toContain(
      'Failed to fetch data',
    )
  })
})
