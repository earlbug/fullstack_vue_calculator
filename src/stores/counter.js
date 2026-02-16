import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('user', {
  state: () => ({
    username: ''
    email: ''
  }),
  actions: {
    setUsername(username) {
      this.username = username
    }
    setEmail(email){
      this.email = email
    }
  },
  getters: {
    getUsername() => username

  }
  return { count, doubleCount, increment }
})
