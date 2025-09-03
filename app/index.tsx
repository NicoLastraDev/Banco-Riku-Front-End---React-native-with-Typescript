import { bancoApi } from '@/core/api/BancoApi';
import { Redirect } from 'expo-router';
import React from 'react';
import '../global.css';

const index = () => {

  const testConnection = async () => {
  try {
    const response = await bancoApi.get('/');
    console.log('✅ Conexión exitosa:', response.data);
    return true;
  } catch (error: any) {
    console.log('❌ Error de conexión:', error.message);
    return false;
  }
}

testConnection()

  return (
    <Redirect href={'/auth/login'}/>
  )
}

export default index