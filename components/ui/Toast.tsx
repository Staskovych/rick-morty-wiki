"use client";

export type ToastVariant = "success" | "neutral";

interface ToastProps {
  message: string;
  variant: ToastVariant;
}

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  success: "bg-green-500 text-white",
  neutral: "bg-gray-500 text-white",
};

export default function Toast({
  message,
  variant,
}: ToastProps): React.ReactElement {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-lg px-4 py-3 text-sm shadow-md ${VARIANT_CLASSES[variant]}`}
    >
      {message}
    </div>
  );
}
