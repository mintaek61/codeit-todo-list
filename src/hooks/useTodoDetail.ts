import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { todoApi } from "@/lib/api";
import { TodoItem } from "@/types/todo";

export const useTodoDetail = (todoId: number) => {
  const router = useRouter();

  const [todo, setTodo] = useState<TodoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [hasBeenModified, setHasBeenModified] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    memo: "",
    isCompleted: false,
    imageUrl: "",
  });

  const fetchTodo = useCallback(async () => {
    try {
      const data = await todoApi.getTodo(todoId.toString());
      setTodo(data);
      setFormData({
        name: data.name,
        memo: data.memo || "",
        isCompleted: data.isCompleted,
        imageUrl: data.imageUrl || "",
      });
      if (data.imageUrl) {
        setImagePreview(data.imageUrl);
      }

      // 이미 수정된 할일인지 확인 (메모, 이미지, 완료상태 중 하나라도 있으면 수정된 것으로 간주)
      const isAlreadyModified = Boolean(
        (data.memo && data.memo.trim() !== "") ||
          data.imageUrl ||
          data.isCompleted,
      );
      setHasBeenModified(isAlreadyModified);
    } catch (error) {
      console.error("할 일을 불러오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  }, [todoId]);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  // 수정 상태 추적 - 실제 저장 후에만 상태 변경
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (
      todo &&
      (formData.name !== todo.name ||
        formData.memo !== (todo.memo || "") ||
        formData.isCompleted !== todo.isCompleted ||
        formData.imageUrl !== (todo.imageUrl || ""))
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [formData, todo]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!todo) return;

    setSaving(true);
    try {
      let imageUrl = formData.imageUrl;

      // 이미지 업로드
      if (imageFile) {
        const uploadResult = await todoApi.uploadImage(imageFile);
        imageUrl = uploadResult;
      }

      // 할 일 업데이트
      await todoApi.updateTodo(todoId.toString(), {
        name: formData.name,
        memo: formData.memo,
        isCompleted: formData.isCompleted,
        imageUrl: imageUrl,
      });

      setHasBeenModified(true);
      router.push("/");
    } catch (error) {
      console.error("할 일 수정에 실패했습니다:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!todo) return;

    if (!confirm("정말로 이 할 일을 삭제하시겠습니까?")) return;

    setDeleting(true);
    try {
      await todoApi.deleteTodo(todoId.toString());
      router.push("/");
    } catch (error) {
      console.error("할 일 삭제에 실패했습니다:", error);
    } finally {
      setDeleting(false);
    }
  };

  return {
    todo,
    loading,
    saving,
    deleting,
    imageFile,
    imagePreview,
    setImagePreview,
    hasBeenModified,
    formData,
    setFormData,
    hasChanges,
    handleImageChange,
    handleSave,
    handleDelete,
  };
};
