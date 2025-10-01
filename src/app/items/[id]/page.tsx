"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useTodoDetail } from "@/hooks/useTodoDetail";

interface TodoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = React.use(params);
  const todoId = parseInt(id);

  const {
    todo,
    loading,
    saving,
    deleting,
    imagePreview,
    setImagePreview,
    hasBeenModified,
    formData,
    setFormData,
    handleImageChange,
    handleSave,
    handleDelete,
  } = useTodoDetail(todoId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            할 일을 찾을 수 없습니다
          </h1>
          <Link href="/">
            <Button>목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-violet-600 hover:text-violet-700 transition-colors"
          >
            <img
              src="/images/Size=Small.svg"
              alt="로고"
              className="w-16 h-16 sm:w-16 sm:h-16"
            />
            <span className="hidden sm:inline">do it:</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6">
          {/* 할일 영역 */}
          <div
            className={`flex items-center gap-2 p-4 border-2 rounded-3xl w-full justify-center ${
              formData.isCompleted
                ? "bg-violet-200 border-violet-300"
                : "bg-white border-slate-200"
            }`}
          >
            <button
              onClick={() =>
                setFormData({ ...formData, isCompleted: !formData.isCompleted })
              }
              className="w-8 h-8 flex items-center justify-center transition-all duration-200"
            >
              {formData.isCompleted ? (
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
            <Input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="할 일 이름"
              className={`border-none focus:ring-0 text-slate-900 bg-transparent text-lg ${
                formData.isCompleted ? "underline" : ""
              }`}
              style={{
                width: `${Math.max(
                  200,
                  Math.min(formData.name.length * 16 + 32, 400),
                )}px`,
              }}
            />
          </div>

          {/* 이미지와 메모 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 이미지 업로드 영역 */}
            <div className="space-y-2">
              <div
                className={`rounded-xl text-center transition-colors flex items-center justify-center aspect-video lg:aspect-[384/311] ${
                  imagePreview
                    ? "border-none p-0"
                    : "border-4 border-dashed border-slate-200 hover:border-violet-200 p-6"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2 w-full h-full"
                >
                  {imagePreview ? (
                    <div className="w-full h-full relative">
                      <img
                        src={imagePreview}
                        alt="미리보기"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setFormData({ ...formData, imageUrl: "" });
                        }}
                        className="absolute bottom-3 right-3 w-12 h-12 flex items-center justify-center opacity-100 hover:opacity-80 transition-opacity"
                      >
                        <img
                          src="/icons/Type=Edit.svg"
                          alt="이미지 삭제"
                          className="w-12 h-12"
                        />
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* 정가운데 img.svg */}
                      <img
                        src="/images/img.svg"
                        alt="이미지 아이콘"
                        className="w-16 h-16"
                      />
                      {/* 우측 하단 plus.svg */}
                      <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center">
                        <img
                          src="/icons/Type=Plus.svg"
                          alt="추가"
                          className="w-14 h-14 text-violet-600"
                        />
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* 메모 영역 */}
            <div className="space-y-2">
              <div className="relative rounded-xl overflow-hidden border-2 border-amber-200 aspect-video lg:aspect-[384/311]">
                {/* SVG 배경 */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('/images/memo.svg')",
                    backgroundSize: "150%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                {/* Memo 제목 */}
                <div className="absolute top-0 left-0 right-0 flex justify-center py-3 bg-gradient-to-b from-amber-50 via-amber-50 to-transparent z-10">
                  <span className="text-amber-800 font-bold text-lg">Memo</span>
                </div>

                {/* 텍스트 입력 영역 */}
                <Textarea
                  value={formData.memo}
                  onChange={e =>
                    setFormData({ ...formData, memo: e.target.value })
                  }
                  placeholder="메모를 입력해주세요"
                  rows={8}
                  className={`absolute inset-0 w-full h-full border-none focus:ring-0 text-slate-800 bg-transparent custom-scrollbar resize-none memo-textarea pt-12 ${
                    formData.memo && formData.memo.length > 30
                      ? "text-left"
                      : "text-center"
                  }`}
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#fde68a transparent",
                  }}
                />
              </div>
            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="mt-8 flex flex-row gap-4 justify-center lg:justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-none border-slate-800 hover:shadow-none font-bold py-2 px-8 shadow-[4px_4px_0px_#0F172A]"
              style={{
                backgroundColor: hasBeenModified ? "#BEF264" : "#E2E8F0",
                color: "#000000",
                borderRadius: "2rem",
              }}
            >
              {saving ? (
                <LoadingSpinner size="sm" />
              ) : (
                <div className="flex items-center gap-2">
                  <img
                    src="/icons/check.svg"
                    alt="수정완료"
                    className="w-4 h-4"
                  />
                  <span>수정 완료</span>
                </div>
              )}
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-none hover:shadow-none text-white font-bold py-2 px-8 border-2 border-slate-800 shadow-[4px_4px_0px_#0F172A]"
              style={{ backgroundColor: "#F43F5E", borderRadius: "2rem" }}
            >
              {deleting ? (
                <LoadingSpinner size="sm" />
              ) : (
                <div className="flex items-center gap-2">
                  <img src="/icons/X.svg" alt="삭제" className="w-4 h-4" />
                  <span>삭제하기</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
