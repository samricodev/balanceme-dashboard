import { useEffect } from "react";

interface ToastModalProps {
  show: boolean;
  message: string;
  type?: "success" | "error";
  duration?: number; // ms
  onClose: () => void;
}

const ToastModal = ({
  show,
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastModalProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgColor =
    type === "error"
      ? "bg-red-100 text-red-700 border-red-400"
      : "bg-green-100 text-green-700 border-green-400";

  return (
    <div className="fixed top-5 right-5 z-50 w-80 max-w-sm">
      <div
        className={`w-full border rounded-lg shadow-lg p-4 flex justify-between items-center ${bgColor} animate-slide-in`}
      >
        <span className="text-sm">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 font-bold text-gray-600 hover:text-gray-900"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ToastModal;
