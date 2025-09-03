import GoBackIconButton from '@/components/GoBackIconButton'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const NuevoDestinatarioScreen = () => {
  return (
    <View className="flex-1 p-4 bg-gray-50 mt-10">
      <GoBackIconButton/>
      <Text className="text-xl font-bold text-gray-800 mb-6 text-center">Agregar Nuevo Destinatario</Text>
      
      {/* Campo de búsqueda */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2">Número de Cuenta</Text>
        <View className="flex-row">
          <TextInput
            className="flex-1 border border-gray-300 rounded-l-lg p-3 bg-white"
            placeholder="Ingresa el número de cuenta"
            value={''}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            className="bg-blue-500 px-4 rounded-r-lg items-center justify-center"
            onPress={() => {}}
          >
          </TouchableOpacity>
        </View>
      </View>

      {/* Resultados de la búsqueda */}
      
        <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Información de la Cuenta</Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Nombre:</Text>
              <Text className="text-gray-800 font-medium">'algun destinatario'</Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Tipo de Cuenta:</Text>
              <Text className="text-gray-800 font-medium">'algun tipo de cuenta'</Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Banco:</Text>
              <Text className="text-gray-800 font-medium">'algun banco'</Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Número de Cuenta:</Text>
              <Text className="text-gray-800 font-medium">'algun numero de cuenta'</Text>
            </View>
          </View>
          
          <TouchableOpacity
            className="mt-4 bg-green-500 py-2 rounded-lg items-center"
            onPress={() => {}}
          >
            <Text className="text-white font-medium">Agregar Destinatario</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default NuevoDestinatarioScreen