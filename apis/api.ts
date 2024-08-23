import { TodoForm, TodoItem } from "@/types/todoItem";
import { fetchWithErorHandler } from "@/utils/fetchWithErorHandle";

type ResponseData = Promise<{
  result: Result;
  data: any;
}>;

type Result = "success" | "fail";

const BASE_URL = "http://localhost:4000";

let errorMsg = "";

const setErrorMsg = (msg: string) => {
  errorMsg = msg;
};

export const getList = async (): Promise<ResponseData> => {
  const result = (await fetchWithErorHandler<TodoItem[]>({
    url: BASE_URL + "/list?_sort=createdAt&_order=desc",
    errorHandler: () => {
      setErrorMsg("리스트를 불러오지 못했어요.");
    },
  })) as TodoItem[];

  return {
    result: errorMsg ? "fail" : "success",
    data: result ? result : errorMsg,
  };
};

export const toggleCompletItem = async (
  item: TodoItem
): Promise<ResponseData> => {
  const result = await fetchWithErorHandler<TodoItem>({
    url: `${BASE_URL}/list/${item.id}`,
    options: {
      method: "PATCH",
      body: JSON.stringify({ isCompleted: !item.isCompleted }),
    },
    errorHandler: () => {
      setErrorMsg("작업을 완료하지 못했습니다. 다시 시도해주세요.");
    },
  });

  return {
    result: errorMsg ? "fail" : "success",
    data: result ? result : errorMsg,
  };
};

export const editTodo = async (item: TodoForm): Promise<ResponseData> => {
  const result = await fetchWithErorHandler<TodoItem>({
    url: `${BASE_URL}/list/${item.id}`,
    options: {
      method: "PATCH",
      body: JSON.stringify(item),
    },
    errorHandler: () => {
      setErrorMsg("수정에 실패했습니다. 다시 시도해주세요.");
    },
  });

  console.log(result);

  return {
    result: errorMsg ? "fail" : "success",
    data: result ? result : errorMsg,
  };
};

export const deleteTodo = async (id: string): Promise<ResponseData> => {
  const result = await fetchWithErorHandler<TodoItem>({
    url: `${BASE_URL}/list/${id}`,
    options: {
      method: "DELETE",
    },
    errorHandler: () => {
      setErrorMsg("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return {
    result: errorMsg ? "fail" : "success",
    data: result ? result : errorMsg,
  };
};

export const getTodo = async (id: string): Promise<ResponseData> => {
  const result = (await fetchWithErorHandler<TodoItem>({
    url: `${BASE_URL}/list/${id}`,
    errorHandler: () => {
      setErrorMsg("불러오는데 실패했습니다. 다시 시도해주세요.");
    },
  })) as TodoItem;

  return {
    result: errorMsg ? "fail" : "success",
    data: result ? result : errorMsg,
  };
};
