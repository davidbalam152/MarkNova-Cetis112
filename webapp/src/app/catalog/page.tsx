"use client";
import Link from 'next/link';
import { useState, useMemo } from 'react';

// Placeholder data for businesses
const businesses = [
  {
    id: 1,
    name: 'Negocio de Ejemplo 1',
    description: 'Esta es una breve descripción del primer negocio. Ofrecemos productos de alta calidad.',
    image: 'https://via.placeholder.com/300x200',
    category: 'Comida',
  },
  {
    id: 2,
    name: 'Negocio de Ejemplo 2',
    description: 'Servicios profesionales para tus necesidades. Contacta con nosotros para más información.',
    image: 'https://via.placeholder.com/300x200',
    category: 'Servicios',
  },
  {
    id: 3,
    name: 'Negocio de Ejemplo 3',
    description: 'Artículos únicos y hechos a mano. El regalo perfecto para cualquier ocasión.',
    image: 'https://via.placeholder.com/300x200',
    category: 'Artesanía',
  },
];

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const searchTermLower = searchTerm.toLowerCase();
      const categoryMatch = selectedCategory ? business.category === selectedCategory : true;
      const searchMatch = business.name.toLowerCase().includes(searchTermLower);
      return categoryMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div style={{
      fontFamily: "\'Inter\', \'Roboto\', sans-serif",
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
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'white',
            cursor: 'pointer'
          }}>MarkNova</h1>
        </Link>
      </header>

      <main style={{
        padding: '48px 24px',
        maxWidth: '768px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Catálogo de Negocios
        </h2>

        {/* Search and Filters */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flexGrow: 1,
              backgroundColor: 'white',
              borderColor: '#E5E7EB',
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '16px',
              color: '#1F2937',
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              backgroundColor: 'white',
              borderColor: '#E5E7EB',
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '16px',
              color: '#1F2937',
            }}>
            <option value="">Categoría</option>
            <option value="Comida">Comida</option>
            <option value="Servicios">Servicios</option>
            <option value="Artesanía">Artesanía</option>
          </select>
        </div>

        {/* Business Listings */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px'
        }}>
          {filteredBusinesses.map((business) => (
            <div key={business.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              overflow: 'hidden'
            }}>
              <img src={business.image} alt={business.name} style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover'
              }}/>
              <div style={{ padding: '16px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  {business.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#4B5563',
                  marginBottom: '16px'
                }}>
                  {business.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center'
                }}>
                  <div>
                    <button style={{
                      backgroundColor: 'transparent',
                      color: '#DC2626',
                      border: '1px solid #DC2626',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      marginRight: '8px',
                      cursor: 'pointer'
                    }}>
                      Ver más
                    </button>
                    <a href="https://wa.me/529992194923" target="_blank" rel="noopener noreferrer" style={{
                      backgroundColor: '#25D366',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      textDecoration: 'none'
                    }}>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}