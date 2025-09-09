import { Alert } from "react-native";
import bancoApi from "../api/BancoApi";
import { CreateDestinatarioData, Destinatario } from "../auth/interfaces/destinatarios";

export const destinatarioActions = {

  // Crear nuevo destinatario (sin token en parámetros)
  crearDestinatario: async(destinatarioData: CreateDestinatarioData) => {
    try {
      console.log('📨 Creando destinatario:', destinatarioData);
      const {data} = await bancoApi.post<Destinatario>('/beneficiarios', destinatarioData);
      console.log('✅ Destinatario creado exitosamente');
      return data;
    } catch (error: any) {
      console.log('❌ Error creando destinatario', error.response?.data);
      const errorMessage = error.response?.data?.errorMessage || 'Error al crear destinatario';
      Alert.alert('Error', errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Obtener todos los destinatarios del usuario (sin token)
  obtenerDestinatarios: async(): Promise<Destinatario[]> => {
    try {
      console.log('📋 Obteniendo destinatarios...');
      const {data} = await bancoApi.get<Destinatario[]>('/beneficiarios');
      console.log('✅ Destinatarios obtenidos:', data.length);
      return data;
    } catch (error: any) {
      console.log('❌ Error obteniendo destinatarios:', error.response?.data);
      Alert.alert('Error', 'No se pudieron cargar los destinatarios');
      return [];
    }
  },

  // Actualizar destinatario (sin token)
  actualizarDestinatario: async (id: number, destinatarioData: Partial<CreateDestinatarioData>) => {
    try {
      console.log('✏️ Actualizando destinatario ID:', id);
      const { data } = await bancoApi.put<Destinatario>(`/beneficiarios/${id}`, destinatarioData);
      console.log('✅ Destinatario actualizado');
      return data;
    } catch (error: any) {
      console.log('❌ Error actualizando destinatario:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Error al actualizar el destinatario';
      Alert.alert('Error', errorMessage);
      throw new Error(errorMessage);
    }
  },

  // Eliminar destinatario (sin token)
  eliminarDestinatario: async (id: number): Promise<boolean> => {
    try {
      console.log('🗑️ Eliminando destinatario ID:', id);
      await bancoApi.delete(`/beneficiarios/${id}`);
      console.log('✅ Destinatario eliminado');
      return true;
    } catch (error: any) {
      console.log('❌ Error eliminando destinatario:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Error al eliminar el destinatario';
      Alert.alert('Error', errorMessage);
      return false;
    }
  }
};