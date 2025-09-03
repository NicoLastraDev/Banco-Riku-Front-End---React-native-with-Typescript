import { authCheckStatus, authLogin, authRegister } from '@/core/auth/actions/authActions'
import { User } from '@/core/auth/interfaces/user'
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage-adapter'
import { create } from 'zustand'

export type authStatus = 'authenticated' | 'unauthenticathed' | 'checking'

export interface authState {
  status: authStatus,
  token?: string,
  user?: User,

  login: (email: string, passwoord: string) => Promise<Boolean>,
  register: (fullName: string, email: string, passwoord: string) =>             Promise<Boolean>
  checkStatus: () => Promise<void>,
  logout: () => Promise<void>,
  changeStatus: (token?: string, user?: User) => Promise<boolean>
}

export const useAuthStore = create<authState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    User: undefined,

    changeStatus: async(token?: string, user?:User) => {
      if(!token || !user){
        set({ status: 'unauthenticathed', token: undefined, user: undefined })
        await SecureStorageAdapter.deleteItem('token')
        return false
      }

      set({ status: 'authenticated', token: token, user: user })
      await SecureStorageAdapter.setItem('token', token)
      return true
    },

    login: async(email: string, password: string) => {
      const resp = await authLogin(email, password)
      return get().changeStatus(resp?.token, resp?.user)
    },

    checkStatus: async() => {


      const resp = await authCheckStatus()
      get().changeStatus(resp?.token, resp?.user)
    },

    logout: async() => {
      //ToDO: clear token secure storage
      SecureStorageAdapter.deleteItem('token')
      set({status: "unauthenticathed", token: undefined, user: undefined})
    },

    register: async(fullName: string, email: string, password: string) => {
      try {
        
        const resp = await authRegister(fullName, email, password)

        if (resp?.token) {
          return await get().changeStatus(resp.token, resp.user)
        }

        return false

      } 
      
      catch (err) {
        console.log(err)
        return false
      }
    }
  }
))