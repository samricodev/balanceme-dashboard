import { Navbar } from '../navbar/Navbar';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido a BalanceMe</h1>
        <p className="text-gray-600">Aquí puedes gestionar tus finanzas personales de manera eficiente.</p>
        {/* Contenido adicional del dashboard puede ir aquí */}
      </main>
    </div>
  );
};