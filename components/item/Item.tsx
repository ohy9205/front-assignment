"use client";

import { toggleCompletItem } from "@/apis/api";
import { TodoItem } from "@/types/todoItem";
import { useState } from "react";
import Checkbox from "../checkbox/Checkbox";
import MyButton from "../myButton/MyButton";
import styles from "./Item.module.css";

type Props = {
  item: TodoItem;
};

const Item = ({ item }: Props) => {
  const [state, setState] = useState(item);

  const checkHandler = (item: TodoItem) => async () => {
    const res = await toggleCompletItem(item);
    setState(res);
  };

  return (
    <article
      key={state.id}
      className={[
        styles.article,
        state.isCompleted ? styles.completed : "",
      ].join(" ")}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Checkbox
            checked={state.isCompleted}
            value={state.id}
            checkHandler={checkHandler(state)}
          />
          <label className={styles.text} htmlFor={state.id}>
            {state.title}
          </label>
        </div>
        <div className={styles.buttonWrapper}>
          <MyButton text="update" onClick={() => {}} />
          <MyButton text="delete" theme="dangerous" onClick={() => {}} />
        </div>
      </header>
      <div className={styles.content}>{state.content}</div>
    </article>
  );
};

export default Item;
