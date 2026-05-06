
"use client"; // REGLA 1: Necesario para usar hooks como useUser
import Image from "next/image";
import Link from 'next/link';
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext"; // REGLA 2: Importamos el motor de usuarios

export default function Home() {
  const { role } = useUser(); // REGLA 2: Extraemos el rol (Admin, Emprendedor, Lector)

  return (
    <div>
      <Header /> 

      {/* Banner Principal */}
      <div className="bg-red-800 text-white text-center p-8">
        <h1 className="text-4xl font-bold">MarkNova</h1>
        <p className="text-xl mt-2">Tu plataforma para crecer</p>
        <p className="mt-4">Conectamos emprendedores, clientes y oportunidades. Todo en un solo lugar.</p>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* REGLA 3: Ajustamos el grid para que soporte hasta 5 columnas si eres Admin */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          
          {/* Card de Catálogo */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border">
            <h2 className="text-2xl font-bold mb-2">&#x1F6D2; Catálogo</h2>
            <p className="mb-4">Explora productos y servicios de nuestros emprendedores.</p>
            <Link href="/catalog" className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition">
              Explorar
            </Link>
          </div>

          {/* Card de Noticias */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border">
            <h2 className="text-2xl font-bold mb-2">&#x1F4F0; Noticias</h2>
            <p className="mb-4">Mantente al día con las últimas novedades y eventos.</p>
            <Link href="/news" className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition">
              Leer más
            </Link>
          </div>

          {/* Card de Registro */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border">
            <h2 className="text-2xl font-bold mb-2">&#x1F4DD; Registro</h2>
            <p className="mb-4">Forma parte de nuestra comunidad de emprendedores.</p>
            <Link href="/register" className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition">
              Registrar
            </Link>
          </div>

          {/* Card de Soporte Técnico */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border">
            <h2 className="text-2xl font-bold mb-2">&#x1F6E0; Soporte</h2>
            <p className="mb-4">¿Necesitas ayuda? Contacta con nuestro equipo.</p>
            <Link href="/support" className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition">
              Contactar
            </Link>
          </div>

          {/* --- PASO 3: ESTA TARJETA ES EL SECRETO --- */}
          {/* Solo se renderiza si el usuario tiene el rol de Admin */}
          {role === 'Admin' && (
            <div className="bg-red-50 shadow-xl rounded-lg p-6 flex flex-col items-center text-center border-2 border-red-600">
              <h2 className="text-2xl font-bold mb-2 text-red-800">⚙️ Panel Admin</h2>
              <p className="mb-4 text-red-700 font-medium">Gestiona noticias y negocios pendientes.</p>
              <Link href="/admin" className="bg-red-800 text-white font-bold py-2 px-6 rounded-full hover:bg-black transition">
                Ir al Panel
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
