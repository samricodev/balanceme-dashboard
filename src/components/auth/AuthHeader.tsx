import React from "react";
import { LogIn, UserPlus } from "lucide-react";

export const AuthHeader: React.FC<{ isLogin: boolean }> = ({ isLogin }) => (
  <div className="text-center mb-8">
    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
      {isLogin ? <LogIn className="w-8 h-8 text-white" /> : <UserPlus className="w-8 h-8 text-white" />}
    </div>
    <h1 className="text-2xl font-bold text-gray-900 mb-2">
      {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
    </h1>
    <p className="text-gray-600">
      {isLogin ? 'Bienvenido de vuelta' : 'Únete a nuestra plataforma'}
    </p>
  </div>
);