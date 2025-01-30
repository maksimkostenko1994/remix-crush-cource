// app/services/todo.server.ts
import type { Todo } from '~/stores/todo/todo.types';

// Initial mock data
const mockTodos: Todo[] = [
    {
        id: crypto.randomUUID(),
        title: "Learn Remix basics",
        completed: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
        id: crypto.randomUUID(),
        title: "Build a todo app",
        completed: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
        id: crypto.randomUUID(),
        title: "Add server-side functionality",
        completed: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
        id: crypto.randomUUID(),
        title: "Implement authentication",
        completed: false,
        createdAt: new Date() // today
    },
    {
        id: crypto.randomUUID(),
        title: "Add persistent storage",
        completed: false,
        createdAt: new Date() // today
    }
];

// Simulated database
let todos: Todo[] = [...mockTodos];

export class TodoService {
    async getAllTodos(): Promise<Todo[]> {
        console.log('📖 Server: Fetching all todos:', todos);
        return todos;
    }

    async createTodo(title: string): Promise<Todo> {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            createdAt: new Date(),
        };

        todos = [...todos, newTodo];
        console.log('✨ Server: Created new todo:', newTodo);
        console.log('📦 Server: Current todos:', todos);
        return newTodo;
    }

    async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo | null> {
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) return null;

        const updatedTodo = { ...todos[todoIndex], ...updates };
        todos = todos.map(todo => todo.id === id ? updatedTodo : todo);
        console.log('🔄 Server: Updated todo:', updatedTodo);
        return updatedTodo;
    }

    async deleteTodo(id: string): Promise<boolean> {
        const initialLength = todos.length;
        todos = todos.filter(todo => todo.id !== id);
        const success = todos.length !== initialLength;
        console.log('🗑️ Server: Deleted todo:', id, 'Success:', success);
        return success;
    }

    async toggleTodo(id: string): Promise<Todo | null> {
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return null;

        const updated = await this.updateTodo(id, { completed: !todo.completed });
        console.log('🔄 Server: Toggled todo:', updated);
        return updated;
    }
}

// Create a singleton instance
export const todoService = new TodoService();