import { z } from "zod";

export const createTodoSchema = z.object({
	title: z.string().min(1, { message: "Todo is required" }),
});

export type CreateTodoSchema = z.infer<typeof createTodoSchema>;

export const updateTodoSchema = createTodoSchema.extend({
	id: z.string().min(1),
});

export const deleteTodoSchema = z.object({
	id: z.string().min(1),
});
