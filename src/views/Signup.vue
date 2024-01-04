<template>
  <section class="text-left">
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
            Sign Up for your account
          </h1>
          <Form
            @submit="handleSignup"
            :validation-schema="schema"
            v-slot="{ errors }"
            class="space-y-4 md:space-y-6"
          >
            <div>
              <label
                for="firstname"
                class="block mb-2 text-sm font-medium text-gray-900"
                >First Name</label
              >
              <Field
                type="text"
                name="firstname"
                v-model="firstname"
                id="firstname"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Kofi"
                :class="{ 'is-invalid': errors.firstname }"
              />
              <div class="invalid-feedback text-xs text-red-700">
                {{ errors.firstname }}
              </div>
            </div>
            <div>
              <label
                for="lastname"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Last Name</label
              >
              <Field
                type="text"
                name="lastname"
                v-model="lastname"
                id="lastname"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Wisdor"
                :class="{ 'is-invalid': errors.lastname }"
              />
              <div class="invalid-feedback text-xs text-red-700">
                {{ errors.lastname }}
              </div>
            </div>
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
              <div class="invalid-feedback text-xs text-red-700">
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
              <div class="invalid-feedback text-xs text-red-700">
                {{ errors.password }}
              </div>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Confirm Password</label
              >
              <Field
                type="password"
                name="confirmPassword"
                v-model="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                :class="{ 'is-invalid': errors.confirmPassword }"
              />
              <div class="invalid-feedback text-xs text-red-700">
                {{ errors.confirmPassword }}
              </div>
            </div>

            <button
              type="submit"
              class="w-full text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign up
            </button>
            <p class="text-sm font-semibold text-gray-700">
              Already have an account?
              <router-link
                to="/login"
                class="font-medium text-gray-900 hover:underline"
                >Sign In</router-link
              >
            </p>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import {useRouter} from 'vue-router'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

// create store
const authStore = useAuthStore()
const router = useRouter()

const schema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

let firstname = ref('')
let lastname = ref('')
let email = ref('')
let password = ref('')
let confirmPassword = ref('')

function handleSignup() {
  authStore.signup(firstname.value, lastname.value, email.value, password.value)
  router.push('/login')
}
</script>
