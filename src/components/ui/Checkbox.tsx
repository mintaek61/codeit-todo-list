import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * 재사용 가능한 체크박스 컴포넌트
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          className={`w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 ${className}`}
          {...props}
        />
        {label && (
          <span className="text-sm font-medium text-gray-700">{label}</span>
        )}
      </label>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

