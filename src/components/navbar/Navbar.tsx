import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Wallet,
  Repeat,
  Tags,
  User,
  LogOut,
} from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/dashboard"
              className="text-xl font-bold text-gray-800"
            >
              BalanceMe
            </NavLink>
          </div>

          {/* Botón hamburguesa en móvil */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Links en desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <NavLink
                to="/cuentas"
                className="flex items-center gap-2 text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Wallet size={18} /> Cuentas
              </NavLink>
              <NavLink
                to="/movimientos"
                className="flex items-center gap-2 text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Repeat size={18} /> Movimientos
              </NavLink>
              <NavLink
                to="/categorias"
                className="flex items-center gap-2 text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Tags size={18} /> Categorías
              </NavLink>
              <NavLink
                to="/perfil"
                className="flex items-center gap-2 text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <User size={18} /> Perfil
              </NavLink>
              <NavLink
                to="/"
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut size={18} /> Cerrar sesión
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm animate-fade-in flex flex-col items-end">
          <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl m-4 p-6 space-y-4 animate-modal-pop">
            <NavLink
              to="/cuentas"
              className="flex items-center gap-4 bg-gray-50 hover:bg-indigo-50 px-4 py-3 rounded-xl text-gray-800 hover:text-indigo-700 font-semibold text-lg transition-all duration-200 shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              <Wallet size={18} /> Cuentas
            </NavLink>
            <NavLink
              to="/movimientos"
              className="flex items-center gap-4 bg-gray-50 hover:bg-indigo-50 px-4 py-3 rounded-xl text-gray-800 hover:text-indigo-700 font-semibold text-lg transition-all duration-200 shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              <Repeat size={18} /> Movimientos
            </NavLink>
            <NavLink
              to="/categorias"
              className="flex items-center gap-4 bg-gray-50 hover:bg-indigo-50 px-4 py-3 rounded-xl text-gray-800 hover:text-indigo-700 font-semibold text-lg transition-all duration-200 shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              <Tags size={18} /> Categorías
            </NavLink>
            <NavLink
              to="/perfil"
              className="flex items-center gap-4 bg-gray-50 hover:bg-indigo-50 px-4 py-3 rounded-xl text-gray-800 hover:text-indigo-700 font-semibold text-lg transition-all duration-200 shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} /> Perfil
            </NavLink>
            <NavLink
              to="/"
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="flex items-center gap-4 bg-red-50 hover:bg-red-100 px-4 py-3 rounded-xl text-red-700 hover:text-red-900 font-semibold text-lg transition-all duration-200 shadow-sm"
            >
              <LogOut size={18} /> Cerrar sesión
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
