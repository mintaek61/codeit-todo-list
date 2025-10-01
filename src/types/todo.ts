/**
 * Todo 아이템의 타입 정의
 */
export interface TodoItem {
  id: number;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

/**
 * Todo 아이템 생성 요청 타입
 */
export interface CreateTodoRequest {
  name: string;
  memo?: string;
  imageUrl?: string;
}

/**
 * Todo 아이템 수정 요청 타입
 */
export interface UpdateTodoRequest {
  name?: string;
  isCompleted?: boolean;
  memo?: string;
  imageUrl?: string;
}

/**
 * API 응답 타입
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}
