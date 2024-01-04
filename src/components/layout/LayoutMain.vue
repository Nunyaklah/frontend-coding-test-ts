<template>
  <nav class="bg-gray-800 text-white">
    <div class="mx-auto px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <img class="w-14 h-14" src="../../assets/logo.svg" />
            <img class="ml-3" src="../../assets/logotype.svg" />
          </div>
          <div class="flex ml-10 items-center align-middle">
            <div class="flex space-x-4">
              <router-link
                to="/"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                exact-active-class="bg-gray-900 text-white"
                >Home</router-link
              >
              <router-link
                to="/shop"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Shop Here !</router-link
              >
            </div>
          </div>
        </div>
        <div class="flex md:order-2">
          <p
            class="self-center text-xl font-semibold whitespace-nowrap mr-14"
            v-if="loginStatus"
          >
            Welcome, {{ authStore.firstname + ' ' + authStore.lastname }}
          </p>
          <button
            type="button"
            class="text-black font-bold bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none rounded-lg text-sm px-10 py-3 text-center mr-3 md:mr-0"
            data-cy="logout-btn"
            @click.prevent="logout"
            v-if="loginStatus"
          >
            Logout <i class="ri-logout-circle-line"></i>
          </button>
          <button
            type="button"
            class="text-black font-bold bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none rounded-lg text-sm px-10 py-3 text-center mr-3 md:mr-0"
            data-cy="login-btn"
            @click.prevent="login"
            v-else
          >
            Login <i class="ri-login-circle-line"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <main class="flex justify-center">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { computed, ref } from 'vue'
import {useRouter} from 'vue-router'

// create store
const authStore = useAuthStore()
const router = useRouter()

const loginStatus = computed(() => {
  return authStore.isLoggedIn
})

// let loginStatus = ref(authStore.isLoggedIn);

function logout() {
  authStore.logout()
  router.push('/')
}

function login() {
  router.push('/login')
}
</script>
