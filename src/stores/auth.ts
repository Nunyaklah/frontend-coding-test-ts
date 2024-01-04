import { defineStore } from 'pinia'
import axios from 'axios'

import { useAlertStore } from './alerts'

const baseUrl: string = `${import.meta.env.VITE_API_URL}`

interface AuthStoreState {
  token: string | null
  firstname: string | null
  lastname: string | null
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthStoreState => ({
    token: window.localStorage.getItem('token'),
    firstname: window.localStorage.getItem('firstname'),
    lastname: window.localStorage.getItem('lastname'),
  }),
  actions: {
    async login(email: string, password: string): Promise<void> {
      const alertStore = useAlertStore()
      
      try {
        const response = await axios.post(`${baseUrl}/login`, {
          email,
          password,
        })

        if (response && response.data && response.data.accessToken) {
          this.token = response.data.accessToken
          this.firstname = response.data.user.firstname
          this.lastname = response.data.user.lastname
          localStorage.setItem('firstname', response.data.user.firstname)
          localStorage.setItem('lastname', response.data.user.lastname)
          localStorage.setItem('token', response.data.accessToken)
          alertStore.success('Logged in successfully')
        } else {
          alertStore.error('Unexpected response format')
        }
      } catch (error: any) {
        alertStore.error(error.response.data)
      }
    },

    async signup(
      firstname: string,
      lastname: string,
      email: string,
      password: string,
    ): Promise<void> {
      const alertStore = useAlertStore()
      try {
        const response = await axios.post(`${baseUrl}/signup`, {
          firstname,
          lastname,
          email,
          password,
        })

        if (response && response.data) {
          // Check if the response has the expected structure
          console.log(response)
          alertStore.success('Registered successfully')
        } else {
          alertStore.error('Unexpected response format')
        }
      } catch (error: any) {
        alertStore.error(error.response.data)
      }
    },

    logout(): void {
      this.token = null
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('firstname')
      window.localStorage.removeItem('lastname')
    },
  },
  getters: {
    isLoggedIn: (state): boolean => !!state.token,
  },
})
