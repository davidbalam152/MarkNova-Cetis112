
"use client";
import Link from 'next/link';
import { useState, FormEvent } from 'react';

export default function SupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !problem) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    alert('A continuación, se abrirá tu aplicación de correo electrónico para que puedas enviar el reporte. Por favor, asegúrate de tener una aplicación de correo configurada en tu dispositivo.');

    const subject = `Reporte de Soporte Técnico de ${name}`;
    const body = `Nombre: ${name}\nCorreo Electrónico: ${email}\n\nProblema:\n${problem}`;
    window.location.href = `mailto:ed.balamtamayo@cetis112.edu.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
          Soporte Técnico
        </h2>

        {/* WhatsApp Contact */}
        <div style={{
          marginBottom: '32px',
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
            Contactar por WhatsApp
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#4B5563',
            marginBottom: '24px'
          }}>
            Para obtener ayuda inmediata, envíanos un mensaje por WhatsApp.
          </p>
          <a
            href="https://wa.me/529992194923"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              borderRadius: '8px',
              padding: '12px 24px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            Enviar Mensaje
          </a>
        </div>

        {/* Email Form */}
        <div style={{
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            O envíanos un correo
          </h3>
          <form onSubmit={handleEmailSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="name" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>Nombre</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #E5E7EB',
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="email" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #E5E7EB',
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="problem" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>Problema</label>
              <textarea
                id="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #E5E7EB',
                  minHeight: '120px',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#DC2626',
                color: 'white',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Enviar Reporte
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
