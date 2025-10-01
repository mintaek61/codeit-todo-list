import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * 로딩 스피너 컴포넌트
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const classes = `${sizeClasses[size]} ${className}`;

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${classes} border-2 border-gray-300 border-t-primary rounded-full animate-spin`}
      ></div>
    </div>
  );
};

