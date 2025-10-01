"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, LoadingSpinner } from "@/components/ui";
import { EmptyState } from "@/components/EmptyState";
import { TodoItem } from "@/types/todo";
import { useTodoList } from "@/hooks/useTodoList";

/**
 * 할 일 목록 페이지 컴포넌트
 */
export default function Home() {
  const {
    loading,
    newTodoTitle,
    setNewTodoTitle,
    isAdding,
    handleAddTodo,
    handleToggleComplete,
    activeTodos,
    completedTodos,
  } = useTodoList();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-violet-600 hover:text-violet-700 transition-colors"
          >
            <img
              src="/images/Size=Small.svg"
              alt="로고"
              className="h-10 w-auto sm:hidden"
            />
            <img
              src="/images/Size=Large.svg"
              alt="로고"
              className="h-10 w-auto hidden sm:block"
            />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* 할 일 추가 폼 */}
        <div className="mb-6 sm:mb-8">
          <form onSubmit={handleAddTodo} className="flex gap-3">
            {/* 입력 필드 */}
            <input
              type="text"
              placeholder="할 일을 입력해주세요"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              className="flex-1 px-6 py-2 text-base border-2 rounded-full outline-none placeholder-slate-400 text-slate-800 bg-transparent shadow-[4px_4px_0px_#0F172A]"
              disabled={isAdding}
            />

            {/* 버튼 */}
            <button
              type="submit"
              disabled={isAdding || !newTodoTitle.trim()}
              className="px-5 sm:px-8 py-1 bg-violet-500 hover:bg-violet-600 text-white font-bold text-base border-2 border-slate-800 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#0F172A]"
            >
              {isAdding ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <div className="sm:hidden flex items-center justify-center">
                    <img
                      src="/icons/Property 1=plus.svg"
                      alt="추가"
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="hidden sm:flex items-center justify-center gap-2">
                    <img
                      src="/icons/Property 1=plus.svg"
                      alt="추가"
                      className="w-4 h-4"
                    />
                    <span>추가하기</span>
                  </div>
                </>
              )}
            </button>
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 진행 중인 할 일 */}
            <section>
              <h2 className="text-lg font-bold text-slate-500 mb-4 flex items-center gap-2">
                <img
                  src="/images/todo.svg"
                  alt="TO DO"
                  className="h-8 w-auto"
                />
                ({activeTodos.length})
              </h2>
              {activeTodos.length === 0 ? (
                <EmptyState
                  type="todo"
                  message="할 일이 없어요. TODO를 새롭게 추가해주세요!"
                />
              ) : (
                <div className="space-y-3">
                  {activeTodos.map(todo => (
                    <TodoItemCard
                      key={todo.id}
                      todo={todo}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* 완료된 할 일 */}
            <section>
              <h2 className="text-lg font-bold text-slate-500 mb-4 flex items-center gap-2">
                <img src="/images/done.svg" alt="DONE" className="h-8 w-auto" />
                ({completedTodos.length})
              </h2>
              {completedTodos.length === 0 ? (
                <EmptyState
                  type="done"
                  message="아직 다 한 일이 없어요. 해야 할 일을 체크해보세요!"
                />
              ) : (
                <div className="space-y-3">
                  {completedTodos.map(todo => (
                    <TodoItemCard
                      key={todo.id}
                      todo={todo}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

/**
 * 할 일 아이템 카드 컴포넌트
 */
interface TodoItemCardProps {
  todo: TodoItem;
  onToggleComplete: (id: number, currentStatus: boolean) => void;
}

const TodoItemCard: React.FC<TodoItemCardProps> = ({
  todo,
  onToggleComplete,
}) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCardClick = () => {
    setIsNavigating(true);
    // 페이지 이동은 Link가 처리하므로 여기서는 로딩 상태만 설정
  };

  return (
    <Card
      className={`hover:shadow-md rounded-full py-3 ${
        todo.isCompleted
          ? "bg-violet-200 border-violet-300"
          : "bg-white border-slate-200"
      } ${isNavigating ? "opacity-75" : ""}`}
    >
      <div className="flex items-center gap-3">
        {/* 체크박스 */}
        <button
          onClick={() => onToggleComplete(todo.id, todo.isCompleted)}
          className="w-8 h-8 flex items-center justify-center transition-all duration-200"
        >
          {todo.isCompleted ? (
            <img
              src="/icons/Property 1=Frame 2610233.svg"
              alt="체크됨"
              className="w-8 h-8"
            />
          ) : (
            <img
              src="/icons/Property 1=Default.svg"
              alt="체크 안됨"
              className="w-8 h-8"
            />
          )}
        </button>

        {/* 할 일 내용 */}
        <div className="flex-1 flex justify-between items-start">
          <Link
            href={`/items/${todo.id}`}
            onClick={handleCardClick}
            className="text-left hover:text-violet-600 transition-colors"
          >
            <h3
              className={`font-medium text-sm ${
                todo.isCompleted
                  ? "line-through text-slate-500"
                  : "text-slate-800"
              }`}
            >
              {todo.name}
            </h3>
            {todo.memo && (
              <p className="text-xs text-slate-600 mt-1">{todo.memo}</p>
            )}
          </Link>

          {/* 이동 중 표시 - 오른쪽 끝에 위치 */}
          {isNavigating && (
            <div className="flex items-center gap-1 ml-2">
              <div className="w-3 h-3 border border-violet-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-violet-600">이동 중...</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
