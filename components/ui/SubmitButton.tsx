"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

/**
 * Submit button that reflects the pending state of its enclosing <form>'s
 * server action — shows a spinner and disables itself while the action runs,
 * so a save/create can't be double-fired and the user gets immediate feedback.
 * Must be rendered inside the <form> it submits.
 */
export function SubmitButton({
  children,
  pendingText,
  className = "",
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`bg-accent-primary text-void font-bold uppercase text-label-caps tracking-widest px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-wait cursor-pointer ${className}`}
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />}
      {pending ? pendingText ?? "Saving…" : children}
    </button>
  );
}
