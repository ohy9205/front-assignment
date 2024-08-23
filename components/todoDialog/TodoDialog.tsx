"use client";

import { createTodoServer, editTodoServer } from "@/app/actions";
import { FormContent, TodoItem } from "@/types/todoItem";
import * as Dialog from "@radix-ui/react-dialog";
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

  return (
    <Dialog.Root>
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
              />
            </fieldset>
            <fieldset className={styles.Fieldset}>
              <textarea
                className={styles.textarea}
                name="content"
                placeholder="8/23까지 todo-list 구현하고 제출하기"
                defaultValue={content}
                maxLength={140}
              />
            </fieldset>
            <MyButton text="SUBMIT" size="full" />
          </form>
          <Dialog.Close asChild>
            <button
              className="IconButton"
              aria-label="Close"
              // onClick={cancleHandler}
            >
              ✖️
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TodoDialog;
