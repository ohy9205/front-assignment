"use server";

import { deleteTodo, editTodo, toggleCompletItem } from "@/apis/api";
import { TodoForm, TodoItem } from "@/types/todoItem";

export const check = async (todo: TodoItem) => {
  return await toggleCompletItem(todo);
};

export const edit = async (todo: TodoForm) => {
  return await editTodo(todo);
};

export const remove = async (id: string) => {
  return await deleteTodo(id);
};
