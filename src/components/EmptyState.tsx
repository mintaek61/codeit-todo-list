import React from "react";

interface EmptyStateProps {
  type: "todo" | "done";
  message: string;
}

/**
 * 빈 상태를 표시하는 컴포넌트
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ type, message }) => {
  return (
    <div className="text-center py-12 bg-slate-50 border-slate-200 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        {/* 구름 캐릭터 아이콘 */}
        <div className="w-36 h-36 flex items-center justify-center">
          {type === "todo" ? (
            // TO DO 구름 아이콘
            <img
              src="/images/Type=Todo, Size=Large.svg"
              alt="할 일 없음"
              className="w-32 h-32"
            />
          ) : (
            // DONE 구름 아이콘
            <img
              src="/images/Type=Done, Size=Large.svg"
              alt="완료된 할 일 없음"
              className="w-32 h-32"
            />
          )}
        </div>

        <div className="space-y-2">
          {message.split(". ").map((line, index) => (
            <p key={index} className="text-slate-400 font-medium">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
