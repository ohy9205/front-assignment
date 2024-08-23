import { getTodo } from "@/apis/api";
import Detail from "@/components/detail/Detail";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { Suspense } from "react";

type Params = { params: { id: string[] } };

const TodoItem = async ({ params: { id } }: Params) => {
  const result = await getTodo(id[0]);
  console.log(result);

  return (
    <main>
      <Suspense fallback={<LoadingSpinner type="data" />}>
        {result.result === "fail" ? result.data : <Detail todo={result.data} />}
      </Suspense>
    </main>
  );
};

export default TodoItem;
