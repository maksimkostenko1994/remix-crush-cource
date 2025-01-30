import { Button, Input } from '~/components/ui';
import React from "react";

interface TodoFormProps {
    onSubmit: (title: string) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const title = formData.get('title') as string;

        if (title.trim()) {
            onSubmit(title);
            form.reset();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                type="text"
                name="title"
                placeholder="Add new todo..."
                className="flex-1"
            />
            <Button type="submit">Add</Button>
        </form>
    );
}