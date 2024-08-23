import { FormContent, TodoForm, TodoItem } from "@/types/todoItem";
import { fetchWithErorHandler } from "@/utils/fetchWithErorHandle";

const BASE_URL = "http://localhost:4000";

export const getList = async () => {
  let errorMsg = "";

  const setErrorMsg = () => {
    errorMsg = "리스트를 불러오지 못했어요.";
  };

  const list = (await fetchWithErorHandler<TodoItem[]>({
    url: BASE_URL + "/list?_sort=createdAt&_order=desc",
    errorHandler: () => {
      setErrorMsg();
    },
  })) as TodoItem[];

  if (!list) {
    setErrorMsg();
  }

  // console.log(list);
  return errorMsg ? errorMsg : list;
};

export const toggleCompletItem = async (item: TodoItem) => {
  const result = await fetchWithErorHandler<TodoItem>({
    url: `${BASE_URL}/list/${item.id}`,
    options: {
      method: "PATCH",
      body: JSON.stringify({ isCompleted: !item.isCompleted }),
    },
    errorHandler: () => {
      alert("작업을 완료하지 못했습니다. 다시 시도해주세요.");
    },
  });

  return result ? result : item;
};

export const createTodo = async (item: FormContent) => {
  const newItem: TodoItem = {
    ...item,
    id: new Date().getTime().toString(),
    createdAt: new Date().getTime().toString(),
    isCompleted: false,
  };

  const result = await fetchWithErorHandler<TodoItem>({
    url: `${BASE_URL}/list`,
    options: {
      method: "POST",
      body: JSON.stringify(newItem),
    },
    errorHandler: () => {
      alert("생성에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return result;
};

export const editTodo = async (item: TodoForm) => {
  const result = await fetchWithErorHandler<TodoItem>({
    url: `${BASE_URL}/list/${item.id}`,
    options: {
      method: "PATCH",
      body: JSON.stringify(item),
    },
    errorHandler: () => {
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    },
  });

  console.log(result);

  return result;
};

export const deleteTodo = async (id: string) => {
  const result = await fetchWithErorHandler<TodoItem>({
    url: `${BASE_URL}/list/${id}`,
    options: {
      method: "DELETE",
    },
    errorHandler: () => {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return result;
};

export const getTodo = async (id: string) => {
  let errorMsg = "";

  const setErrorMsg = () => {
    errorMsg = "데이터를 불러오지 못했어요.";
  };

  const result = (await fetchWithErorHandler<TodoItem>({
    url: `${BASE_URL}/list/${id}`,
    errorHandler: () => {
      alert("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
    },
  })) as TodoItem;

  if (!result) {
    setErrorMsg();
  }

  return errorMsg ? errorMsg : result;
};
