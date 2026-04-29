
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{
      fontFamily: "'Inter', 'Roboto', sans-serif",
      backgroundColor: '#F4F6F8',
      color: '#1F2937',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '48px',
    }}>
      <header style={{
        width: '100%',
        padding: '16px 24px',
        backgroundColor: '#991B1B',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        position: 'absolute',
        top: 0,
        left: 0
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          lineHeight: '1.2',
          color: 'white'
        }}>MarkNova</h1>
        <p style={{
            fontSize: '18px',
            fontWeight: '500',
            lineHeight: '1.4',
            color: 'white',
            margin: '8px 0 0 0'
          }}>
            Tu plataforma para crecer
        </p>
         <p style={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '1.5',
            color: 'white',
            margin: '4px 0 0 0'
          }}>
            Conectamos emprendedores, clientes y oportunidades. Todo en un solo lugar.
          </p>
      </header>

      <main style={{
        maxWidth: '768px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        paddingTop: '100px'
      }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px'
        }}>
          {/* Card del Catálogo */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            padding: '24px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '1.4',
              color: '#111827',
              marginBottom: '8px'
            }}>
              🛒 Catálogo de emprendimientos
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '1.5',
              color: '#4B5563',
              marginBottom: '16px'
            }}>
              Explora, busca y encuentra los mejores productos y servicios de nuestros emprendedores.
            </p>
            <Link href="/catalog" passHref>
              <button style={{
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
                Ahí vamos
              </button>
            </Link>
          </div>

          {/* Card de Noticias */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            padding: '24px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '1.4',
              color: '#111827',
              marginBottom: '8px'
            }}>
              📰 Revista / Noticias
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '1.5',
              color: '#4B5563',
              marginBottom: '16px'
            }}>
              Entérate de las últimas noticias, avisos importantes y consejos para tu negocio.
            </p>
            <Link href="/news" passHref>
              <button style={{
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
                Entérate
              </button>
            </Link>
          </div>

          {/* Card de Registro */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            padding: '24px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '1.4',
              color: '#111827',
              marginBottom: '8px'
            }}>
              📝 Registro de emprendimientos
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '1.5',
              color: '#4B5563',
              marginBottom: '16px'
            }}>
              ¿Tienes un negocio? Regístralo para que aparezca en nuestro catálogo.
            </p>
            <Link href="/register" passHref>
              <button style={{
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
                Vamos
              </button>
            </Link>
          </div>

          {/* Card de Soporte Técnico */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            padding: '24px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '1.4',
              color: '#111827',
              marginBottom: '8px'
            }}>
              🛠️ Soporte Técnico
            </h3>
            <p style={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '1.5',
              color: '#4B5563',
              marginBottom: '16px'
            }}>
              ¿Necesitas ayuda? Contáctanos para resolver cualquier duda o problema.
            </p>
            <Link href="/support" passHref>
              <button style={{
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
                Contactar
              </button>
            </Link>
          </div>
        </div>
      </main>

      <footer style={{
        width: '100%',
        padding: '24px',
        marginTop: '48px',
        textAlign: 'center',
        color: '#4B5563',
        fontSize: '14px'
      }}>
        <p>MarkNova © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
