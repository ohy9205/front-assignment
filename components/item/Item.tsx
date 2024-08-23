import { deleteTodo, toggleCompletItem } from "@/apis/api";
import { TodoItem } from "@/types/todoItem";
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

const Item = ({ item }: Props) => {
  const checkHandler = async () => {
    "use server";
    const res = await toggleCompletItem(item);
    if (res) {
      revalidatePath(`/list/${item.id}`);
    }
  };

  // const editTodoHandler = async (todo: TodoForm) => {
  //   "use server";
  //   const res = await editTodo(todo);
  //   if (res) {
  //     revalidatePath(`/list`);
  //   }
  // };

  const deleteTodoHandler = async () => {
    "use server";
    const res = await deleteTodo(item.id);
    if (res) {
      revalidatePath(`/list`);
    }
  };

  const cancleHandler = () => {};

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
