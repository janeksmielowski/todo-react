import axios from "axios";
import { TodoContract } from "./App.types";

export const createTodo = (text: string) => {
  return axios.post<TodoContract[]>("/api/todos", { text });
};

export const getTodos = () => {
    return axios.get<TodoContract[]>("/api/todos");
};

export const toggleTodo = (id: string, done: boolean) => {
    return axios.put<TodoContract[]>(`/api/todos/${id}`, { done });
};

export const deleteTodo = (id: string) => {
    return axios.delete<void>(`/api/todos/${id}`);
};
