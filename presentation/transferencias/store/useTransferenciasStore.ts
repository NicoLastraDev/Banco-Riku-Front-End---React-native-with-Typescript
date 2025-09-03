import { CreateTransferenciaData, Cuenta, Transferencia } from "@/core/banco/interfaces/transferencias";
import { transferenciaActions } from "@/core/banco/transferencias.actions";
import { create } from "zustand";

interface TransferenciaState {
  cuentas: Cuenta[];
  transferencias: Transferencia[];
  loading: boolean;
  error: string | null;
  success: boolean;
  verificandoCuenta: boolean;
  infoCuentaDestino: { name?: string; bank?: string } | null;
}

interface TransferenciaActions {
  // Datos
  obtenerCuentas: (token: string) => Promise<void>;
  obtenerTransferencias: (token: string) => Promise<void>;
  
  // Transferencia
  realizarTransferencia: (data: CreateTransferenciaData, token: string) => Promise<boolean>;
  
  // Verificación de cuenta
  verificarCuentaDestino: (accountNumber: string, token: string) => Promise<void>;
  
  // Validación
  validarTransferencia: (fromAccountId: number, amount: number, toAccountNumber: string) => { isValid: boolean; errors: string[] };
  
  // Utilidades
  obtenerCuentaPorId: (accountId: number) => Cuenta | undefined;
  obtenerSaldoDisponible: (accountId: number) => number;
  
  // Estado
  clearError: () => void;
  clearSuccess: () => void;
  clearInfoCuenta: () => void;
}

export const useTransferenciaStore = create<TransferenciaState & TransferenciaActions>((set, get) => ({
  // Estado inicial
  cuentas: [],
  transferencias: [],
  loading: false,
  error: null,
  success: false,
  verificandoCuenta: false,
  infoCuentaDestino: null,

  // Obtener cuentas del usuario
  obtenerCuentas: async (token: string) => {
    set({ loading: true, error: null });
    try {
      const cuentas = await transferenciaActions.obtenerCuentasUsuario(token);
      set({ cuentas, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Obtener historial de transferencias
  obtenerTransferencias: async (token: string) => {
    set({ loading: true, error: null });
    try {
      const transferencias = await transferenciaActions.obtenerTransferencias(token);
      set({ transferencias, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Realizar transferencia
  realizarTransferencia: async (data: CreateTransferenciaData, token: string): Promise<boolean> => {
    set({ loading: true, error: null, success: false });
    
    try {
      // Validar antes de ejecutar
      const validation = get().validarTransferencia(data.fromAccountId, data.amount, data.toAccountNumber);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const transferencia = await transferenciaActions.realizarTransferencia(data, token);
      
      // Actualizar saldo localmente
      set(state => ({
        cuentas: state.cuentas.map(cuenta =>
          cuenta.id === data.fromAccountId
            ? { ...cuenta, balance: cuenta.balance - data.amount }
            : cuenta
        ),
        transferencias: [transferencia, ...state.transferencias],
        loading: false,
        success: true,
        infoCuentaDestino: null // Limpiar info después de transferencia exitosa
      }));

      return true;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  // Verificar cuenta destino
  verificarCuentaDestino: async (accountNumber: string, token: string) => {
    if (!accountNumber || accountNumber.length < 5) {
      set({ infoCuentaDestino: null });
      return;
    }

    set({ verificandoCuenta: true });
    try {
      const resultado = await transferenciaActions.verificarCuentaDestino(accountNumber, token);
      
      if (resultado.exists) {
        set({ 
          infoCuentaDestino: {
            name: resultado.name,
            bank: resultado.bank
          },
          verificandoCuenta: false
        });
      } else {
        set({ 
          infoCuentaDestino: null,
          verificandoCuenta: false,
          error: 'La cuenta destino no existe o es inválida'
        });
      }
    } catch (error: any) {
      set({ 
        verificandoCuenta: false,
        infoCuentaDestino: null,
        error: error.message
      });
    }
  },

  // Validar transferencia
  validarTransferencia: (fromAccountId: number, amount: number, toAccountNumber: string) => {
    const { cuentas } = get();
    const errors: string[] = [];

    if (!fromAccountId) {
      errors.push('Selecciona una cuenta de origen');
    }

    if (!toAccountNumber || toAccountNumber.length < 10) {
      errors.push('El número de cuenta destino debe tener al menos 10 dígitos');
    }

    if (!amount || amount <= 0) {
      errors.push('Ingresa un monto válido');
    } else if (amount > 10000) {
      errors.push('El monto no puede superar los $10,000');
    }

    // Validar saldo
    if (fromAccountId) {
      const cuenta = cuentas.find(c => c.id === fromAccountId);
      if (cuenta && amount > cuenta.balance) {
        errors.push(`El monto supera tu saldo disponible ($${cuenta.balance.toFixed(2)})`);
      }
    }

    // Validar que no sea la misma cuenta
    if (fromAccountId && toAccountNumber) {
      const cuentaOrigen = cuentas.find(c => c.id === fromAccountId);
      if (cuentaOrigen && cuentaOrigen.accountNumber === toAccountNumber) {
        errors.push('No puedes transferir a la misma cuenta de origen');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Utilidades
  obtenerCuentaPorId: (accountId: number) => {
    return get().cuentas.find(cuenta => cuenta.id === accountId);
  },

  obtenerSaldoDisponible: (accountId: number) => {
    const cuenta = get().cuentas.find(c => c.id === accountId);
    return cuenta ? cuenta.balance : 0;
  },

  // Limpiar estados
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: false }),
  clearInfoCuenta: () => set({ infoCuentaDestino: null })
}));