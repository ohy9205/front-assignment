import { getList } from "@/apis/api";
import { TodoItem } from "@/types/todoItem";
import Item from "../item/Item";
import MyButton from "../myButton/MyButton";
import styles from "./List.module.css";

const List = async () => {
  const data = await getList();
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className={styles.list}>
      <div className={styles.create}>
        <MyButton text="create" clickHandler={() => {}} />
      </div>
      <div className={styles.inner}>
        {typeof data === "string"
          ? data
          : data?.map((item: TodoItem) => <Item item={item} />)}
      </div>
    </div>
  );
};

export default List;
