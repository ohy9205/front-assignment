import { TodoItem } from "@/types/todoItem";
import Button from "../button/Button";
import styles from "./List.module.css";

type Props = {
  data: TodoItem[] | string;
};

const List = async ({ data }: Props) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className={styles.list}>
      {typeof data === "string"
        ? data
        : data?.map(({ id, content, title }: TodoItem) => (
            <article key={id} className={styles.article}>
              <header className={styles.header}>
                <div className={styles.titleWrapper}>
                  <input type="checkbox" />
                  <h2 className={styles.text}>{title}</h2>
                </div>
                <div className={styles.buttonWrapper}>
                  <Button text="update" />
                  <Button text="delete" theme="dangerous" />
                </div>
              </header>
              <div className={styles.content}>{content}</div>
            </article>
          ))}
    </div>
  );
};

export default List;
