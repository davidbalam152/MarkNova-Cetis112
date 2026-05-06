
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

interface UserContextType {
  user: FirebaseUser | null;
  role: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
      if (currentUser) {
        setUser(currentUser);
        try {
          // Buscamos tu documento en la carpeta 'users' usando tu ID único
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            // Leemos el rol que pusimos en el Paso 1
            const rolSucio = docSnap.data()?.role || "";
            
            // NORMALIZACIÓN: No importa si escribiste admin, ADMIN o Admin
            // el código lo va a convertir internamente en 'Admin'
            if (rolSucio.toLowerCase() === 'admin') {
              setRole('Admin'); // Este es el que usaremos en toda la app
            } else if (rolSucio.toLowerCase() === 'emprendedor') {
              setRole('Emprendedor');
            } else {
              setRole('Lector');
            }
          } else {
            setRole('Lector');
          }
        } catch (error) {
          console.error("Error al obtener el rol:", error);
          setRole(null);
        }
      }
}
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, role, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
};