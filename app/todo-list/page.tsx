import { getList } from "@/apis/api";
import List from "@/components/list/List";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { Suspense } from "react";
import style from "./page.module.css";

const TodoList = async () => {
  const res = await getList();

  return (
    <main className={style.main}>
      <h1 className="header">Todo List🗒️</h1>

      <Suspense fallback={<LoadingSpinner type="data" />}>
        <List data={res} />
      </Suspense>
      <div>다음</div>
    </main>
  );
};

export default TodoList;
