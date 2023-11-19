import Todo from "@/components/Todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { Delete, FileEdit, ThumbsUp, Trash2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Todoiee",
	description: "The todoiee app",
};

export default async function TodosPage() {
	const { userId } = auth();

	if (!userId) throw Error("userId undefined");

	const allTodos = await prisma.todo.findMany({
		where: {
			userId,
		},
	});

	return (
		<>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
				{allTodos.map((todo) => (
					<Todo todo={todo} key={todo.id} />
				))}
				{allTodos.length === 0 && (
					<div className="col-span-full text-center">
						{"You don't have any todos yet. Why don't you create one?"}
					</div>
				)}
			</div>
		</>
	);
}
