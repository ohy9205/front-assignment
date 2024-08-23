"use server";

import {
  createTodo,
  deleteTodo,
  editTodo,
  toggleCompleteItem,
} from "@/apis/api";
import { FormContent, TodoItem } from "@/types/todoItem";

export const editTodoServer = async (id: string, todo: FormContent) => {
  return await editTodo(id, todo);
};

export const deleteTodoServer = async (id: string) => {
  return await deleteTodo(id);
};

export const createTodoServer = async (item: FormContent) => {
  return await createTodo(item);
};

export const toggleCompleteItemServer = async (todo: TodoItem) => {
  return await toggleCompleteItem(todo);
};
