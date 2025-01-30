export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export interface TodoState {
    todos: Todo[];
    isLoading: boolean;
    error: string | null;
}

export interface TodoActions {
    addTodo: (title: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    setError: (error: string | null) => void;
    setLoading: (isLoading: boolean) => void;
}

export type TodoStore = TodoState & TodoActions;