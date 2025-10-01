import { TodoItem, CreateTodoRequest, UpdateTodoRequest } from "@/types/todo";

const API_BASE_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "codeit-todo-list"; // 고유한 tenant ID

/**
 * API 클라이언트 클래스
 */
class TodoApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/${TENANT_ID}`;
  }

  /**
   * 모든 할 일 목록 조회
   */
  async getTodos(
    page: number = 1,
    pageSize: number = 100,
  ): Promise<TodoItem[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/items?page=${page}&pageSize=${pageSize}`,
      );
      if (!response.ok) {
        throw new Error("할 일 목록을 가져오는데 실패했습니다.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

  /**
   * 특정 할 일 조회
   */
  async getTodo(id: string): Promise<TodoItem> {
    try {
      const response = await fetch(`${this.baseUrl}/items/${id}`);
      if (!response.ok) {
        throw new Error("할 일을 가져오는데 실패했습니다.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching todo:", error);
      throw error;
    }
  }

  /**
   * 새로운 할 일 생성
   */
  async createTodo(todo: CreateTodoRequest): Promise<TodoItem> {
    try {
      const response = await fetch(`${this.baseUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("할 일 생성에 실패했습니다.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  /**
   * 할 일 수정
   */
  async updateTodo(id: string, todo: UpdateTodoRequest): Promise<TodoItem> {
    try {
      const response = await fetch(`${this.baseUrl}/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("할 일 수정에 실패했습니다.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }

  /**
   * 할 일 삭제
   */
  async deleteTodo(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("할 일 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }

  /**
   * 이미지 업로드
   */
  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${this.baseUrl}/images/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
}

// 싱글톤 인스턴스 생성
export const todoApi = new TodoApiClient();
