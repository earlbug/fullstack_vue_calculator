import axios from 'axios'
  import type { UserInfo } from '../models/interfaces'

  export async function getJwtToken(username: string, password: string): Promise<string | null> {
    try {
      const response = await axios.post<string>('http://localhost:8080/token', {
        username,
        password,
      })

      return response.data
    } catch (error) {
      console.error('Error fetching JWT token:', error)
      return null
    }
  }

  export async function userDetails(username: string, token: string): Promise<UserInfo | null> {
    try {
      const response = await axios.get<UserInfo>(`http://localhost:8080/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching user details:', error)
      return null
    }
  }
