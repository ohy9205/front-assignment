"use client";

import { toggleCompletItem } from "@/apis/api";
import { TodoItem } from "@/types/todoItem";
import { useState } from "react";
import Button from "../button/Button";
import Checkbox from "../checkbox/Checkbox";
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
    <article key={state.id} className={styles.article}>
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
          <Button text="update" />
          <Button text="delete" theme="dangerous" />
        </div>
      </header>
      <div className={styles.content}>{state.content}</div>
    </article>
  );
};

export default Item;
