/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AuthenApi } from '~/api'

export type AuthStatus = 'authorized' | 'unauthorized' | 'pending'

const authenApi = new AuthenApi()

export interface AuthState {
  status: AuthStatus
  accessToken?: string
  refreshToken?: string
  user?: {
    firstName: string
  }

  loginUser: (email: string, password: string) => Promise<void>
  logoutUser: () => void
  registerUser: (data: any) => Promise<void>
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'unauthorized',
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
  loginUser: async (email: string, password: string) => {
    // try {
    const res = await authenApi.apiAuthenLoginPost({ username: email, password: password })
    const data = res.data as any
    set({
      status: 'authorized',
      accessToken: data.accessToken,
      refreshToken: data.accessToken,
      user: {
        firstName: data.firstName
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
  registerUser: async (data) => {
    try {
      // await authApi.registerUser(data)
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
})

export const useAuthStore = create<AuthState>()(devtools(persist(storeApi, { name: 'auth-storage' })))
