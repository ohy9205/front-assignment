import { createTodo, getList } from "@/apis/api";
import { TodoForm, TodoItem } from "@/types/todoItem";
import Item from "../item/Item";
import MyButton from "../myButton/MyButton";
import TodoDialog from "../todoDialog/TodoDialog";
import styles from "./List.module.css";

const List = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await getList();

  const createHandler = () => async (todo: TodoForm) => {
    "use server";

    const res = await createTodo(todo);
  };

  return (
    <div className={styles.list}>
      <div className={styles.create}>
        <TodoDialog
          trigger={<MyButton text="create" />}
          header="Create todo"
          submitHandler={createHandler()}
        />
      </div>
      <div className={styles.inner}>
        {typeof data === "string"
          ? data
          : data?.map((item: TodoItem) => <Item item={item} />)}
      </div>
    </div>
  );
};

export default List;
