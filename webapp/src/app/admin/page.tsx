"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || role !== "admin") {
        router.push("/");
      }
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <main className="p-12 text-center">
        <p>Verificando acceso...</p>
      </main>
    );
  }

  if (role === "admin") {
    return (
      <main className="p-12 max-w-5xl mx-auto">
        <div className="border-2 border-red-600 bg-red-50 rounded-xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-red-900 text-center mb-8">
            Panel de Administración
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sección de Contenido Pendiente */}
            <div className="border border-red-400 rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-red-700 mb-4">
                Contenido Pendiente
              </h2>
              <p className="text-gray-600 mb-6">
                Aquí aparecerán las noticias y emprendimientos esperando tu aprobación para ser publicados.
              </p>
              
              <Link 
                href="/admin/nueva-noticia" 
                className="inline-block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition mb-6"
              >
                Redactar Nueva Noticia
              </Link>

              <div className="border-t border-red-100 pt-4">
                <p className="italic text-gray-400">No hay contenido pendiente por ahora.</p>
              </div>
            </div>

            {/* Sección de Gestión de Usuarios */}
            <div className="border border-red-400 rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-red-700 mb-4">
                Gestión de Usuarios
              </h2>
              <p className="text-gray-600 mb-6">
                Aquí podrás ver y modificar los roles de los usuarios registrados en la plataforma.
              </p>
              <div className="border-t border-red-100 pt-4">
                <p className="italic text-gray-400">La gestión de usuarios se implementará pronto.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return null;
}