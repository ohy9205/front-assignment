export type TodoItem = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isCompleted: boolean;
};

export type FormContent = Pick<TodoItem, "title" | "content">;
