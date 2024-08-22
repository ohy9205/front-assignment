import List from "@/components/list/List";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { Suspense } from "react";
import style from "./page.module.css";

const TodoList = async () => {
  return (
    <main className={style.main}>
      <h1 className="header">Todo List🗒️</h1>

      <Suspense fallback={<LoadingSpinner type="data" />}>
        <List />
      </Suspense>
    </main>
  );
};

export default TodoList;
