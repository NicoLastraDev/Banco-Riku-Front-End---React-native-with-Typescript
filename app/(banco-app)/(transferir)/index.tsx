import GoBackIconButton from "@/components/GoBackIconButton";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";


const TransferirScreen = ({ onClose }: { onClose: () => void }) => {

  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTransfer = () => {
    // Validación corregida con paréntesis completo
    if (isNaN(Number(amount))) {
      Alert.alert('Error', 'El monto debe ser un número válido');
      return;
    }

    if (!amount || !accountNumber) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);

    // Simulación de transferencia
    setTimeout(() => {
      Alert.alert(
        'Transferencia exitosa',
        `Has transferido $${amount} a la cuenta ${accountNumber}`,
        [{ text: 'Aceptar', onPress: onClose }]
      );
      setIsSubmitting(false);
    }, 1500);
  }
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white p-6"
    >
      {/* Header */}
      <View className="flex-row mt-10 justify-around mb-10 left-1">
      
        <GoBackIconButton/>
        <Text className="text-2xl font-bold text-gray-900 text-center">Transferencia Riku</Text>
      </View>

      {/* Formulario */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Nombre del destino</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-4"
          placeholder="Ej: 12345678"
          keyboardType="default"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />
      </View>

      <View className="mb-8">
        <Text className="text-gray-700 mb-2 font-medium">Descripción</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-lg border border-gray-200"
          placeholder="Ej: 50000"
          keyboardType="default"
          value={''}
          onChangeText={setAmount}
        />
      </View>

      <View className="mb-8">
        <Text className="text-gray-700 mb-2 font-medium">Monto a transferir ($)</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-lg border border-gray-200"
          placeholder="Ej: 50000"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />
        <Text className="text-gray-500 text-sm mt-1">Saldo disponible: $15.225</Text>
      </View>

      {/* Botón de transferencia */}
      <TouchableOpacity
        className={`bg-blue-600 p-4 rounded-lg items-center ${isSubmitting ? 'opacity-70' : ''}`}
        onPress={handleTransfer}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Text className="text-white font-medium">Procesando...</Text>
        ) : (
          <Text className="text-white font-medium">Transferir ahora</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default TransferirScreen