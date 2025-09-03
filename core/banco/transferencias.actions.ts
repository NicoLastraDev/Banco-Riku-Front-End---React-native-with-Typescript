import axios from "axios";
import { API_URL } from "../api/BancoApi";
import { CreateTransferenciaData, Cuenta, Transferencia } from "./interfaces/transferencias";

export const transferenciaActions = {

  //Crear transferencia
  realizarTransferencia: async(data: CreateTransferenciaData, token: string): Promise<Transferencia> => {

    try {
      
      const response = await axios.post<Transferencia>(`${API_URL}/transferencias`,
      data,
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
      return response.data
    }
    
    catch (error: any) {
      if(axios.isAxiosError(error)){
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Error al realizar la transferencia'
        throw new Error (errorMessage)
      }
      throw new Error ('Error de conexion al realizar la transferencia')
    }
  },

  //-------------------------------------------------------------------------
  
  //Obtener transferencias
  obtenerTransferencias: async(token: string): Promise<Transferencia[]> => {
    try {
      
      const response = await axios.get<Transferencia[]>(`
        ${API_URL}/transferencias
        `,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data

    }
    catch (error: any) {
      if(axios.isAxiosError(error)){
        const errorMessage = error.response?.data?.message || 'Error al obtener transferencias'
        throw new Error (errorMessage)
      }
      throw new Error('Error de conexión al obtener transferencias');
    }
  },

  //---------------------------------------------------------------------------
  //obtener cuentas de usuario

  obtenerCuentasUsuario: async (token: string): Promise<Cuenta[]> => {

    try {
      
      const response = await axios.get<Cuenta[]>(`
        ${API_URL}/cuentas`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data
    }
    
    catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Error al obtener las cuentas';
        throw new Error(errorMessage);
      }
      throw new Error('Error de conexión al obtener cuentas');
    }
  },

  /**-------------------------------------------------------------------------
   * 
    obtener destinatarios
   */
  obtenerDestinatarios: async(token: string): Promise<any[]> => {

    try {
      
      const response = await axios.get(`${API_URL}/destinatarios`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data
    } 
    
    catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Error al obtener los destinatarios';
        throw new Error(errorMessage);
      }
      throw new Error('Error de conexión al obtener destinatarios');
    }
  },

  /**-------------------------------------------------------------------------
   * 
    Verificar cuenta de destino
   */
  verificarCuentaDestino: async (accountNumber: string, token: string): Promise<{ exists: boolean; name?: string; bank?: string }> => {
    try {
      const response = await axios.post(
        `${API_URL}/cuentas/verificar`,
        { accountNumber },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Si la cuenta no existe, el backend podría retornar 404
        if (error.response?.status === 404) {
          return { exists: false };
        }
        const errorMessage = error.response?.data?.message || 'Error al verificar la cuenta';
        throw new Error(errorMessage);
      }
      throw new Error('Error de conexión al verificar cuenta');
    }
  }
}