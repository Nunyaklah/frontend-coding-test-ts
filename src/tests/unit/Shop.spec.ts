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


    const wrapper = mount(Shop)

   
    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)

    const itemCards = wrapper.findAllComponents(ItemCard)
    expect(itemCards).toHaveLength(mockData.length)

   
    expect(itemCards[0].props('item')).toEqual(mockData[0])
    expect(itemCards[1].props('item')).toEqual(mockData[1])
  })

  it('handles data fetching error', async () => {
   
    axios.get.mockRejectedValue(new Error('Failed to fetch data'))

    const wrapper = mount(Shop)

    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)
    
    expect(wrapper.find('.error-message').text()).toContain(
      'Failed to fetch data',
    )
  })
})
