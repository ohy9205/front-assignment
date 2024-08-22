import { TodoItem } from "@/types/todoItem";
import Button from "../button/Button";
import Checkbox from "../checkbox/Checkbox";
import styles from "./Item.module.css";

type Props = {
  item: TodoItem;
};

const Item = ({ item }: Props) => {
  return (
    <article key={item.id} className={styles.article}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Checkbox
            value={item.id}
            label={<h2 className={styles.text}>{item.title}</h2>}
            // checkHandler={async () => {
            //   await toggleItem(item);
            // }}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button text="update" />
          <Button text="delete" theme="dangerous" />
        </div>
      </header>
      <div className={styles.content}>{item.content}</div>
    </article>
  );
};

export default Item;
