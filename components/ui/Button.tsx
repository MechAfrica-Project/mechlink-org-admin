import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "text" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", href, children, className = "", ...props }: ButtonProps) {
  const baseClasses = "transition-all duration-300 font-bold inline-flex items-center justify-center cursor-pointer";
  
  const variants = {
    primary: "bg-accent-primary text-void hover:scale-105 active:scale-95 shadow-lg tracking-widest uppercase text-label-caps",
    ghost: "bg-transparent border border-cloud text-cloud hover:bg-cloud hover:text-void hover:scale-105 active:scale-95 tracking-widest uppercase text-label-caps",
    text: "text-cloud text-link-hover font-medium hover:opacity-80 gap-2 group/link",
    link: "text-cloud hover:opacity-80 transition-opacity",
  };

  const sizes = {
    sm: "px-6 py-2 text-[12px] rounded-full",
    md: "px-8 py-4 rounded-full",
    lg: "px-10 py-5 text-lg rounded-full",
  };

  const isTextOrLink = variant === "text" || variant === "link";
  const sizeClass = isTextOrLink ? "" : sizes[size];

  const classes = `${baseClasses} ${variants[variant]} ${sizeClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
