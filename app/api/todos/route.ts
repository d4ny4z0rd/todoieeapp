import prisma from "@/lib/db/prisma";
import {
	createTodoSchema,
	deleteTodoSchema,
	updateTodoSchema,
} from "@/lib/validation/todo";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const parsedResult = createTodoSchema.safeParse(body);

		if (!parsedResult.success) {
			console.log(parsedResult.error);
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const { title } = parsedResult.data;

		const { userId } = auth();

		if (!userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const todo = await prisma.todo.create({
			data: {
				title,
				userId,
			},
		});

		return Response.json({ todo }, { status: 201 });
	} catch (error) {
		console.log(error);
		return Response.json({ error: "Internal Server error" }, { status: 500 });
	}
}

export async function PUT(req: Request) {
	try {
		const body = await req.json();

		const parseResult = updateTodoSchema.safeParse(body);

		if (!parseResult.success) {
			console.error(parseResult.error);
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const { id, title } = parseResult.data;

		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo) {
			return Response.json({ error: "Note not found" }, { status: 404 });
		}

		const { userId } = auth();

		if (!userId || userId !== todo.userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		const updatedTodo = await prisma.todo.update({
			where: { id },
			data: {
				title,
			},
		});

		return Response.json({ updatedTodo }, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	try {
		const body = await req.json();

		const parseResult = deleteTodoSchema.safeParse(body);

		if (!parseResult.success) {
			console.error(parseResult.error);
			return Response.json({ error: "Invalid input" }, { status: 400 });
		}

		const { id } = parseResult.data;

		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo) {
			return Response.json({ error: "Note not found" }, { status: 404 });
		}

		const { userId } = auth();

		if (!userId || userId !== todo.userId) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

		await prisma.todo.delete({ where: { id } });

		return Response.json({ message: "Todo deleted" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}
