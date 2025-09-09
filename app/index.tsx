import bancoApi from '@/core/api/BancoApi'; // ← Import por defecto
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import '../global.css';

const Index = () => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 === TESTING CONNECTION ===');
        
        // ✅ Verifica que bancoApi no sea undefined
        if (!bancoApi) {
          console.log('❌ bancoApi es undefined');
          return;
        }
        
        console.log('📡 URL base:', bancoApi.defaults.baseURL);
        
        const response = await bancoApi.get('/');
        console.log('✅ CONEXIÓN EXITOSA:', response.data);
      } catch (error: any) {
        console.log('❌ FALLA EN CONEXIÓN:', error.message);
      } finally {
        setIsChecking(false);
      }
    };

    testConnection();
  }, []);

  if (isChecking) {
    return null;
  }

  return <Redirect href={'/auth/login'} />;
}

export default Index;