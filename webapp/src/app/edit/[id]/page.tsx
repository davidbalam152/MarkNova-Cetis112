"use client";
import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useUser } from '@/context/UserContext';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';

export default function EditPage() {
  const { user, role, loading } = useUser();
  const router = useRouter();
  const params = useParams();
  const businessId = params.id as string;

  const [formData, setFormData] = useState({
    nombreNegocio: '',
    descripcion: '',
    categoria: 'Comida',
    contacto: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!businessId) return;

    const fetchBusinessData = async () => {
      const docRef = doc(db, "negocios", businessId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Security check: only owner or admin can edit
        if (user && (data.ownerId === user.uid || role === 'Admin')) {
          setFormData({
            nombreNegocio: data.nombreNegocio,
            descripcion: data.descripcion,
            categoria: data.categoria,
            contacto: data.contacto
          });
        } else {
          alert("No tienes permiso para editar este negocio.");
          router.push('/catalog');
        }
      } else {
        alert("Este negocio no existe.");
        router.push('/catalog');
      }
      setIsLoadingData(false);
    };

    if (user) { // Fetch data only when user context is loaded
        fetchBusinessData();
    }

  }, [businessId, user, role, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const docRef = doc(db, "negocios", businessId);
      await updateDoc(docRef, {
        ...formData,
        status: 'pendiente' // Set status to pending for re-approval
      });

      alert("Negocio actualizado con éxito. Quedará pendiente de aprobación.");
      router.push('/catalog'); 
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un error al actualizar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoadingData || loading) return <p className="p-10 text-center">Cargando datos del negocio...</p>

  return (
    <main>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Editar Negocio</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block font-bold mb-2">Nombre del Negocio</label>
            <input 
              type="text" 
              required
              value={formData.nombreNegocio}
              onChange={(e) => setFormData({...formData, nombreNegocio: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Descripción</label>
            <textarea 
              rows={4} 
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
              <label className="block font-bold mb-2">Categoría</label>
              <select 
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option>Comida</option>
                <option>Servicios</option>
                <option>Artesanía</option>
                <option>Ropa</option>
                <option>Otro</option>
              </select>
            </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Contacto (WhatsApp o Link)</label>
            <input 
              type="text" 
              required
              value={formData.contacto}
              onChange={(e) => setFormData({...formData, contacto: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <p className="text-sm text-gray-600 mb-6">Al editar, tu negocio volverá a estar en estado "pendiente" y no será visible hasta que un administrador lo apruebe de nuevo.</p>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition disabled:bg-gray-400"
          >
            {isSubmitting ? 'Guardando Cambios...' : 'Guardar y Enviar para Aprobación'}
          </button>
        </form>
      </div>
    </main>
  );
}
