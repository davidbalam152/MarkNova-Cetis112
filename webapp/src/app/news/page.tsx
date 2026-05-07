
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
  const [dataLoading, setDataLoading] = useState(true);
  const { user, role, loading: userLoading } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);

  useEffect(() => {
    if (userLoading || !user) {
      setDataLoading(false);
      return;
    }

    const q = query(
      collection(db, "news"), 
      where("status", "==", "aprobado"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setDataLoading(false);
    });

    return () => unsubscribe();
  }, [user, userLoading]);

  useEffect(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchTerm, articles]);

  const handleEliminar = async (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta noticia permanentemente?");
    if (confirmar) {
      try {
        await deleteDoc(doc(db, "news", id));
      } catch (error) {
        console.error("Error al eliminar la noticia:", error);
        alert("Hubo un error al intentar eliminar la noticia.");
      }
    }
  };

  if (userLoading) return (
    <main className="p-10 text-center">
      <p className="text-red-800 font-bold">Verificando sesión...</p>
    </main>
  );

  if (!user) return (
    <main>
      <Header />
      <div className="p-10 text-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-red-600">Acceso Restringido</h1>
        <p className="mt-2 text-gray-700">Para proteger la información de nuestra comunidad, necesitas iniciar sesión para ver esta sección.</p>
        <Link href="/" className="mt-6 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-lg">
          Ir a Iniciar Sesión
        </Link>
      </div>
    </main>
  );
  
  if (dataLoading) return (
    <main>
      <Header />
      <div className="p-10 text-center">
          <p className="text-red-800 font-bold animate-pulse">Cargando noticias...</p>
      </div>
    </main>
  );

  return (
    <main>
      <Header />
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b-2 border-red-800 pb-4">
          <h1 className="text-3xl font-bold text-red-800">Noticias CETIS 112</h1>
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
            {filteredArticles.map((article) => {
              const isOwner = user && user.uid === article.ownerId;
              const isAdmin = role === 'Admin';
              return (
                <div key={article.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600 relative">
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {isOwner && (
                        <Link 
                          href={`/admin/edit-news/${article.id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-xs px-3 py-1 rounded-md transition shadow-sm"
                        >
                          Editar
                        </Link>
                      )}
                      <button 
                        onClick={() => handleEliminar(article.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-1 rounded-md transition shadow-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 pr-24">{article.title}</h2>
                  <p className="text-gray-700 whitespace-pre-wrap mb-4">{article.content}</p>
                  <div className="flex justify-between items-center mt-4 border-t pt-4">
                    <p className="text-xs text-gray-400 italic">
                      Publicado el: {article.createdAt?.toDate().toLocaleDateString()}
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
