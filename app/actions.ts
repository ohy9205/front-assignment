"use server";

import {
  createTodo,
  deleteTodo,
  editTodo,
  toggleCompletItem,
} from "@/apis/api";
import { FormContent, TodoForm, TodoItem } from "@/types/todoItem";

export const toggleCompletItemServer = async (item: TodoItem) => {
  return toggleCompletItem(item);
};

export const editTodoServer = async (todo: TodoForm) => {
  return await editTodo(todo);
};

export const deleteTodoServer = async (id: string) => {
  return await deleteTodo(id);
};

export const createTodoServer = async (item: FormContent) => {
  return await createTodo(item);
};

export const toggleCompleteItemServer = async (todo: TodoItem) => {
  return await toggleCompletItem(todo);
};
