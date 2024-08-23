"use client";

import { ResponseData } from "@/apis/api";
import { useTodoForm } from "@/hooks/useTodo";
import { TodoItem } from "@/types/todoItem";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import MyAlertDialog from "../myAlertDialog/MyAlertDialog";
import MyButton from "../myButton/MyButton";
import styles from "./TodoDialog.module.css";

type Props = {
  trigger: React.ReactNode;
  header: string;
  isModifyMode?: boolean;
  initItem?: TodoItem;
  submitHandler: (data: any) => Promise<ResponseData>;
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
  submitHandler,
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    form: { title, content },
    isModifiedState,
    errorMsg,
    formSubmitHandler,
    formChangeHandler,
  } = useTodoForm(initItem, submitHandler);

  const dialogOpenHandler = (open: boolean) => {
    setIsDialogOpen(open);
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={dialogOpenHandler}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>{header}</Dialog.Title>
          <Dialog.Description />

          <form action={formSubmitHandler}>
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
          {errorMsg ? <div>{errorMsg}</div> : ""}
          {isModifiedState ? (
            <MyAlertDialog
              trigger={
                <button className={styles.IconButton} aria-label="Close">
                  ✖️
                </button>
              }
              confirmHandler={() => setIsDialogOpen(false)}
              title="변경된 내용이 있습니다. 수정을 취소할까요?"
            />
          ) : (
            <Dialog.Close asChild>
              <button className={styles.IconButton} aria-label="Close">
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
