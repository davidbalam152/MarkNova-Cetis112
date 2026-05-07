
'use client';

import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { auth } from '@/firebase/config';

const Header = () => {
  // Corregido: Obtenemos 'role' del contexto
  const { user, role, loading } = useUser();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Forzar la recarga de la página para limpiar el estado
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="bg-red-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link href="/">MarkNova</Link>
        </div>

        <nav className="flex items-center space-x-6">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* Corregido: Usamos la variable 'role' directamente */}
                  {role === 'Admin' && (
                    <Link href="/admin" className="font-semibold hover:text-red-200">
                      Admin
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">
                  Iniciar Sesión
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
