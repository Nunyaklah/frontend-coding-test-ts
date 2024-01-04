<template>
  <div>
    <p class="mt-10 text-4xl font-bold">Take a look at our merch !</p>
    <div class="grid grid-cols-4 gap-5 m-10">
      <div :key="item.id" v-for="item in items">
        <ItemCard :item="item" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ItemCard from '../components/ItemCard.vue'

// Define the type for the items variable
interface Item {
  id: number
  title: string
  description: string
  price: number
  image: string
  // Add other properties as needed based on the API response
}

// Define a reactive variable to store the API response
const items = ref<Item[]>([])

// Function to fetch data from the API
const fetchData = async () => {
  try {
    // Make a GET request to the API
    const response = await axios.get<Item[]>(
      'https://fakestoreapi.com/products',
    )

    // Assign the response data to the 'items' variable
    items.value = response.data

    // Optionally, log the items to the console
    console.log('Items:', items.value)
  } catch (error: any) {
    // Handle errors here
    console.error('Error fetching data:', error.message)
  }
}

// Call the fetchData function when the component is mounted
onMounted(() => {
  fetchData()
})
</script>
