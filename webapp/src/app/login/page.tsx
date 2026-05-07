
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateDomain = (email: string) => {
    return email.endsWith('@cetis112.edu.mx');
  };

  const handleAuthAction = async (action: 'register' | 'login') => {
    if (!validateDomain(email)) {
      setError('Error: Solo se permiten correos del dominio @cetis112.edu.mx');
      return;
    }
    setError(null);
    try {
      if (action === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Creamos un documento en Firestore para el nuevo usuario
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          role: 'Lector' // Rol por defecto
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/'); // Redirige a la página de inicio tras el éxito
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión o Registrarse</h1>
        {error && <p className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</p>}
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@cetis112.edu.mx"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-2 mb-6 border rounded"
        />
        
        <div className="flex flex-col space-y-2">
            <button onClick={() => handleAuthAction('login')} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Iniciar Sesión
            </button>
            <button onClick={() => handleAuthAction('register')} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
              Registrarse
            </button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
