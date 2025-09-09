import { authCheckStatus, authLogin, authRegister } from '@/core/auth/actions/authActions';
import { User } from '@/core/auth/interfaces/user';
import { Cuenta } from '@/core/banco/interfaces/cuentas';
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage-adapter';
import { create } from 'zustand';

export type authStatus = 'authenticated' | 'unauthenticathed' | 'checking'

export interface authState {
  status: authStatus,
  token?: string,
  user?: User,
  cuenta?: Cuenta, // ← Agregar cuenta al store

  login: (email: string, password: string) => Promise<Boolean>,
  register: (nombre: string, email: string, password: string) => Promise<Boolean>,
  checkStatus: () => Promise<void>,
  logout: () => Promise<void>,
  changeStatus: (token?: string, user?: User) => Promise<boolean>,
  setCuenta: (cuenta: Cuenta) => void, // ← Nueva función
  loadCuenta: () => Promise<void>, // ← Nueva función
}

export const useAuthStore = create<authState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,
  cuenta: undefined,

  changeStatus: async(token?: string, user?: User) => {
    if(!token || !user){
      set({ status: 'unauthenticathed', token: undefined, user: undefined, cuenta: undefined })
      await SecureStorageAdapter.deleteItem('token')
      return false
    }

    set({ status: 'authenticated', token: token, user: user })
    await SecureStorageAdapter.setItem('token', token)
    
    // Cargar cuenta después de autenticar
    await get().loadCuenta();
    return true
  },

  login: async(email: string, password: string) => {
    const resp = await authLogin(email, password)
    return get().changeStatus(resp?.token, resp?.user)
  },

  checkStatus: async() => {
    const resp = await authCheckStatus()
    await get().changeStatus(resp?.token, resp?.user)
  },

  logout: async() => {
    await SecureStorageAdapter.deleteItem('token')
    set({
      status: "unauthenticathed", 
      token: undefined, 
      user: undefined,
      cuenta: undefined
    })
  },

  register: async(nombre: string, email: string, password: string) => {
    try {
      const resp = await authRegister(nombre, email, password)
      if (resp?.token) {
        return await get().changeStatus(resp.token, resp.user)
      }
      return false
    } catch (err) {
      console.log(err)
      return false
    }
  },

  setCuenta: (cuenta: Cuenta) => {
    set({ cuenta })
  },

  loadCuenta: async () => {
    try {
      const { user, token } = get();
      if (!user || !token) return;

      //LLamada real al BACKEND
      
      
    } catch (error) {
      console.log('Error loading cuenta:', error);
    }
  },

}))