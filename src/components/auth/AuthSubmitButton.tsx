interface AuthSubmitButtonProps {
  isLogin: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({ isLogin, isLoading, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isLoading}
    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:cursor-pointer ${isLoading
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-[1.02]'
      } text-white shadow-lg`}
  >
    {isLoading ? (
      <div className="flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
        Procesando...
      </div>
    ) : (
      isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
    )}
  </button>
);