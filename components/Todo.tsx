"use client";

import { Todo as TodoModel } from "@prisma/client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { useState } from "react";
import AddEditTodoDialog from "./AddEditTodoDialog";

interface TodoProps {
	todo: TodoModel;
}

export default function Todo({ todo }: TodoProps) {
	const [showEditDialog, setShowEditDialog] = useState(false);

	return (
		<>
			<Card
				className="cursor-pointer hover:shadow-lg transition-shadow"
				onClick={() => setShowEditDialog(true)}>
				<CardHeader>
					<CardTitle>{todo.title}</CardTitle>
				</CardHeader>
			</Card>
			<AddEditTodoDialog
				open={showEditDialog}
				setOpen={setShowEditDialog}
				todoToEdit={todo}
			/>
		</>
	);
}
