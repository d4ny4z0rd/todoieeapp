import { CreateTodoSchema, createTodoSchema } from "@/lib/validation/todo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Todo } from "@prisma/client";
import { useState } from "react";
import LoadingButton from "./ui/LoadingButton";

interface AddEditNoteDialogProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	todoToEdit?: Todo;
}

export default function AddEditTodoDialog({
	open,
	setOpen,
	todoToEdit,
}: AddEditNoteDialogProps) {
	const [deleteInProgress, setDeleteInProgress] = useState(false);
	const router = useRouter();
	const form = useForm<CreateTodoSchema>({
		resolver: zodResolver(createTodoSchema),
		defaultValues: {
			title: todoToEdit?.title || "",
		},
	});

	async function onSubmit(input: CreateTodoSchema) {
		try {
			if (todoToEdit) {
				const response = await fetch("/api/todos", {
					method: "PUT",
					body: JSON.stringify({
						id: todoToEdit.id,
						...input,
					}),
				});
				if (!response.ok) throw Error("Status code : " + response.status);
			} else {
				const response = await fetch("/api/todos", {
					method: "POST",
					body: JSON.stringify(input),
				});

				if (!response.ok) throw Error("Status code : " + response.status);

				form.reset();
			}
			router.refresh();
			setOpen(false);
		} catch (error) {
			console.error(error);
			alert("Something went wrong. Please try again.");
		}
	}

	async function deleteNote() {
		if (!todoToEdit) return;
		setDeleteInProgress(true);
		try {
			const response = await fetch("/api/todos", {
				method: "DELETE",
				body: JSON.stringify({
					id: todoToEdit.id,
				}),
			});
			if (!response.ok) throw Error("Status code : " + response.status);
			router.refresh();
			setOpen(false);
		} catch (error) {
			console.error(error);
			alert("Something went wrong. Please try again.");
		} finally {
			setDeleteInProgress(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{todoToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="gap-1 sm:gap-0">
							{todoToEdit && (
								<LoadingButton
									variant={"destructive"}
									loading={deleteInProgress}
									disabled={form.formState.isSubmitting}
									onClick={deleteNote}
									type="button">
									Delete
								</LoadingButton>
							)}
							<LoadingButton
								type="submit"
								loading={form.formState.isSubmitting}
								disabled={deleteInProgress}>
								Submit
							</LoadingButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
