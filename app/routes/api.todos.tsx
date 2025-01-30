import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { todoService } from "~/services/todo.server";

// GET - Fetch all todos
export async function loader({ request }: LoaderFunctionArgs) {
    const todos = await todoService.getAllTodos();
    return Response.json(todos);
}

// POST - Create new todo
// PUT - Update todo
// DELETE - Remove todo
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const method = request.method.toUpperCase();

    switch (method) {
        case "POST": {
            const title = formData.get("title");
            if (typeof title !== "string" || !title) {
                return Response.json(
                    { error: "Title is required" },
                    { status: 400 }
                );
            }
            const todo = await todoService.createTodo(title);
            return Response.json(todo);
        }

        case "PUT": {
            const id = formData.get("id");
            const action = formData.get("action");

            if (typeof id !== "string" || !id) {
                return Response.json(
                    { error: "ID is required" },
                    { status: 400 }
                );
            }

            if (action === "toggle") {
                const todo = await todoService.toggleTodo(id);
                if (!todo) {
                    return Response.json(
                        { error: "Todo not found" },
                        { status: 404 }
                    );
                }
                return Response.json(todo);
            }

            // Handle other update cases if needed
            return Response.json(
                { error: "Invalid action" },
                { status: 400 }
            );
        }

        case "DELETE": {
            const id = formData.get("id");
            if (typeof id !== "string" || !id) {
                return Response.json(
                    { error: "ID is required" },
                    { status: 400 }
                );
            }

            const success = await todoService.deleteTodo(id);
            if (!success) {
                return Response.json(
                    { error: "Todo not found" },
                    { status: 404 }
                );
            }
            return Response.json({ success: true });
        }

        default:
            return Response.json(
                { error: "Method not allowed" },
                { status: 405 }
            );
    }
}