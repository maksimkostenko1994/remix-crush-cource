import {useFetcher, useLoaderData} from "@remix-run/react";
import {TodoForm, TodoList} from "~/components/todo";
import {todoService} from "~/services/todo.server";

export async function loader() {
    // Add artificial delay to make loading state visible
    await new Promise(resolve => setTimeout(resolve, 500));
    const todos = await todoService.getAllTodos();
    return Response.json({ todos });
}

export default function Index() {
    const { todos } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();

    const handleAddTodo = (title: string) => {
        fetcher.submit(
            { title },
            { method: "POST", action: "/api/todos" }
        );
    };

    const handleToggleTodo = (id: string) => {
        fetcher.submit(
            { id, action: "toggle" },
            { method: "PUT", action: "/api/todos" }
        );
    };

    const handleRemoveTodo = (id: string) => {
        fetcher.submit(
            { id },
            { method: "DELETE", action: "/api/todos" }
        );
    };

    const todoCount = todos.length;
    const completedCount = todos.filter((todo: { completed: boolean; }) => todo.completed).length;

    return (
        <main className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Todo List</h1>

                {/* Added loading indicator */}
                {fetcher.state !== 'idle' && (
                    <div className="text-sm text-blue-500 mb-2">
                        Saving changes...
                    </div>
                )}

                {/* Stats */}
                <div className="text-sm text-gray-600 mb-4">
                    {todoCount === 0 ? (
                        "No todos yet"
                    ) : (
                        `${completedCount} of ${todoCount} completed`
                    )}
                </div>

                {/* Form */}
                <div className="mb-6">
                    <TodoForm onSubmit={handleAddTodo} />
                </div>

                {/* List */}
                <TodoList
                    todos={todos}
                    onToggle={handleToggleTodo}
                    onRemove={handleRemoveTodo}
                />
            </div>
        </main>
    );
}