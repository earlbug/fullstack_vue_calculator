import { defineStore } from 'pinia'

import { getJwtToken } from '../utils/authService'

export const useUserTokenStore = defineStore('token', {
    state: () => ({
      jwtToken: '',
      loggedInUser: '',
    }),

    actions: {
      async getTokenAndSaveInStore(username: string, password: string) {
        try {
          await getJwtToken(username, password).then((token) => {
            if (token) {
              console.log('JWT Token:', token)
              this.jwtToken = token
              this.loggedInUser = username
            } else {
              console.log('Failed to retrieve token')
            }
          })
        } catch (err) {
          console.log(err)
        }
      },
    },

  })
