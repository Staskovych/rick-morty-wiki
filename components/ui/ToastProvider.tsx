"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Toast, { type ToastVariant } from "@/components/ui/Toast";

const TOAST_DURATION_MS = 3000;

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default function ToastProvider({
  children,
}: ToastProviderProps): React.ReactElement {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutIdsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const removeToast = useCallback((id: string): void => {
    const timeoutId = timeoutIdsRef.current.get(id);
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutIdsRef.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant): void => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, message, variant }]);

      const timeoutId = setTimeout(() => {
        removeToast(id);
      }, TOAST_DURATION_MS);
      timeoutIdsRef.current.set(id, timeoutId);
    },
    [removeToast],
  );

  useEffect(() => {
    const timeoutIds = timeoutIdsRef.current;
    return () => {
      for (const timeoutId of timeoutIds.values()) {
        clearTimeout(timeoutId);
      }
      timeoutIds.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
