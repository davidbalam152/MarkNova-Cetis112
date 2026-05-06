
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useUser } from "@/context/UserContext"; 
import Header from "@/components/Header";

export default function CatalogPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useUser();

  useEffect(() => {
    const q = query(
      collection(db, "negocios"), 
      where("status", "==", "aprobado")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBusinesses(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="p-10 text-center text-red-800 font-bold">Cargando catálogo...</p>;

  return (
    <main>
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b-2 border-red-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Catálogo de Emprendedores</h1>
            <p className="text-gray-600">Apoya el talento local de nuestra comunidad.</p>
          </div>

          {(role === 'Emprendedor' || role === 'Admin') && (
            <Link 
              href="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg"
            >
              + Registrar mi Negocio ($10)
            </Link>
          )}
        </div>

        {businesses.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-gray-500 italic text-lg">Aún no hay emprendimientos aprobados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.map((biz) => {
              const contacto = biz.contacto || "";
              
              // DETECCIÓN: ¿Es un link o un número?
              const esLink = contacto.toLowerCase().startsWith('http');
              
              // Lógica de limpieza para WhatsApp (si no es link)
              const soloNumeros = contacto.replace(/\D/g, '');
              const numeroFinal = soloNumeros.length === 10 ? `52${soloNumeros}` : soloNumeros;

              return (
                <div key={biz.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-red-800">{biz.nombreNegocio}</h3>
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {biz.categoria}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 flex-grow">{biz.descripcion}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">
                      {esLink ? 'Redes Sociales' : 'Contacto Directo'}
                    </p>
                    
                    {esLink ? (
                      // BOTÓN PARA LINKS (Instagram, Facebook, Web)
                      <a 
                        href={contacto} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-bold transition shadow-sm"
                      >
                        🌐 Ver Perfil
                      </a>
                    ) : (
                      // BOTÓN PARA WHATSAPP
                      <a 
                        href={`https://wa.me/${numeroFinal}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-bold transition shadow-sm"
                      >
                        <span className="text-xl">💬</span> WhatsApp
                      </a>
                    )}
                    <p className="text-center text-[10px] text-gray-400 mt-2 truncate">
                      {contacto}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
