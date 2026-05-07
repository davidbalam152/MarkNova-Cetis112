
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/firebase/config';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useUser } from "@/context/UserContext"; 
import Header from "@/components/Header";
import { useRouter } from 'next/navigation';

interface Business {
  id: string;
  nombreNegocio: string;
  descripcion: string;
  categoria: string;
  contacto: string;
  ownerId: string;
}

export default function CatalogPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const { user, role, loading: userLoading } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (userLoading || !user) {
      setDataLoading(false);
      return;
    }

    const q = query(
      collection(db, "negocios"), 
      where("status", "==", "aprobado")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Business[];
      
      setBusinesses(docs);
      
      const uniqueCategories = [...new Set(docs.map(doc => doc.categoria))].filter(Boolean);
      setCategories(['all', ...uniqueCategories]);
      
      setDataLoading(false);
    });

    return () => unsubscribe();
  }, [user, userLoading]);

  useEffect(() => {
    let filtered = businesses;

    if (searchTerm) {
      filtered = filtered.filter(biz =>
        biz.nombreNegocio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (biz.descripcion && biz.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(biz => biz.categoria === selectedCategory);
    }

    setFilteredBusinesses(filtered);
  }, [searchTerm, selectedCategory, businesses]);

  const handleDelete = async (businessId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este negocio? Esta acción es permanente.")) {
      try {
        await deleteDoc(doc(db, "negocios", businessId));
        alert("Negocio eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el negocio:", error);
        alert("Hubo un error al eliminar el negocio.");
      }
    }
  };

  const handleEdit = (businessId: string) => {
    router.push(`/edit/${businessId}`);
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
      <p className="p-10 text-center text-red-800 font-bold animate-pulse">Cargando catálogo...</p>
    </main>
  );

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

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por palabra clave..."
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {categories.map((cat) => (
              cat !== 'all' && <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-gray-500 italic text-lg">No se encontraron emprendimientos con los filtros actuales.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((biz) => {
              const contacto = biz.contacto || "";
              const esLink = contacto.toLowerCase().startsWith('http');
              const soloNumeros = contacto.replace(/\D/g, '');
              const numeroFinal = soloNumeros.length === 10 ? `52${soloNumeros}` : soloNumeros;
              
              const isOwner = user && user.uid === biz.ownerId;
              const isAdmin = role === 'Admin';
              const isEmprendedor = role === 'Emprendedor';

              const canEdit = isOwner && isEmprendedor;
              const canDelete = (isOwner && isEmprendedor) || isAdmin;

              return (
                <div key={biz.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-red-800">{biz.nombreNegocio}</h3>
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                      {biz.categoria}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 flex-grow">{biz.descripcion}</p>

                  {(canEdit || canDelete) && (
                    <div className="flex gap-2 mb-4 border-t pt-4">
                      {canEdit && (
                        <button 
                          onClick={() => handleEdit(biz.id)}
                          className="flex-1 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 text-sm font-semibold"
                        >
                          Editar
                        </button>
                      )}
                      {canDelete && (
                        <button 
                          onClick={() => handleDelete(biz.id)}
                          className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700 text-sm font-semibold"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">
                      {esLink ? 'Redes Sociales' : 'Contacto Directo'}
                    </p>
                    
                    {esLink ? (
                      <a 
                        href={contacto} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-bold transition shadow-sm"
                      >
                        🌐 Ver Perfil
                      </a>
                    ) : (
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
