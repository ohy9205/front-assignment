"use client";

import { ResponseData } from "@/apis/api";
import { FormContent, TodoItem } from "@/types/todoItem";
import { useEffect, useState } from "react";

export const useTodoForm = (
  initItem: TodoItem,
  submitHandler: (data: any) => Promise<ResponseData>
) => {
  const { id, title, content } = initItem;
  const [formState, setFormState] = useState<FormContent>({
    title,
    content,
  });
  const [isModifiedState, setIsModifiedState] = useState(false);
  const [msg, setMsg] = useState("");

  const isModified = (newItem: FormContent) => {
    return (
      initItem.title !== newItem.title || initItem.content !== newItem.content
    );
  };

  const isValidatedForm = (formContent: FormContent) => {
    if (!isModified(formContent)) {
      setMsg("변경된 내용이 없습니다.");
      return false;
    }

    if (!formContent.title.trim()) {
      setMsg("타이틀을 입력하세요.");
      return false;
    }

    if (formContent.title.length > 20 || formContent.content.length > 140) {
      setMsg("제목은 20자, 내용은 140자 이하만 가능합니다.");
      return false;
    }

    return true;
  };

  const formSubmitHandler = async (formData: FormData) => {
    const newData = {
      title: formData.get("title")?.toString() || "",
      content: formData.get("content")?.toString() || "",
    };

    if (!isValidatedForm(newData)) {
      // console.log("유효성 검사에 실패함");
      return;
    }

    const { result, data } = await submitHandler({ ...newData, id });

    if (result === "success") {
      setMsg("");
    } else {
      setMsg(data);
    }
  };

  const formChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setIsModifiedState(isModified(formState));
  }, [formState]);

  return {
    form: { ...formState, msg },
    isModifiedState,
    errorMsg: msg,
    formSubmitHandler,
    formChangeHandler,
  };
};
