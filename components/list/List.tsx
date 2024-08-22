import { getList } from "@/apis/api";
import { TodoItem } from "@/types/todoItem";
import Item from "../item/Item";
import styles from "./List.module.css";

const List = async () => {
  const data = await getList();
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className={styles.list}>
      {typeof data === "string"
        ? data
        : data?.map((item: TodoItem) => <Item item={item} />)}
    </div>
  );
};

export default List;
