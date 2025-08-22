import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Lock } from 'lucide-react';
import { 
  AuthHeader,
  AuthFooter,
  AuthSubmitButton,
  AuthInput
} from '../components/auth';

const AuthSystem: React.FC = () => {
  const {
    isLogin,
    isLoading,
    formData,
    errors,
    handleInputChange,
    submitAuth,
    toggleMode
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const result = await submitAuth();
      if (result) {
        console.log(`${isLogin ? 'Login' : 'Registro'} exitoso:`, result);
        
        if (isLogin && result.token) {
          console.log('Token recibido:', result.token);
        }
        
        alert(`¡${isLogin ? 'Login' : 'Registro'} exitoso! ${result.message || ''}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert(`Error de conexión. Verifica que el servidor esté corriendo en localhost:3000`);
      }
    }
  };

  const handleToggleMode = () => {
    toggleMode();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <AuthHeader isLogin={isLogin} />

          <div className="space-y-6">
            {!isLogin && (
              <AuthInput
                type="text"
                name="name"
                label="Nombre completo"
                placeholder="Tu nombre completo"
                value={formData.name || ''}
                error={errors.name}
                icon={<User className="w-5 h-5" />}
                onChange={handleInputChange}
              />
            )}

            <AuthInput
              type="email"
              name="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              value={formData.email}
              error={errors.email}
              icon={<Mail className="w-5 h-5" />}
              onChange={handleInputChange}
            />

            <AuthInput
              type="password"
              name="password"
              label="Contraseña"
              placeholder="Tu contraseña"
              value={formData.password}
              error={errors.password}
              icon={<Lock className="w-5 h-5" />}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onChange={handleInputChange}
            />

            {!isLogin && (
              <AuthInput
                type="password"
                name="confirmPassword"
                label="Confirmar contraseña"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword || ''}
                error={errors.confirmPassword}
                icon={<Lock className="w-5 h-5" />}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                onChange={handleInputChange}
              />
            )}

            <AuthSubmitButton 
              isLogin={isLogin} 
              isLoading={isLoading} 
              onClick={handleSubmit} 
            />
          </div>

          <AuthFooter isLogin={isLogin} onToggleMode={handleToggleMode} />
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;