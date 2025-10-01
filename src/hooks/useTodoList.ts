import { useState, useEffect } from "react";
import { todoApi } from "@/lib/api";
import { TodoItem } from "@/types/todo";

export const useTodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // 할 일 목록 조회
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch (error) {
      console.error("할 일 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 할 일 추가 (Optimistic Update)
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    const newTodoTitleValue = newTodoTitle.trim();
    setNewTodoTitle(""); // 즉시 입력창 비우기

    // 임시 할 일 객체 생성 (Optimistic Update)
    const tempTodo: TodoItem = {
      id: Date.now(), // 임시 ID
      tenantId: "temp",
      name: newTodoTitleValue,
      isCompleted: false,
    };

    // 즉시 UI에 추가
    setTodos(prevTodos => [tempTodo, ...prevTodos]);

    try {
      setIsAdding(true);
      const createdTodo = await todoApi.createTodo({
        name: newTodoTitleValue,
      });

      // 서버에서 받은 실제 데이터로 교체
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === tempTodo.id ? createdTodo : todo)),
      );
    } catch (error) {
      console.error("할 일 추가 실패:", error);
      // 실패 시 임시 할 일 제거
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== tempTodo.id));
      setNewTodoTitle(newTodoTitleValue); // 입력창에 다시 입력
      alert("할 일 생성에 실패했습니다.");
    } finally {
      setIsAdding(false);
    }
  };

  // 할 일 완료 상태 토글 (Optimistic Update)
  const handleToggleComplete = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    // 즉시 UI 업데이트 (Optimistic Update)
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: newStatus } : todo,
      ),
    );

    try {
      // 백그라운드에서 API 호출
      await todoApi.updateTodo(id.toString(), {
        isCompleted: newStatus,
      });
    } catch (error) {
      console.error("할 일 상태 변경 실패:", error);
      // 실패 시 원래 상태로 되돌리기
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, isCompleted: currentStatus } : todo,
        ),
      );
      alert("할 일 상태 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 진행 중인 할 일과 완료된 할 일 분리
  const activeTodos = todos.filter(todo => !todo.isCompleted);
  const completedTodos = todos.filter(todo => todo.isCompleted);

  return {
    todos,
    loading,
    newTodoTitle,
    setNewTodoTitle,
    isAdding,
    handleAddTodo,
    handleToggleComplete,
    activeTodos,
    completedTodos,
  };
};
