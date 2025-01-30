import { create } from 'zustand';
import type { TodoStore } from './todo.types';

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    isLoading: false,
    error: null,

    addTodo: (title) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: crypto.randomUUID(),
                    title,
                    completed: false,
                    createdAt: new Date(),
                },
            ],
        })),

    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        })),

    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),

    setError: (error) => set({ error }),
    setLoading: (isLoading) => set({ isLoading }),
}));