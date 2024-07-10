/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import api from '~/api'
import { LoginRequest } from '~/api/v1'

export type AuthStatus = 'authorized' | 'unauthorized' | 'pending'

export interface AuthState {
  status: AuthStatus
  accessToken?: string
  refreshToken?: string
  user?: {
    firstName: string
    username: string
  }

  loginUser: (data: LoginRequest) => Promise<void>
  logoutUser: () => void
  registerUser: (
    userName?: string,
    password?: string,
    confirmPassword?: string,
    email?: string,
    phoneNumber?: string,
    firstName?: string,
    lastName?: string,
    address?: string,
    birthday?: string
  ) => Promise<void>
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'unauthorized',
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
  loginUser: async (data) => {
    // try {
    const res = await api.apiAuthenLoginPost(data)

    const resJson = res.data as any
    set({
      status: 'authorized',
      accessToken: resJson.accessToken,
      refreshToken: resJson.accessToken,
      user: {
        firstName: resJson.firstName,
        username: resJson.username
      }
    })
    // } catch (error) {
    //   set({ status: 'unauthorized', token: undefined, user: undefined })
    //   console.log('Credenciales incorrectas')
    // }
  },
  logoutUser: () => {
    set({ status: 'unauthorized', accessToken: undefined, refreshToken: undefined, user: undefined })
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerUser: async (
    userName,
    password,
    confirmPassword,
    email,
    phoneNumber,
    firstName,
    lastName,
    address,
    birthday
  ) => {
    try {
      await api.apiUsersPost(
        userName,
        password,
        confirmPassword,
        email,
        phoneNumber,
        firstName,
        lastName,
        address,
        birthday
      )
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
})

export const useAuthStore = create<AuthState>()(devtools(persist(storeApi, { name: 'auth-storage' })))
