"use client";

import { check, remove } from "@/app/actions";
import { TodoItem } from "@/types/todoItem";
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
    await check(todo);
  };

  const deleteTodoHandler = async () => {
    const res = await remove(todo.id);
    if (res) {
      router.replace("/todo-list");
    }
  };

  return (
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
          <MyButton text="update" />
          <MyAlertDialog
            trigger={<MyButton text="delete" theme="dangerous" />}
            title="정말 삭제하시겠습니까?"
            confirmHandler={deleteTodoHandler}
          />
        </div>
      </header>
      <div>{todo.content}</div>
    </div>
  );
};

export default Detail;
