import { TodoForm } from "@/types/todoItem";
import * as Dialog from "@radix-ui/react-dialog";
import MyButton from "../myButton/MyButton";
import styles from "./TodoDialog.module.css";

type Props = {
  trigger: React.ReactNode;
  header: string;
  initItem?: TodoForm;
  submitHandler: (todo: TodoForm) => void;
  cancleHandler?: () => void;
};

const initForm: TodoForm = { id: "", title: "", content: "" };

const TodoDialog = ({
  trigger,
  header,
  initItem = initForm,
  submitHandler,
  cancleHandler,
}: Props) => {
  const { id, title, content } = initItem;

  const isModified = async (initItem: TodoForm, newItem: TodoForm) => {
    "use server";

    if (JSON.stringify(initItem) === JSON.stringify(newItem)) {
      return false;
    }
    return true;
  };

  const isValidated = async (todo: TodoForm) => {
    "use server";

    if (!(await isModified(initItem, todo))) {
      console.log("변경된 내용이 없음");
      return;
    }

    if (!todo.title.trim()) {
      console.log("제목 빈 상태에서 추가할 수 없음");
      return false;
    }

    if (todo.title.length > 20 || todo.content.length > 140) {
      console.log("글자 수 제한");
      return false;
    }

    return true;
  };

  const submit = async (formData: FormData) => {
    "use server";

    const newData = {
      id: id ? id : new Date().getTime().toString(),
      title: formData.get("title")?.toString() || "",
      content: formData.get("content")?.toString() || "",
    };

    if (!(await isValidated(newData))) {
      console.log("유효성 검사에 실패함");
      return;
    }

    submitHandler(newData);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>{header}</Dialog.Title>

          <form action={submit}>
            <fieldset className={styles.Fieldset}>
              <input
                className={styles.Input}
                name="title"
                placeholder="todo-list 구현하기"
                defaultValue={title}
                maxLength={30}
              />
            </fieldset>
            <fieldset className={styles.Fieldset}>
              <textarea
                className={styles.textarea}
                name="content"
                placeholder="8/23까지 todo-list 구현하고 제출하기"
                defaultValue={content}
                maxLength={140}
              />
            </fieldset>
            <MyButton text="SUBMIT" size="full" />
          </form>
          <Dialog.Close asChild>
            <button
              className="IconButton"
              aria-label="Close"
              onClick={cancleHandler}>
              ✖️
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TodoDialog;
