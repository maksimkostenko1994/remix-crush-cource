import type { Todo } from '~/stores/todo/todo.types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}

export function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                No todos yet. Add some!
            </div>
        );
    }

    return (
        <ul className="space-y-2">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    );
}