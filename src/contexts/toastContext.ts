import { createContext } from "react";
import { ToastContextType } from "../types/toast.type";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
