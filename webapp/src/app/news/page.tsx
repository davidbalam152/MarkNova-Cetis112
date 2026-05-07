"use client";

import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  doc, 
  deleteDoc 
} from 'firebase/firestore';
import Header from "@/components/Header";
import Link from 'next/link';
import { useUser } from "@/context/UserContext";

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);

  useEffect(() => {
    // Escuchar noticias aprobadas en tiempo real
    const q = query(
      collection(db, "news"), 
      where("status", "==", "aprobado"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchTerm, articles]);

  // Función para eliminar directamente de la base de datos
  const handleEliminar = async (id: string) => {
    // Usamos window.confirm explícitamente para asegurar que el navegador lo muestre
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta noticia permanentemente de la base de datos?");
    
    if (confirmar) {
      try {
        console.log("Eliminando documento con ID:", id);
        await deleteDoc(doc(db, "news", id));
        // No hace falta alert, la noticia desaparece sola por el onSnapshot
      } catch (error) {
        console.error("Error al eliminar la noticia:", error);
        alert("Hubo un error al intentar eliminar la noticia. Revisa los permisos.");
      }
    }
  };

  if (loading) return (
    <main className="p-10 text-center">
      <p className="text-red-800 font-bold animate-pulse">Cargando noticias...</p>
    </main>
  );

  return (
    <main>
      <Header />
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b-2 border-red-800 pb-4">
          <h1 className="text-3xl font-bold text-red-800">Noticias CETIS 112</h1>

          {/* Botón de redactar solo para Administradores */}
          {role === 'Admin' && (
            <Link 
              href="/admin/nueva-noticia" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-md"
            >
              + Redactar Nueva Noticia
            </Link>
          )}
        </div>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar por palabra clave..."
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredArticles.length === 0 ? (
          <p className="text-gray-500 italic text-center py-10">No hay noticias que coincidan con tu búsqueda.</p>
        ) : (
          <div className="grid gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600 relative">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-gray-700 whitespace-pre-wrap mb-4">{article.content}</p>
                
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                  <p className="text-xs text-gray-400 italic">
                    Publicado el: {article.createdAt?.toDate().toLocaleDateString()}
                  </p>

                  {/* Botón de eliminación definitiva solo para Admin */}
                  {role === 'Admin' && (
                    <button 
                      onClick={() => handleEliminar(article.id)}
                      className="bg-red-600 hover:bg-red-800 text-white font-bold text-xs px-4 py-2 rounded-md transition shadow-md"
                    >
                      ELIMINAR DE BASE DE DATOS
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
