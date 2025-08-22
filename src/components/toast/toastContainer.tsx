import React from "react";
import { ToastItem } from "./toastItem";
import { useToast } from "../../hooks/useToast";

export const ToastContainer = (): React.ReactNode | null => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
};