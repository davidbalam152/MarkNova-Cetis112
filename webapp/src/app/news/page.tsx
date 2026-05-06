
"use client";
import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import Header from "@/components/Header";
import Link from 'next/link'; // Importado para el botón
import { useUser } from "@/context/UserContext"; // Importado para seguridad

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { role } = useUser(); // Obtenemos el rol del usuario actual

  useEffect(() => {
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

  if (loading) return <p className="p-10 text-center">Cargando noticias...</p>;

  return (
    <main>
      <Header />
      <div className="p-6 max-w-5xl mx-auto">
        
        {/* ENCABEZADO Y BOTÓN CONDICIONAL */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-red-800 pb-4">
          <h1 className="text-3xl font-bold text-red-800">
            Noticias CETIS 112
          </h1>

          {/* Esta es la regla mágica: Solo si eres Admin verás el botón */}
          {role === 'Admin' && (
            <Link 
              href="/admin/nueva-noticia" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-md"
            >
              + Redactar Nueva Noticia
            </Link>
          )}
        </div>
        
        {articles.length === 0 ? (
          <p className="text-gray-500 italic text-center py-10">No hay noticias publicadas todavía.</p>
        ) : (
          <div className="grid gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{article.content}</p>
                <p className="text-xs text-gray-400 mt-4 text-right italic">
                   Publicado el: {article.createdAt?.toDate().toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
