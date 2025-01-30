import type { TodoState } from './todo.types';

export const selectTodos = (state: TodoState) => state.todos;
export const selectIsLoading = (state: TodoState) => state.isLoading;
export const selectError = (state: TodoState) => state.error;
export const selectCompletedTodos = (state: TodoState) =>
    state.todos.filter(todo => todo.completed);
export const selectIncompleteTodos = (state: TodoState) =>
    state.todos.filter(todo => !todo.completed);
export const selectTodoCount = (state: TodoState) => state.todos.length;
export const selectCompletedCount = (state: TodoState) =>
    state.todos.filter(todo => todo.completed).length;