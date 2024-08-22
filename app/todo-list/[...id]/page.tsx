import { getTodo } from "@/apis/api";
import Detail from "@/components/detail/Detail";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { Suspense } from "react";

type Params = { params: { id: string[] } };

const TodoItem = async ({ params: { id } }: Params) => {
  const todo = await getTodo(id[0]);

  return (
    <main>
      <Suspense fallback={<LoadingSpinner type="data" />}>
        {typeof todo === "string" ? todo : <Detail todo={todo} />}
      </Suspense>
    </main>
  );
};

export default TodoItem;
