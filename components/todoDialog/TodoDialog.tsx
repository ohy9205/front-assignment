"use client";

import { createTodoServer, editTodoServer } from "@/app/actions";
import { FormContent, TodoItem } from "@/types/todoItem";
import * as Dialog from "@radix-ui/react-dialog";
import { ChangeEvent, useEffect, useState } from "react";
import MyAlertDialog from "../myAlertDialog/MyAlertDialog";
import MyButton from "../myButton/MyButton";
import styles from "./TodoDialog.module.css";

type Props = {
  trigger: React.ReactNode;
  header: string;
  isModifyMode?: boolean;
  initItem?: TodoItem;
};

const initForm: TodoItem = {
  id: "",
  title: "",
  content: "",
  createdAt: "",
  isCompleted: false,
};

const TodoDialog = ({
  trigger,
  header,
  initItem = initForm,
  isModifyMode = false,
}: Props) => {
  const { id, title, content } = initItem;
  const [formState, setFormState] = useState<FormContent>({
    title: initItem.title,
    content: initItem.content,
  });
  const [isModifiedState, setIsModifiedState] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isModified = (newItem: FormContent) => {
    if (
      initItem.title === newItem.title &&
      initItem.content === newItem.content
    ) {
      return false;
    }

    return true;
  };

  const isValidatedForm = (formContent: FormContent) => {
    if (!isModified(formContent)) {
      console.log("변경된 내용이 없음");
      return;
    }

    if (!formContent.title.trim()) {
      console.log("제목 빈 상태에서 추가할 수 없음");
      return false;
    }

    if (formContent.title.length > 20 || formContent.content.length > 140) {
      console.log("글자 수 제한");
      return false;
    }

    return true;
  };

  const submitHandler = async (formData: FormData) => {
    const newData = {
      title: formData.get("title")?.toString() || "",
      content: formData.get("content")?.toString() || "",
    };

    if (!isValidatedForm(newData)) {
      console.log("유효성 검사에 실패함");
      return;
    }

    if (!isModifyMode) {
      const res = await createTodoServer(newData);

      if (res) {
        console.log("생성 후 동작");
      }
    } else {
      const res = await editTodoServer({
        ...newData,
        id,
      });

      if (res) {
        console.log("수정 후 동작");
      }
    }
  };

  const formChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const dialogOpenHandler = (open: boolean) => {
    setIsDialogOpen(open);
    setFormState({
      title: initItem.title,
      content: initItem.content,
    });
  };

  useEffect(() => {
    if (isModified(formState)) {
      setIsModifiedState(true);
    } else {
      setIsModifiedState(false);
    }
  }, [formState]);

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={dialogOpenHandler}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>{header}</Dialog.Title>
          <Dialog.Description />

          <form action={submitHandler}>
            <fieldset className={styles.Fieldset}>
              <input
                className={styles.Input}
                name="title"
                placeholder="todo-list 구현하기"
                defaultValue={title}
                maxLength={30}
                onChange={formChangeHandler}
              />
            </fieldset>
            <fieldset className={styles.Fieldset}>
              <textarea
                className={styles.textarea}
                name="content"
                placeholder="8/23까지 todo-list 구현하고 제출하기"
                defaultValue={content}
                maxLength={140}
                onChange={formChangeHandler}
              />
            </fieldset>
            <MyButton text="SUBMIT" size="full" />
          </form>

          {isModifiedState ? (
            <MyAlertDialog
              trigger={
                <button className="IconButton" aria-label="Close">
                  ✖️
                </button>
              }
              confirmHandler={() => setIsDialogOpen(false)}
              title="변경된 내용이 있습니다. 수정을 취소할까요?"
            />
          ) : (
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                ✖️
              </button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TodoDialog;
