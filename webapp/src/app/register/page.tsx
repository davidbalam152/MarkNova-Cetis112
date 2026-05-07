
"use client";
import { useState } from 'react';
import { db } from '@/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function RegisterPage() {
  const { user, role, loading: userLoading } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombreNegocio: '',
    descripcion: '',
    categoria: 'Comida',
    contacto: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) {
      alert("Error: No se ha podido identificar al usuario.");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, "negocios"), {
        ...formData,
        ownerId: user.uid,
        status: 'pendiente',
        createdAt: serverTimestamp()
      });

      alert("¡Tu solicitud ha sido enviada! Un administrador la revisará pronto. Gracias por unirte.");
      router.push('/catalog');
    } catch (error) {
      console.error("Error al registrar el negocio:", error);
      alert("Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
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

  if (role !== 'Emprendedor' && role !== 'Admin') return (
    <main>
        <Header/>
        <div className="p-10 text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-yellow-600">Función no disponible para tu rol</h1>
            <p className="mt-2 text-gray-700">Actualmente solo los usuarios con rol de 'Emprendedor' pueden registrar un negocio.</p>
            <Link href="/catalog" className="mt-6 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition shadow-lg">
                Volver al Catálogo
            </Link>
        </div>
    </main>
  );

  return (
    <main>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Registra tu Emprendimiento</h1>
        <p className="text-center text-gray-600 mb-8">Completa el formulario para que tu negocio aparezca en el catálogo después de la aprobación de un administrador.</p>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-500">
          <div className="mb-5">
            <label className="block font-bold text-gray-700 mb-2">Nombre del Negocio</label>
            <input 
              type="text" 
              required
              value={formData.nombreNegocio}
              onChange={(e) => setFormData({...formData, nombreNegocio: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Ej. Delicias de la Abuela"
            />
          </div>
          <div className="mb-5">
            <label className="block font-bold text-gray-700 mb-2">Describe tu Producto o Servicio</label>
            <textarea 
              rows={4} 
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Ofrecemos postres caseros hechos con recetas tradicionales..."
            ></textarea>
          </div>
          <div className="mb-5">
              <label className="block font-bold text-gray-700 mb-2">Categoría</label>
              <select 
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option>Comida</option>
                <option>Servicios</option>
                <option>Artesanía</option>
                <option>Ropa</option>
                <option>Otro</option>
              </select>
            </div>
          <div className="mb-6">
            <label className="block font-bold text-gray-700 mb-2">Contacto (WhatsApp, Instagram, etc.)</label>
            <input 
              type="text" 
              required
              value={formData.contacto}
              onChange={(e) => setFormData({...formData, contacto: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="https://wa.me/521234567890 o @mi_tienda"
            />
            <p className="text-xs text-gray-500 mt-2">Asegúrate de que el link o usuario sea correcto para que puedan contactarte.</p>
          </div>
          <p className="text-center text-sm text-gray-600 mb-6 bg-yellow-50 border border-yellow-200 p-3 rounded-lg">Al enviar, tu negocio quedará en estado "pendiente" y no será visible hasta que un administrador lo apruebe.</p>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
          >
            {isSubmitting ? 'Enviando Solicitud...' : 'Enviar para Aprobación ($10)'}
          </button>
        </form>
      </div>
    </main>
  );
}
