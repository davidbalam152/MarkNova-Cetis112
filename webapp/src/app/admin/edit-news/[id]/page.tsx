
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useUser } from "@/context/UserContext";

export default function EditNewsPage() {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const newsId = params.id as string;
  const { user, role } = useUser();

  useEffect(() => {
    if (!user || !newsId) return;

    const fetchNewsData = async () => {
      const newsDocRef = doc(db, "news", newsId);
      const newsDocSnap = await getDoc(newsDocRef);

      if (newsDocSnap.exists()) {
        const newsData = newsDocSnap.data();
        
        // Security Check: Only the owner Admin can edit.
        if (role === 'Admin' && user.uid === newsData.ownerId) {
          setFormData({
            title: newsData.title,
            summary: newsData.summary,
            content: newsData.content,
          });
        } else {
          alert("No tienes permiso para editar esta noticia. Solo el administrador que la creó puede hacerlo.");
          router.push('/admin');
        }
      } else {
        alert("La noticia que intentas editar no existe.");
        router.push('/admin');
      }
      setIsLoading(false);
    };

    fetchNewsData();

  }, [user, role, newsId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newsDocRef = doc(db, "news", newsId);
      await updateDoc(newsDocRef, {
        ...formData,
        status: 'pendiente', // Set status back to pending for re-approval
      });
      alert("Noticia actualizada con éxito. Quedará pendiente de aprobación.");
      router.push('/admin');
    } catch (error) {
      console.error("Error al actualizar la noticia:", error);
      alert("Hubo un error al actualizar la noticia. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-center p-12">Cargando datos de la noticia...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md border border-red-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-red-800">Editar Noticia</h1>
            <Link 
              href="/admin" 
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              &larr; Volver al Panel
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                Resumen
              </label>
              <input
                id="summary"
                type="text"
                required
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Contenido
              </label>
              <textarea
                id="content"
                required
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 outline-none"
              />
            </div>
            
            <p className="text-xs text-gray-500 text-center">Al guardar los cambios, la noticia volverá a estar pendiente de aprobación y se ocultará de la página principal.</p>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md text-white font-bold transition-colors ${
                isSubmitting ? 'bg-yellow-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios y Enviar a Aprobación'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
