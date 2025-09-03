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
                to="/transacciones"
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
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 py-3 space-y-3">
            <NavLink
              to="/cuentas"
              className="flex items-center gap-2 text-gray-800 hover:text-gray-600"
            >
              <Wallet size={18} /> Cuentas
            </NavLink>
            <NavLink
              to="/transacciones"
              className="flex items-center gap-2 text-gray-800 hover:text-gray-600"
            >
              <Repeat size={18} /> Transacciones
            </NavLink>
            <NavLink
              to="/categorias"
              className="flex items-center gap-2 text-gray-800 hover:text-gray-600"
            >
              <Tags size={18} /> Categorías
            </NavLink>
            <NavLink
              to="/perfil"
              className="flex items-center gap-2 text-gray-800 hover:text-gray-600"
            >
              <User size={18} /> Perfil
            </NavLink>
            <NavLink
              to="/"
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-800 hover:text-gray-600"
            >
              <LogOut size={18} /> Cerrar sesión
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
