import { createTodo, getList } from "@/apis/api";
import { FormContent, TodoItem } from "@/types/todoItem";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import Item from "../item/Item";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import MyButton from "../myButton/MyButton";
import TodoDialog from "../todoDialog/TodoDialog";
import styles from "./List.module.css";

const List = async () => {
  const res = await getList();

  const createHandler = async (newData: FormContent) => {
    "use server";

    const rs = await createTodo(newData);

    if (rs.result === "success") {
      revalidatePath("/list");
    }
    return rs;
  };

  return (
    <div className={styles.list}>
      <div className={styles.create}>
        <TodoDialog
          trigger={<MyButton text="create" />}
          header="Create todo"
          submitHandler={createHandler}
        />
      </div>
      <div className={styles.inner}>
        <Suspense fallback={<LoadingSpinner type="data" />}>
          {res.result === "fail"
            ? res.data
            : res.data.map((item: TodoItem) => (
                <Item item={item} key={item.id} />
              ))}
        </Suspense>
      </div>
    </div>
  );
};

export default List;
