import { User, Edit3, Lock, Mail, UserCheck, Shield, Settings, Camera, Bell, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { Navbar } from "../components/navbar/Navbar";

const Profile = () => {
  const { profileData, loading, error } = useProfile();
  const navigate = useNavigate();

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
              <p className="text-xl text-indigo-100 mb-8">
                Gestiona tu información personal y configuraciones
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-indigo-100 text-sm mb-2">Usuario</p>
                <p className="text-2xl font-bold">{profileData?.name || 'No especificado'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Resumen Rápido */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estado de la cuenta</p>
                  <p className="text-2xl font-bold text-green-600">Verificada</p>
                  <p className="text-xs text-green-500">✓ Cuenta activa</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nivel de seguridad</p>
                  <p className="text-2xl font-bold text-blue-600">Alto</p>
                  <p className="text-xs text-blue-500">🔒 Protegida</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Último acceso</p>
                  <p className="text-2xl font-bold text-purple-600">Hoy</p>
                  <p className="text-xs text-purple-500">📱 Desde móvil</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

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
                  <div className="bg-green-500 w-12 h-6 rounded-full relative">
                    <div className="bg-white w-5 h-5 rounded-full absolute top-0.5 right-0.5 shadow"></div>
                  </div>
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
                  <div className="bg-green-500 w-12 h-6 rounded-full relative">
                    <div className="bg-white w-5 h-5 rounded-full absolute top-0.5 right-0.5 shadow"></div>
                  </div>
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
                  <div className="bg-gray-300 w-12 h-6 rounded-full relative">
                    <div className="bg-white w-5 h-5 rounded-full absolute top-0.5 left-0.5 shadow"></div>
                  </div>
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

          {/* Accesos Rápidos */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Accesos Rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center space-y-2 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200">
                <Camera className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Cambiar Foto</span>
              </button>

              <button className="flex flex-col items-center space-y-2 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200">
                <Bell className="w-8 h-8 text-green-600" />
                <span className="text-sm font-semibold text-green-800">Notificaciones</span>
              </button>

              <button className="flex flex-col items-center space-y-2 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200">
                <Shield className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-semibold text-purple-800">Privacidad</span>
              </button>

              <button className="flex flex-col items-center space-y-2 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all duration-200">
                <Settings className="w-8 h-8 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-800">Configuración</span>
              </button>
            </div>
          </div>

          {/* Información de Seguridad */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Información de Seguridad</h4>
                <p className="text-blue-700 text-sm mb-4">
                  Tu información personal está protegida con encriptación de extremo a extremo. 
                  Nunca compartimos tus datos con terceros sin tu consentimiento explícito.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded-full">
                    🔐 Encriptación AES-256
                  </span>
                  <span className="px-3 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded-full">
                    ✅ GDPR Compliant
                  </span>
                  <span className="px-3 py-1 bg-purple-200 text-purple-800 text-xs font-semibold rounded-full">
                    🛡️ ISO 27001
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;