import bancoApi from "@/core/api/BancoApi";
import { Alert } from "react-native";
import { User } from "../interfaces/user";

export interface AuthResponse {
  id:       string;
  email:    string;
  nombre: string;      // ← Cambiado de fullName a nombre
  isActive: boolean;
  roles:    string[];
  token:    string;
}

const returnUserToken = (data: AuthResponse) => {
  const {id, email, nombre, roles, token} = data
  const user: User = { 
    id, 
    email, 
    nombre,    // ← Cambiado de fullName a nombre
    roles 
  }

  return {
    user,
    token 
  }
}

export const authLogin = async(email: string, password: string) => {
  email = email.toLowerCase()

  try {
    const {data} = await bancoApi.post('/auth/login', {
      email, 
      password
    })

    return returnUserToken(data)

  } catch (error) {
    console.log(error)
    return null
  }
}

export const authCheckStatus = async() => {
  try {
    const { data } = await bancoApi.get('/auth/check-status')
    return returnUserToken(data)
  } catch (error) {
    return null
  }
}

// REGISTER actualizado
export const authRegister = async(nombre: string, email: string, password: string) => {  // ← Cambiado fullName por nombre
  email = email.toLowerCase()

  try {
    const {data} = await bancoApi.post('/auth/register', {
      nombre,    // ← Cambiado de fullName a nombre
      email, 
      password
    })

    return returnUserToken(data)

  } catch (error: any) {
    console.log('❌ Error en registro:', error.response?.data);
    const errorMessage = error.response?.data?.message || 'Ha fallado la creación del usuario';
    Alert.alert('Error', errorMessage);
    return null
  }
}