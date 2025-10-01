import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

/**
 * 재사용 가능한 카드 컴포넌트
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
}) => {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const baseClasses = "border border-gray-200 shadow-sm";
  const classes = `${baseClasses} ${paddingClasses[padding]} ${className}`;

  return <div className={classes}>{children}</div>;
};
