
"use client";
import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { useUser } from '@/context/UserContext';

export default function AdminPanel() {
  const { role, loading } = useUser();
  const [activeTab, setActiveTab] = useState<'noticias' | 'negocios'>('noticias');
  const [pendingNews, setPendingNews] = useState<any[]>([]);
  const [pendingBusinesses, setPendingBusinesses] = useState<any[]>([]);

  // 1. Escuchar datos pendientes en tiempo real
  useEffect(() => {
    if (role !== 'Admin') return;

    // Escuchar Noticias (Colección 'news')
    const qNews = query(collection(db, "news"), where("status", "==", "pendiente"));
    const unsubNews = onSnapshot(qNews, (snapshot) => {
      setPendingNews(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Escuchar Negocios (Colección 'negocios')
    const qBiz = query(collection(db, "negocios"), where("status", "==", "pendiente"));
    const unsubBiz = onSnapshot(qBiz, (snapshot) => {
      setPendingBusinesses(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubNews(); unsubBiz(); };
  }, [role]);

  // 2. Función para APROBAR (Cambia status a 'aprobado')
  const handleApprove = async (collectionName: string, id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { status: 'aprobado' });
      alert("Contenido aprobado. Ahora es visible en el sitio.");
    } catch (error) {
      console.error("Error al aprobar:", error);
    }
  };

  // 3. Función para ELIMINAR (Borra de la base de datos)
  const handleDelete = async (collectionName: string, id: string) => {
    if (confirm("¿Estás seguro de eliminar este registro permanentemente?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (role !== 'Admin') return <div className="p-10 text-center text-red-600 font-bold">Acceso Denegado.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Moderación</h1>
      
      {/* Pestañas de Navegación */}
      <div className="flex gap-4 mb-8 border-b">
        <button 
          onClick={() => setActiveTab('noticias')}
          className={`pb-2 px-4 font-bold transition-all ${activeTab === 'noticias' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-400'}`}
        >
          Noticias ({pendingNews.length})
        </button>
        <button 
          onClick={() => setActiveTab('negocios')}
          className={`pb-2 px-4 font-bold transition-all ${activeTab === 'negocios' ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-400'}`}
        >
          Emprendimientos ({pendingBusinesses.length})
        </button>
      </div>

      {/* Contenido Dinámico */}
      <div className="space-y-4">
        {activeTab === 'noticias' ? (
          pendingNews.length === 0 ? <p className="text-gray-500 italic">No hay noticias pendientes.</p> :
          pendingNews.map(n => (
            <div key={n.id} className="bg-white p-6 rounded-xl border shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl">{n.title}</h3>
                <p className="text-gray-600">{n.summary || n.content?.substring(0, 100)}...</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleApprove('news', n.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">Aprobar</button>
                <button onClick={() => handleDelete('news', n.id)} className="bg-gray-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50">Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          pendingBusinesses.length === 0 ? <p className="text-gray-500 italic">No hay negocios pendientes.</p> :
          pendingBusinesses.map(b => (
            <div key={b.id} className="bg-white p-6 rounded-xl border shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl">{b.nombreNegocio}</h3>
                <p className="text-gray-600">{b.categoria} — {b.contacto}</p>
                <p className="text-sm text-gray-500 mt-1">{b.descripcion}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleApprove('negocios', b.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">Aprobar</button>
                <button onClick={() => handleDelete('negocios', b.id)} className="bg-gray-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50">Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
