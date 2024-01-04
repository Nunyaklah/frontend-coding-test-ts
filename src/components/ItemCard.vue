<template>
  <div class="p-3 rounded-md bg-white shadow-md h-full text-center">
    <img :src="item.image" alt="item thumb" class="thumb" />
    <p class="font-bold text-gray-500 m-4 truncate">{{ item.title }}</p>
    <router-link :to="`/shop/item/${item.id}`">
      <div
        class="bg-gray-800 text-white px-3 py-2 rounded-md text-sm my-4 flex justify-center items-center"
      >
        <p class="font-semibold">View Item</p>
        <i class="ri-eye-line ml-4 text-lg"></i>
      </div>
    </router-link>
  </div>
</template>

<script setup>
const { item } = defineProps(['item'])
import 'remixicon/fonts/remixicon.css'
</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
