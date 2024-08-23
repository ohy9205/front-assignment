export type TodoItem = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isCompleted: boolean;
};

export type TodoForm = Pick<TodoItem, "id" | "title" | "content">;

export type FormContent = Pick<TodoItem, "title" | "content">;
