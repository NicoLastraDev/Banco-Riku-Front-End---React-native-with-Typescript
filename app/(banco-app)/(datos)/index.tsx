import GoBackIconButton from '@/components/GoBackIconButton';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import React from 'react';
import { Text, View } from 'react-native';


const TarjetaDebitoPremium = () => {
  const { user } = useAuthStore();

  const formatCardNumber = (number: string = '1234567812345678') => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <View className="items-center my-8">
      <GoBackIconButton/>
      {/* Tarjeta principal */}
      <View className="w-80 h-52 bg-blue-900 rounded-2xl p-6 overflow-hidden">
        
        {/* Efecto de brillo */}
        <View className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full" />
        <View className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-400 opacity-20 rounded-full" />

        {/* Contenido */}
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="flex-row justify-between items-start">
            <View className="w-12 h-9 bg-amber-400 rounded-md" />
            <Text className="text-white font-bold text-sm">RIKU BANK</Text>
          </View>

          {/* Número de tarjeta */}
          <Text className="text-white text-xl font-bold tracking-widest text-center mt-4">
            {formatCardNumber(user?.fullName || '1234567812345678')}
          </Text>

          {/* Footer */}
          <View className="flex-row justify-between items-end mt-8">
            <View>
              <Text className="text-white opacity-70 text-xs mb-1">TITULAR</Text>
              <Text className="text-white text-sm font-semibold">
                {user?.fullName?.toUpperCase() || 'NOMBRE DEL TITULAR'}
              </Text>
            </View>
            <Text className="text-white opacity-80 text-xs font-bold">DÉBITO</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TarjetaDebitoPremium;