<template>
  <div class="text-left">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <router-link
        to="/"
        class="flex items-center mb-6 text-2xl font-bold text-gray-900"
      >
        <img class="w-16 h-16 mr-2" src="../assets/logo.svg" alt="logo" />
      </router-link>
      <div
        class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Sign in to your account
          </h1>
          <Form
            @submit="handleLogin"
            :validation-schema="schema"
            v-slot="{ errors }"
            class="space-y-4 md:space-y-6"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <Field
                type="email"
                name="email"
                v-model="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="name@mail.com"
                :class="{ 'is-invalid': errors.email }"
              />
              <div
                class="invalid-feedback text-xs text-red-700"
              >
                {{ errors.email }}
              </div>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <Field
                type="password"
                name="password"
                v-model="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                :class="{ 'is-invalid': errors.password }"
              />
              <div
                class="invalid-feedback text-xs text-red-700"
              >
                {{ errors.password }}
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start"></div>
              <a
                href="#"
                class="text-sm font-medium text-gray-900 hover:underline"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white flex justify-center items-center bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p class="text-sm font-semibold text-gray-700">
              Dont have an account yet?
              <router-link
                to="/signup"
                class="font-medium text-gray-900 hover:underline"
                >Sign up</router-link
              >
            </p>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import {useRouter} from 'vue-router'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

// create store
const authStore = useAuthStore()
const router = useRouter()

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

let email = ref('')
let password = ref('')

const handleLogin = async () => {
  await authStore.login(email.value, password.value);
  router.push('/')
};
</script>
