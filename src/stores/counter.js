import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    email: ''
  }),
  actions: {
    setUsername(username) {
      this.username = username
    },
    setEmail(email){
      this.email = email
    }
  },
  getters: {
    getUsername(state) {return state.username},
    getEmail(state) {return state.email}
  }
})
