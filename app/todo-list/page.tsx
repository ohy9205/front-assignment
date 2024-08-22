import { getList } from "@/apis/api";
import { TodoItem } from "@/types/todoItem";
import style from "./page.module.css";

const TodoList = async () => {
  const res = await getList();

  return (
    <main className={style.main}>
      {typeof res === "string"
        ? res
        : res?.map((item: TodoItem) => (
            <article key={item.id}>
              <h2>{item.title}</h2>
            </article>
          ))}
    </main>
  );
};

export default TodoList;
