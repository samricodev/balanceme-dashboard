import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { Navbar } from "../components/navbar/Navbar";
import { User, Edit3, Lock, Mail, Shield, Settings, Bell, CreditCard } from "lucide-react";

const Profile = () => {
  const { profileData, loading, error } = useProfile();
  const navigate = useNavigate();

  const [configurations, setConfigurations] = useState({
    enableNotifications: true,
    enable2FA: false,
    automaticLimits: true,
  });

  const toggleConfiguration = (
    key: "enableNotifications" | "enable2FA" | "automaticLimits"
  ) => {
    setConfigurations(
      prev => ({
        ...prev,
        [key]: !prev[key]
      })
    );
  };

  useEffect(() => {
    console.log('Configurations updated:', configurations);
  }, [configurations]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-gray-600 font-medium">Cargando información del perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200 max-w-md mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Error al cargar</h3>
              </div>
              <p className="text-gray-600 mb-6">No se pudo cargar la información del perfil</p>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 transition-colors font-semibold"
              >
                Refrescar Sesión
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl border border-white/30">
                <User size={64} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Mi Perfil 👤
              </h1>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-indigo-100 text-sm mb-2">Usuario</p>
                <p className="text-2xl font-bold">{profileData?.name || 'No especificado'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Información Personal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <User className="w-6 h-6 text-indigo-600" />
                <span>Información Personal</span>
              </h3>

              <div className="space-y-6">
                {/* Nombre */}
                <div className="group">
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <User size={16} className="text-indigo-600" />
                    <span>Nombre completo</span>
                  </label>
                  <div className="relative">
                    <input
                      name="name"
                      value={profileData?.name || 'No especificado'}
                      readOnly
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-default"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <Mail size={16} className="text-indigo-600" />
                    <span>Correo electrónico</span>
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      value={profileData?.email || 'No especificado'}
                      readOnly
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-default"
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div className="group">
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <Lock size={16} className="text-indigo-600" />
                    <span>Contraseña</span>
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type="password"
                      value={profileData?.password || ''}
                      readOnly
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-default"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Configuraciones */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <Settings className="w-6 h-6 text-purple-600" />
                <span>Configuraciones</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Bell size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Notificaciones</p>
                      <p className="text-xs text-gray-500">Recibir alertas por email</p>
                    </div>
                  </div>
                  {/* Switch moderno funcional */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={configurations.enableNotifications} onChange={() => toggleConfiguration("enableNotifications")} />
                    <div className="w-12 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-colors duration-200"></div>
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 peer-checked:translate-x-6"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Shield size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Autenticación 2FA</p>
                      <p className="text-xs text-gray-500">Seguridad adicional</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={configurations.enable2FA} onChange={() => toggleConfiguration("enable2FA")} />
                    <div className="w-12 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-colors duration-200"></div>
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 peer-checked:translate-x-6"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CreditCard size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Límites automáticos</p>
                      <p className="text-xs text-gray-500">Control de gastos</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={configurations.automaticLimits} onChange={() => toggleConfiguration("automaticLimits")} />
                    <div className="w-12 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-colors duration-200"></div>
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 peer-checked:translate-x-6"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones del Perfil */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <Edit3 className="w-6 h-6 text-indigo-600" />
              <span>Acciones del Perfil</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Edit3 size={20} />
                <span>Editar Perfil</span>
              </button>

              <button className="flex items-center justify-center space-x-3 p-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105">
                <Lock size={20} />
                <span>Cambiar Contraseña</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;