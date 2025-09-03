import { Alert } from "react-native";

import { bancoApi } from "../api/BancoApi";
import { CreateDestinatarioData, Destinatario } from "../auth/interfaces/destinatarios";

export const destinatarioActions =  {

  //Crear nuevo destinatario
  crearDestinatario: async(destinatarioData: CreateDestinatarioData, token: string) => {

    try {
      const {data} = await bancoApi.post<Destinatario>('/beneficiarios', destinatarioData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    }
    
    catch (error: any) {
      console.log('Error creando destinatario', error.response?.data)
      const errorMessage = error.response?.data?.errorMessage || 'Error al crear destinatario'

      Alert.alert('Error', errorMessage)
      throw new Error(errorMessage)
    }
  },

  //-----------------------------------------------------------------------------
  //obtener todos los destinatarios del usuario
  obtenerDestinatarios: async(token: string): Promise<Destinatario[]> => {

    try {
      const {data} = await bancoApi.get<Destinatario[]>('/beneficiarios', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } 
    
    catch (error: any) {
      console.log('Error obteniendo destinatarios:', error.response?.data);
      Alert.alert('Error', 'No se pudieron cargar los destinatarios');
      return []
    }
  },

  //-----------------------------------------------------------------------------

  //Actualizar destinatario
  actualizarDestinatario: async (id: number, destinatarioData: Partial<CreateDestinatarioData>, token: string) => {
    try {
      const { data } = await bancoApi.put<Destinatario>(`/beneficiarios/${id}`, destinatarioData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data;

    } catch (error: any) {
      console.log('Error actualizando destinatario:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 'Error al actualizar el destinatario';
      
      Alert.alert('Error', errorMessage);
      throw new Error(errorMessage);
    }
  },

  //------------------------------------------------------------------------------

  // Eliminar destinatario
  eliminarDestinatario: async (id: number, token: string): Promise<boolean> => {
    try {
      await bancoApi.delete(`/beneficiarios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return true;

    } catch (error: any) {
      console.log('Error eliminando destinatario:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          'Error al eliminar el destinatario';
      
      Alert.alert('Error', errorMessage);
      return false;
    }
  },
  //Fin funciones destinatario
}