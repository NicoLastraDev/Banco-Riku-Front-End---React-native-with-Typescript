import { FAB } from '@/components/FAB';
import GoBackIconButton from '@/components/GoBackIconButton';
import LogoutIconButton from '@/components/LogoutIconButton';
import { MovimientosRecientes } from '@/components/MovimientosRecientes';
import { ThemedText } from '@/components/ThemedText';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { Link, router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const index = () => {

  const {user, cuenta, status, loadCuenta} = useAuthStore()

  useEffect(() => {
    if (status === 'authenticated' && user && !cuenta) {
      loadCuenta()
    }
  }, [status, user, cuenta])
  
  const formatSaldo = (saldo: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(saldo)
  }

  if(status === 'checking' || !cuenta) {
      return (
        <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-gray-600 mt-4">Cargando información...</Text>
      </View>
      )
    }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Encabezado */}
      <View className="mb-6">
        <GoBackIconButton/>
        <Text className="text-2xl font-bold text-gray-800 text-center">Banco Riku</Text>
        <Text className="text-gray-500 text-center">¡Hola Nicolás!</Text>
        <LogoutIconButton/>
      </View>

      {/* Tarjeta Cuenta Vista */}
      <View className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-200">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">Cuenta Vista</Text>
          <Link href="/(banco-app)/(datos)" asChild>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">Ver datos</Text>
            </TouchableOpacity>
          </Link>
        </View>
        
        <View className="space-y-3">
          <View>
            <Text className="text-gray-500 text-sm">Disponible</Text>
            <Text className="text-2xl font-bold text-gray-800">$5.789.665.783</Text>
          </View>
          
          <View className="border-t border-gray-100 pt-3">
            <Text className="text-gray-500 text-sm">N° Cuenta</Text>
            <Text className="text-gray-800">508779005</Text>
          </View>
        </View>
      </View> {/* ← Este View estaba mal cerrado */}

      {/* Acciones rápidas */}
      <View className="flex-row justify-around mb-6">
        <FAB
          iconSource={require('../../../assets/images/agregar-usuario.png')}
          onPress={() => router.push('/(banco-app)/(nuevo_destinatario)')}>
          <ThemedText>Agregar destinatario</ThemedText>
        </FAB>
        <FAB
          iconSource={require('../../../assets/images/icon-transferencia.png')}
          onPress={() => router.push('/(banco-app)/(transferir)')}>
            <ThemedText>Transferir</ThemedText>
        </FAB>
        <FAB
          iconSource={require('../../../assets/images/icon-movimientos.png')}
          onPress={() => router.push('/(banco-app)/(movimientos)')}>
          <ThemedText>Movimientos</ThemedText>
        </FAB>
      </View>

      {/* Movimientos recientes (placeholder) */}
      <MovimientosRecientes />
    </ScrollView>
  );
}

export default index;