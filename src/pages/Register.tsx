/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/auth";
import ToastModal from "../components/ToastModal";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(name, email, password);
      setToastMessage(res.message || "Registro exitoso");
      setToastType("success");
      setShowToast(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000); // redirige después de 2s
    } catch (err: any) {
      setToastMessage(err.response?.data?.message || "Error en el registro");
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Crear cuenta
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>

      {/* Toast Modal */}
      <ToastModal
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default Register;
