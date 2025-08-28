import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useToast } from '../hooks';
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

  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const result = await submitAuth();
      if (result) {
        console.log(`${isLogin ? 'Login' : 'Registro'} exitoso`);

        if (isLogin && result.token) {
          localStorage.setItem(
            'userId',
            result.user && typeof result.user === 'object' && 'id' in result.user
              ? (result.user as { id: string }).id
              : ''
          );
          localStorage.setItem('token', result.token);
          console.log('Token recibido');
          navigate('/dashboard');
        } else {
          setTimeout(() => {
            toggleMode();
          }, 2000);
        }

        addToast({
          type: 'success',
          title: `¡${isLogin ? 'Login' : 'Registro'} exitoso!`,
          message: result.message || `Bienvenido${isLogin ? ' de vuelta' : ' a la plataforma'}`,
          duration: 4000
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          type: 'error',
          title: 'Error',
          message: error.message,
          duration: 4000
        });
      } else {
        addToast({
          type: 'error',
          title: 'Error de conexión',
          message: 'Verifica que el servidor esté corriendo en localhost:8080',
          duration: 4000
        });
      }
    }
  };

  const handleToggleMode = () => {
    toggleMode();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 animate-gradient-x">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
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
              placeholder="ejemplo@email.com"
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
