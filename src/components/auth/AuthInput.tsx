import { Eye, EyeOff } from "lucide-react";

// Componente para Input con validación
interface AuthInputProps {
  type: 'text' | 'email' | 'password';
  name: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  icon: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  type,
  name,
  label,
  placeholder,
  value,
  error,
  icon,
  showPassword,
  onTogglePassword,
  onChange
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
        {icon}
      </div>
      <input
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full pl-11 ${type === 'password' ? 'pr-11' : 'pr-4'} py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        placeholder={placeholder}
      />
      {type === 'password' && onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);