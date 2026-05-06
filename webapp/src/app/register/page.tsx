
"use client"; // Importante para usar hooks
import { useState } from 'react';
import Link from 'next/link';
import { db } from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useUser } from '@/context/UserContext'; 
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { role, loading } = useUser();
  const router = useRouter();
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    category: 'Comida',
    contact: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Protección de ruta: Solo Emprendedor o Admin pueden entrar
  if (loading) return <div className="p-10 text-center">Verificando permisos...</div>;
  
  if (role !== 'Emprendedor' && role !== 'Admin') {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Acceso Restringido</h1>
        <p>Solo los usuarios con rol de <strong>Emprendedor</strong> pueden registrar negocios.</p>
        <Link href="/soporte" className="text-blue-600 underline mt-4 inline-block">Contacta a soporte para cambiar tu rol</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Guardamos en la colección "negocios" con status pendiente
      await addDoc(collection(db, "negocios"), {
        nombreNegocio: formData.businessName,
        descripcion: formData.description,
        categoria: formData.category,
        contacto: formData.contact, // Aquí se guarda el link o el número
        status: 'pendiente',
        createdAt: new Date(),
      });

      alert("¡Solicitud enviada con éxito! Queda pendiente de aprobación.");
      router.push('/catalog'); 
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un error al enviar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Inter', 'Roboto', sans-serif",
      backgroundColor: '#F4F6F8',
      color: '#1F2937',
      minHeight: '100vh',
    }}>
      <header style={{
        padding: '16px 24px',
        backgroundColor: '#991B1B',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" passHref>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'white', cursor: 'pointer' }}>MarkNova</h1>
        </Link>
      </header>

      <main style={{ padding: '48px 24px', maxWidth: '768px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', marginBottom: '16px', textAlign: 'center' }}>
          Registro de Emprendimientos
        </h2>
        <p style={{ fontSize: '16px', color: '#4B5563', textAlign: 'center', marginBottom: '32px' }}>
          Tu solicitud quedará como "pendiente" hasta que el administrador la apruebe.
        </p>

        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          padding: '32px',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Nombre del negocio</label>
            <input 
              type="text" 
              required
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Descripción</label>
            <textarea 
              rows={4} 
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              style={inputStyle}
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Categoría</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                style={inputStyle}
              >
                <option>Comida</option>
                <option>Servicios</option>
                <option>Artesanía</option>
                <option>Ropa</option>
                <option>Otro</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Costo</label>
              <input type="text" disabled placeholder="$10 MXN" style={{...inputStyle, backgroundColor: '#f1f1f1'}}/>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            {/* CAMBIO AQUÍ: Etiqueta y Placeholder mejorados */}
            <label style={{ display: 'block', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Contacto (WhatsApp o Link de Redes Sociales)</label>
            <input 
              type="text" 
              required
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
              placeholder="Ej: 529991234567 o https://instagram.com/tu_negocio"
              style={inputStyle}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{
              width: '100%',
              backgroundColor: isSubmitting ? '#9ca3af' : '#DC2626',
              color: 'white',
              borderRadius: '8px',
              padding: '16px 24px',
              fontWeight: '600',
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </form>

        <div style={{ marginTop: '48px', textAlign: 'center', padding: '24px', backgroundColor: '#FFFBEB', borderRadius: '12px', border: '1px solid #FEE2E2' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#B45309', marginBottom: '16px' }}>¿Necesitas ayuda?</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a href="https://wa.me/529992194923" target="_blank" style={{ backgroundColor: '#25D366', color: 'white', borderRadius: '8px', padding: '12px 24px', textDecoration: 'none' }}>WhatsApp Soporte</a>
          </div>
        </div>
      </main>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  backgroundColor: '#F9FAFB',
  borderColor: '#E5E7EB',
  borderWidth: '1px',
  borderRadius: '4px',
  padding: '16px',
  color: '#1F2937'
};
