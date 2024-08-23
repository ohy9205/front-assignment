"use client";

import {
  deleteTodoServer,
  editTodoServer,
  toggleCompleteItemServer,
} from "@/app/actions";
import { useTodoForm } from "@/hooks/useTodo";
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
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const checkHandler = async () => {
    const { result, data } = await toggleCompleteItemServer(todo);
    if (result === "success") {
      router.refresh();
    } else {
      return data;
    }
  };

  const deleteHandler = async () => {
    const { result, data } = await deleteTodoServer(todo.id);
    if (result === "success") {
      router.replace("/todo-list");
    } else {
      return data;
    }
  };

  const closeModifyHandler = () => {
    setIsModify(false);
  };

  const editHandler = async ({
    id,
    title,
    content,
  }: FormContent & { id: string }) => {
    const rs = await editTodoServer(id, { title, content });

    if (rs.result === "success") {
      setIsModify(false);
      router.refresh();
    }
    return rs;
  };

  const { formSubmitHandler, errorMsg } = useTodoForm(todo, editHandler);

  return !isModify ? (
    <div
      className={[styles.detail, todo.isCompleted ? styles.completed : ""].join(
        " "
      )}>
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
      <div>
        {todo.content ? (
          todo.content
        ) : (
          <span className={styles.emptyContent}>상세 내용이 없습니다.</span>
        )}
      </div>
    </div>
  ) : (
    <div
      className={[
        styles.detail,
        todo.isCompleted ? styles.completed : "",
      ].join()}>
      <form action={formSubmitHandler}>
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
        {errorMsg ? <span className={styles.error}>{errorMsg}</span> : ""}
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
