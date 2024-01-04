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
import Item from '../types/item'
import { useAlertStore } from '../stores/alerts'

const items = ref<Item[]>([])
const alertStore = useAlertStore()

const fetchData = async () => {
  try {
    const response = await axios.get<Item[]>(
      'https://fakestoreapi.com/products',
    )

    items.value = response.data

    alertStore.success('Succesfully fetched shop items')
  } catch (error: any) {
    alertStore.error('Error fetching data:', error.message)
  }
}

onMounted(() => {
  fetchData()
})
</script>
