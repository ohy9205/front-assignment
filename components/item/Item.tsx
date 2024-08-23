import { deleteTodo, editTodo, toggleCompleteItem } from "@/apis/api";
import { FormContent, TodoItem } from "@/types/todoItem";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import Checkbox from "../checkbox/Checkbox";
import MyAlertDialog from "../myAlertDialog/MyAlertDialog";
import MyButton from "../myButton/MyButton";
import TodoDialog from "../todoDialog/TodoDialog";
import styles from "./Item.module.css";

type Props = {
  item: TodoItem;
};

const Item = async ({ item }: Props) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const checkHandler = async () => {
    "use server";

    const { result } = await toggleCompleteItem(item);
    if (result === "success") {
      revalidatePath(`/list`);
    }
  };

  const deleteTodoHandler = async () => {
    "use server";
    const { result } = await deleteTodo(item.id);
    if (result === "success") {
      revalidatePath(`/list`);
    }
  };

  const editHandler = async ({
    id,
    title,
    content,
  }: FormContent & { id: string }) => {
    "use server";
    const { result } = await editTodo(id, { title, content });

    if (result === "success") {
      revalidatePath(`/list`);
    }
  };

  return (
    <article
      className={[
        styles.article,
        item.isCompleted ? styles.completed : "",
      ].join(" ")}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <Checkbox
            checked={item.isCompleted}
            value={item.id}
            checkHandler={checkHandler}
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
            isModifyMode={true}
            submitHandler={editHandler}
          />
          <MyAlertDialog
            trigger={<MyButton text="delete" theme="dangerous" />}
            title="정말 삭제하시겠습니까?"
            confirmHandler={deleteTodoHandler}
          />
        </div>
      </header>
      <div>
        <Link href={`/todo-list/${item.id}`} className={styles.content}>
          {item.content}
        </Link>
      </div>
    </article>
  );
};

export default Item;
