
import Link from 'next/link';

export default function RegisterPage() {
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
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          Registro de Emprendimientos y Soporte
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#4B5563',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          Completa el formulario para registrar tu negocio. Una vez enviado, tu solicitud quedará como "pendiente" hasta que se verifique el pago de $10.
        </p>

        <form style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          padding: '32px',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="businessName" style={{
              display: 'block',
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>Nombre del negocio</label>
            <input type="text" id="businessName" style={{
              width: '100%',
              backgroundColor: '#F9FAFB',
              borderColor: '#E5E7EB',
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '16px',
              color: '#1F2937'
            }}/>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="description" style={{
              display: 'block',
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>Descripción</label>
            <textarea id="description" rows={4} style={{
              width: '100%',
              backgroundColor: '#F9FAFB',
              borderColor: '#E5E7EB',
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '16px',
              color: '#1F2937'
            }}></textarea>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="category" style={{
                display: 'block',
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>Categoría</label>
              <select id="category" style={{
                width: '100%',
                backgroundColor: '#F9FAFB',
                borderColor: '#E5E7EB',
                borderWidth: '1px',
                borderRadius: '4px',
                padding: '16px',
                color: '#1F2937'
              }}>
                <option>Comida</option>
                <option>Servicios</option>
                <option>Artesanía</option>
                <option>Ropa</option>
                <option>Otro</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="price" style={{
                display: 'block',
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px'
              }}>Precio</label>
              <input type="text" id="price" placeholder="$10" style={{
                width: '100%',
                backgroundColor: '#F9FAFB',
                borderColor: '#E5E7EB',
                borderWidth: '1px',
                borderRadius: '4px',
                padding: '16px',
                color: '#1F2937'
              }}/>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label htmlFor="contact" style={{
              display: 'block',
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>Contacto (WhatsApp / IG)</label>
            <input type="text" id="contact" style={{
              width: '100%',
              backgroundColor: '#F9FAFB',
              borderColor: '#E5E7EB',
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '16px',
              color: '#1F2937'
            }}/>
          </div>

          <button type="submit" style={{
            width: '100%',
            backgroundColor: '#DC2626',
            color: 'white',
            borderRadius: '8px',
            padding: '16px 24px',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: '0.5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px'
          }}>
            Enviar Solicitud
          </button>
        </form>

        <div style={{
          marginTop: '48px',
          textAlign: 'center',
          padding: '24px',
          backgroundColor: '#FFFBEB',
          borderRadius: '12px',
          border: '1px solid #FEE2E2'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#B45309',
            marginBottom: '16px'
          }}>
            ¿Necesitas ayuda?
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#4B5563',
            marginBottom: '24px'
          }}>
            Si tienes dudas sobre el registro, cómo mejorar tu negocio o necesitas soporte técnico, estamos aquí para ayudarte.
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
              Contáctanos
            </a>
            <a href="mailto:ed.balamtamayo@cetis112.edu.mx" style={{
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              borderRadius: '8px',
              padding: '12px 24px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Soporte Técnico
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
