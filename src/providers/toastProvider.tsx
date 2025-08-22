import React, { useState } from "react";
import { ToastContext } from "../contexts/toastContext";
import { Toast } from "../types/toastTypes";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps): React.ReactNode => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = {
      ...toastData,
      id,
      duration: toastData.duration || 5000
    };

    setToasts(prev => [...prev, toast]);

    setTimeout(() => {
      removeToast(id);
    }, toast.duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;