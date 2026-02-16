import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  //state
  const username = ref('')
  const email = ref('')

  // action
  function setUsername(inpName) {
    username.value = inpName
  }

  function setEmail(inpEmail) {
    email.value = inpEmail
  }

  //getter
  const getUsername = computed(() => username.value)
  const getEmail = computed(() => email.value)

  return {username, email, setUsername, setEmail, getUsername, getEmail}


})
