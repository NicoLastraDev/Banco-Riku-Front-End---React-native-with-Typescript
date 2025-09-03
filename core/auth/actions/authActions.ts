import { bancoApi } from "@/core/api/BancoApi";
import { Alert } from "react-native";
import { User } from "../interfaces/user";


export interface AuthResponse {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
  token:    string;
}


const returnUserToken = (data: AuthResponse) => {
  const {id, email, fullName, roles, token} = data
  const user: User = { id, email, fullName, roles }

  return {
    user,
    token 
  }
}

export const authLogin = async(email: string, password: string) => {

  email = email.toLocaleLowerCase()

  try {
  
    const {data} = await bancoApi.post<AuthResponse>('/auth/login',{
      email, password
    })

    return returnUserToken(data)

  } catch (error) {
    console.log(error)
    //throw new Error('user and  or password not valid')
    return null
  }
}


export const authCheckStatus = async() => {
  try {
    const { data } = await bancoApi.get<AuthResponse>('/auth/check-status')
    return returnUserToken(data)
  } catch (error) {
    return null
  }
}

//TODO hacer el register

export const authRegister = async(fullName: string, email: string, password: string) => {
  email = email.toLowerCase()

  try {
    const {data} = await bancoApi.post<AuthResponse>('/auth/register', {
      fullName, email, password
    })

    return returnUserToken(data)

  } catch (error:any) {
    console.log(error.response?.data?.message)
    Alert.alert('Error', 'Ha fallado la creación del usuario')
    return null
  }
}