import { createContext } from "react";
import { ToastContextType } from "../types/toastTypes";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
