"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { ListChecks } from "lucide-react";
import { useState } from "react";
import AddEditNoteDialog from "./AddEditTodoDialog";
import AddEditTodoDialog from "./AddEditTodoDialog";
import { useTheme } from "next-themes";
import ThemeToggleButton from "./ThemeToggleButton";
import { dark } from "@clerk/themes";

export default function Navbar() {
	const { theme } = useTheme();
	const [showAddEditNoteDialog, setshowAddEditNoteDialog] = useState(false);

	return (
		<>
			<div className="p-4 shadown">
				<div className="max-w-7xl m-auto flex flex-wrap gap-3 items-center justify-between">
					<Link href={"/"} className="flex items-center gap-1">
						<ListChecks size={30} />
						<span className="font-semibold text-3xl">Todoiee</span>
					</Link>
					<div className="flex items-center gap-6">
						<Button
							className="lg:text-lg"
							onClick={() => setshowAddEditNoteDialog(true)}>
							Add Todo
						</Button>
						<ThemeToggleButton />
						<UserButton
							afterSignOutUrl="/"
							appearance={{
								baseTheme: theme === "dark" ? dark : undefined,
								elements: {
									avatarBox: { width: "2.5rem", height: "2.5rem" },
								},
							}}
						/>
					</div>
				</div>
			</div>
			<AddEditTodoDialog
				open={showAddEditNoteDialog}
				setOpen={setshowAddEditNoteDialog}
			/>
		</>
	);
}
