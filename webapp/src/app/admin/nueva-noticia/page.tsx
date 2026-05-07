
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from "@/context/UserContext"; // 1. Importar useUser

export default function NuevaNoticiaPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useUser(); // 2. Obtener el usuario del contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) { // Pequeña guarda de seguridad
      alert("No se pudo verificar tu identidad. Por favor, inicia sesión de nuevo.");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'news'), {
        title,
        summary,
        content,
        status: 'pendiente',
        createdAt: serverTimestamp(),
        ownerId: user.uid, // 3. Añadir el ownerId al documento
      });
      router.push('/admin');
    } catch (error) {
      console.error("Error al guardar la noticia:", error);
      alert("Error al guardar la noticia. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md border border-red-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-red-800">Redactar Nueva Noticia</h1>
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
                Título de la Noticia
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 outline-none"
                placeholder="Ej. Gran éxito en la feria de emprendimiento"
              />
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                Resumen Corto
              </label>
              <input
                id="summary"
                type="text"
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 outline-none"
                placeholder="Breve descripción para la vista previa"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Contenido de la Noticia
              </label>
              <textarea
                id="content"
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 outline-none"
                placeholder="Escribe aquí el desarrollo de la noticia..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md text-white font-bold transition-colors ${
                isSubmitting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isSubmitting ? 'Guardando...' : 'Enviar para Aprobación'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}