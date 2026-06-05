"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function BackButton({
  children,
  className = "mb-6 inline-block text-[#0b5ed7] hover:underline",
}: BackButtonProps): React.ReactElement {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={className}
    >
      {children}
    </button>
  );
}
