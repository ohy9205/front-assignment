"use client";

import {
  deleteTodoServer,
  editTodoServer,
  toggleCompleteItemServer,
} from "@/app/actions";
import { FormContent, TodoItem } from "@/types/todoItem";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Checkbox from "../checkbox/Checkbox";
import MyAlertDialog from "../myAlertDialog/MyAlertDialog";
import MyButton from "../myButton/MyButton";
import styles from "./Detail.module.css";

type Props = { todo: TodoItem };

const Detail = ({ todo }: Props) => {
  const [isModify, setIsModify] = useState(false);
  const router = useRouter();

  const checkHandler = async () => {
    const res = await toggleCompleteItemServer(todo);
    if (res) {
      // revalidatePath(`/list/${item.id}`);
      // 토글 후 동작
    }
  };

  const deleteHandler = async () => {
    const res = await deleteTodoServer(todo.id);
    if (res) {
      router.replace("/todo-list");
    }
  };

  const isModified = (newItem: FormContent) => {
    if (todo.title === newItem.title && todo.content === newItem.content) {
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

    const res = await editTodoServer(todo.id, {
      ...newData,
    });

    if (res) {
      console.log("수정 후 동작");
    }
  };

  const closeModifyHandler = () => {
    setIsModify(false);
  };

  return !isModify ? (
    <div
      className={[
        styles.detail,
        todo.isCompleted ? styles.completed : "",
      ].join()}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Checkbox
            checked={todo.isCompleted}
            value={todo.id}
            checkHandler={checkHandler}
          />
          <label className={styles.text} htmlFor={todo.id}>
            {todo.title}
          </label>
        </div>
        <div className={styles.buttonWrapper}>
          <MyButton text="update" onClick={() => setIsModify(true)} />
          <MyAlertDialog
            trigger={<MyButton text="delete" theme="dangerous" />}
            title="정말 삭제하시겠습니까?"
            confirmHandler={deleteHandler}
          />
        </div>
      </header>
      <div>{todo.content}</div>
    </div>
  ) : (
    <div
      className={[
        styles.detail,
        todo.isCompleted ? styles.completed : "",
      ].join()}>
      <form action={submitHandler}>
        <fieldset className={styles.Fieldset}>
          <input
            className={styles.Input}
            name="title"
            placeholder="todo-list 구현하기"
            defaultValue={todo.title}
            maxLength={30}
          />
        </fieldset>
        <fieldset className={styles.Fieldset}>
          <textarea
            className={styles.textarea}
            name="content"
            placeholder="8/23까지 todo-list 구현하고 제출하기"
            defaultValue={todo.content}
            maxLength={140}
          />
        </fieldset>
        <div className={styles.buttonWrapper}>
          <MyButton
            text="previous"
            theme="dangerous"
            onClick={closeModifyHandler}
          />
          <MyButton text="ok" />
        </div>
      </form>
    </div>
  );
};

export default Detail;
