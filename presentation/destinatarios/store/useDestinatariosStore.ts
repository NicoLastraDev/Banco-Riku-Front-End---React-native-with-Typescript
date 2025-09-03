import { CreateDestinatarioData, Destinatario } from "@/core/auth/interfaces/destinatarios";
import { destinatarioActions } from "@/core/banco/destinatarioActions";
import { create } from "zustand";

interface DestinatariosState {
  destinatarios: Destinatario[],
  loading: boolean,
  error: string | null
}

interface DestinatariosActions {
  crearDestinatario: (data: CreateDestinatarioData, token: string) => Promise<void>
  obtenerDestinatarios: (token: string) => Promise<void>
  actualizarDestinatario: (id: number, data: Partial<CreateDestinatarioData>, token: string) => Promise<void>
  eliminarDestinatario: (id: number, token: string) => Promise<void>
}

export const useDestinatariosStore = create<DestinatariosState & DestinatariosActions>((set) => ({
  // Estado inicial
  destinatarios: [],
  loading: false,
  error: null,

  // Acciones
  crearDestinatario: async (data, token) => {
    set({ loading: true, error: null });
    try {
      const nuevoDestinatario = await destinatarioActions.crearDestinatario(data, token);
      set(state => ({
        destinatarios: [...state.destinatarios, nuevoDestinatario],
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  obtenerDestinatarios: async (token) => {
    set({ loading: true });
    try {
      const destinatarios = await destinatarioActions.obtenerDestinatarios(token);
      set({ destinatarios, loading: false, error: null });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  actualizarDestinatario: async (id, data, token) => {
    set({ loading: true });
    try {
      const destinatarioActualizado = await destinatarioActions.actualizarDestinatario(id, data, token);
      set(state => ({
        destinatarios: state.destinatarios.map(dest => 
          dest.id === id ? destinatarioActualizado : dest
        ),
        loading: false,
        error: null
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  eliminarDestinatario: async (id, token) => {
    set({ loading: true });
    try {
      const success = await destinatarioActions.eliminarDestinatario(id, token);
      if (success) {
        set(state => ({
          destinatarios: state.destinatarios.filter(dest => dest.id !== id),
          loading: false,
          error: null
        }));
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  clearError: () => set({ error: null })
}));