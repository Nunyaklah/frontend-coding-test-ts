<template>
  <div class="p-3 rounded-md bg-white shadow-md h-full m-10">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img :src="item.image" alt="item image" class="mx-auto my-7" />
      </div>
      <div class="p-7 text-left">
        <h2 class="text-4xl my-7">{{ item.title }}</h2>
        <p class="text-4xl font-extrabold   text-yellow-400 my-7">Price - ${{ item.price }}</p>
        <h3 class="font-bold border-b-2 mb-4 text-lg pb-2">Item description</h3>
        <p class="mb-7 text-2xl font-semibold">{{ item.description }}</p>
        <button
          class="bg-gray-800 text-white px-10 py-4 rounded-md text-sm flex items-center"
        >
          <span class="text-lg font-semibold">Add to cart</span>
          <i class="ri-shopping-cart-2-fill ml-4 text-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Access the route object
const route = useRoute()

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
const item = ref<Item[]>([])

// Function to fetch data from the API
const fetchData = async () => {
  try {
    // Make a GET request to the API
    const response = await axios.get<Item[]>(
      `https://fakestoreapi.com/products/${route.params.id}`,
    )

    // Assign the response data to the 'items' variable
    item.value = response.data

    // Optionally, log the items to the console
    console.log('Items:', item.value)
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error.message)
  }
}

// Call the fetchData function when the component is mounted
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
img {
  max-width: 400px;
}
</style>
