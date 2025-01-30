import { Button } from '~/components/ui';
import type { Todo } from '~/stores/todo/todo.types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
    return (
        <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className={todo.completed ? "line-through text-gray-500" : "text-gray-800 font-medium"}>
          {todo.title}
        </span>
            </div>
            <Button
                variant="danger"
                onClick={() => onRemove(todo.id)}
            >
                Delete
            </Button>
        </li>
    );
}