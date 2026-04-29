"use client";
import Link from 'next/link';
import { useState, useMemo } from 'react';

// Placeholder data for news articles
const initialArticles = [
  {
    id: 1,
    title: 'Aviso Importante: Nuevas Políticas Escolares',
    summary: 'Se han implementado nuevas políticas en el CETIS 112. Asegúrate de leerlas para estar al día.',
  },
  {
    id: 2,
    title: 'Consejos para Emprendedores: Cómo Mejorar tus Ventas',
    summary: 'Descubre estrategias efectivas para aumentar tus ventas y hacer crecer tu negocio.',
  },
  {
    id: 3,
    title: 'Noticia: Evento de Emprendimiento la Próxima Semana',
    summary: 'No te pierdas el gran evento de emprendimiento que se celebrará en nuestras instalaciones.',
  },
];

export default function NewsPage() {
  const [articles, setArticles] = useState(initialArticles);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePublish = () => {
    if (newTitle.trim() && newSummary.trim()) {
      const newArticle = {
        id: articles.length + 1,
        title: newTitle,
        summary: newSummary,
      };
      setArticles([newArticle, ...articles]);
      setNewTitle('');
      setNewSummary('');
      setShowForm(false);
    }
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

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
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Revista / Noticias
        </h2>

        {/* Search Bar */}
        <div style={{ marginBottom: '32px' }}>
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              fontSize: '16px',
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px'
        }}>
          {filteredArticles.map((article) => (
            <div key={article.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              padding: '24px',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>
                {article.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#4B5563',
                marginBottom: '16px'
              }}>
                {article.summary}
              </p>
              <button style={{
                backgroundColor: 'transparent',
                color: '#DC2626',
                border: 'none',
                padding: 0,
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Leer más
              </button>
            </div>
          ))}
        </div>

        {/* Allow users to post */}
        <div style={{
          marginTop: '48px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px'
          }}>
            ¿Tienes algo que compartir?
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#4B5563',
            marginBottom: '24px'
          }}>
            Cualquier usuario puede publicar un aviso o noticia. No se requiere aprobación previa.
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              backgroundColor: '#DC2626',
              color: 'white',
              borderRadius: '8px',
              padding: '8px 24px',
              textAlign: 'center',
              fontWeight: '600',
              letterSpacing: '0.5px',
              border: 'none',
              cursor: 'pointer'
            }}>
            {showForm ? 'Cancelar' : 'Publicar ahora'}
          </button>
        </div>

        {showForm && (
          <div style={{
            marginTop: '32px',
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          }}>
            <input
              type="text"
              placeholder="Título de la noticia"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '4px',
                border: '1px solid #E5E7EB',
              }}
            />
            <textarea
              placeholder="Resumen de la noticia"
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '4px',
                border: '1px solid #E5E7EB',
                minHeight: '100px',
              }}
            />
            <button
              onClick={handlePublish}
              style={{
                backgroundColor: '#16A34A',
                color: 'white',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}>
              Publicar Noticia
            </button>
          </div>
        )}

        {/* Technical Support */}
        <div style={{
          marginTop: '48px',
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Soporte Técnico
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#4B5563',
            marginBottom: '24px'
          }}>
            ¿Necesitas ayuda? Contáctanos por WhatsApp o correo electrónico.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a href="https://wa.me/529992194923" target="_blank" rel="noopener noreferrer" style={{
              backgroundColor: '#25D366',
              color: 'white',
              borderRadius: '8px',
              padding: '12px 24px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              WhatsApp
            </a>
            <a href="mailto:ed.balamta@cetis112.edu.mx" style={{
              backgroundColor: '#EA4335',
              color: 'white',
              borderRadius: '8px',
              padding: '12px 24px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Correo Electrónico
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}