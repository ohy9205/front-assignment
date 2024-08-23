import List from "@/components/list/List";
import style from "./page.module.css";

const TodoList = async () => {
  return (
    <main className={style.main}>
      <List />
    </main>
  );
};

export default TodoList;
