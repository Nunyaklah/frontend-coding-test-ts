import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()

interface AlertStoreActions {
  success(message: string): void
  error(message: string): void
}

export const useAlertStore = defineStore('alertStore', {
  actions: {
    success(message: string): void {
      toast.success(message)
    },
    error(message: string): void {
      toast.error(message)
    },
  } as AlertStoreActions,
})
