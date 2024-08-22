import { TodoItem } from "@/types/todoItem";
import { fetchWithErorHandler } from "@/utils/fetchWithErorHandle";

const BASE_URL = "http://localhost:4000";

export const getList = async () => {
  let errorMsg = "";

  const setErrorMsg = () => {
    errorMsg = "리스트를 불러오지 못했어요.";
  };

  const list = await fetchWithErorHandler<TodoItem[]>({
    url: BASE_URL + "/list",
    errorHandler: () => {
      setErrorMsg();
    },
  });

  if (!list) {
    setErrorMsg();
  }

  return errorMsg ? errorMsg : list;
};
