import GoBackIconButton from '@/components/GoBackIconButton';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

type Transaccion = {
  id: number;
  tipo_transaccion: 'Deposito' | 'Retiro' | 'Transferencia';
  monto: number;
  descripcion: string;
  fecha: string;
  cuenta_destino?: string;
};

const MovimientosScreen = () => {

  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [loading, setLoading] = useState(true);


  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatMonto = (monto: number) => {
    return monto.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'USD',
    });
  }

  // if (loading) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-gray-50">
  //       <ActivityIndicator size="large" color="#3b82f6" />
  //     </View>
  //   );
  // }



  return (
    <View className="flex-1 bg-gray-50 p-4 mt-12">
      <GoBackIconButton/>
      <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">Historial de Movimientos</Text>
      {transacciones.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">No hay transacciones registradas</Text>
        </View>
      ) : (
        <ScrollView className="bg-white rounded-lg shadow-sm">
          <View className="border-b border-gray-200">
            {/* Encabezado de la tabla */}
            <View className="flex-row bg-gray-100 px-4 py-3">
              <Text className="flex-1 font-semibold text-gray-700">Fecha</Text>
              <Text className="flex-1 font-semibold text-gray-700">Tipo</Text>
              <Text className="flex-1 font-semibold text-gray-700 text-right">Monto</Text>
            </View>

            {/* Filas de transacciones */}
            {transacciones.map((transaccion) => (
              <View key={transaccion.id} className="flex-row border-b border-gray-100 px-4 py-3">
                <Text className="flex-1 text-gray-600">{formatFecha(transaccion.fecha)}</Text>
                <View className="flex-1">
                  <Text className="text-gray-800">{transaccion.tipo_transaccion}</Text>
                  {transaccion.cuenta_destino && (
                    <Text className="text-xs text-gray-500">A: {transaccion.cuenta_destino}</Text>
                  )}
                </View>
                <Text 
                  className={`flex-1 text-right font-medium ${
                    transaccion.tipo_transaccion === 'Deposito' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}
                >
                  {transaccion.tipo_transaccion === 'Deposito' ? '+' : '-'}
                  {formatMonto(transaccion.monto)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default MovimientosScreen