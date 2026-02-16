import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  //state
  const username = ref('erererl')
  const email = ref('mail@fail.com')

  // action
  function setUsername(username) {
    username,value = username
  }

  function setEmail(email) {
    email.value = email
  }

  //getter
  const getUsername = computed(() => username.value)
  const getEmail = computed(() => email.value)

  return {username, email, setUsername, setEmail, getName, getEmail}


})
