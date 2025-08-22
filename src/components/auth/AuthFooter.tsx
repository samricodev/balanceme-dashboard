// Componente para el Footer
interface AuthFooterProps {
  isLogin: boolean;
  onToggleMode: () => void;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ isLogin, onToggleMode }) => (
  <div className="mt-6">
    <div className="text-center">
      <p className="text-gray-600">
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        <button
          type="button"
          onClick={onToggleMode}
          className="ml-2 text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
        >
          {isLogin ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
    </div>

    {isLogin && (
      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    )}
  </div>
);