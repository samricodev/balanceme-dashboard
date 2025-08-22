import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">BalanceMe</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/cuentas" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Cuentas</NavLink>
              <NavLink to="/transacciones" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Transacciones</NavLink>
              <NavLink to="/categorias" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Categorías</NavLink>
              <NavLink to="/perfil" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Perfil</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
