export interface Transferencia {
  id?: number,
  fromAccountId: number,
  toAccountNumber: number,
  amount: number,
  currency: number,
  description?: string,
  createdAt?: string,
  status?: 'pendiente' | 'completada' | 'fallida'
}

export interface CreateTransferenciaData {
  fromAccountId: number,
  toAccountNumber: string,
  amount: number,
  description?: string
}

export interface Cuenta {
  id: number,
  accountNumber: string,
  accountName: string,
  balance: number,
  currency: string,
  type: 'checking' | 'grabada',
  userid: number
}