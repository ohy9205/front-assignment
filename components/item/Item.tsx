import { editTodo, toggleCompletItem } from "@/apis/api";
import { TodoForm, TodoItem } from "@/types/todoItem";
import { revalidatePath } from "next/cache";
import Checkbox from "../checkbox/Checkbox";
import MyButton from "../myButton/MyButton";
import TodoDialog from "../todoDialog/TodoDialog";
import styles from "./Item.module.css";

type Props = {
  item: TodoItem;
};

const Item = ({ item }: Props) => {
  console.log("item 컴포");

  const checkHandler = (item: TodoItem) => async () => {
    "use server";
    const res = await toggleCompletItem(item);
    revalidatePath(`/list:${item.id}`);
  };

  const editTodoHandler = async (todo: TodoForm) => {
    "use server";
    const res = await editTodo(todo);
  };

  return (
    <article
      key={item.id}
      className={[
        styles.article,
        item.isCompleted ? styles.completed : "",
      ].join(" ")}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Checkbox
            checked={item.isCompleted}
            value={item.id}
            checkHandler={checkHandler(item)}
          />
          <label className={styles.text} htmlFor={item.id}>
            {item.title}
          </label>
        </div>
        <div className={styles.buttonWrapper}>
          <TodoDialog
            header="Update todo"
            trigger={<MyButton text="update" />}
            initItem={item}
            submitHandler={editTodoHandler}
          />
          <MyButton
            text="delete"
            theme="dangerous"
            onClick={async () => {
              "use server";
            }}
          />
        </div>
      </header>
      <div className={styles.content}>{item.content}</div>
    </article>
  );
};

export default Item;
