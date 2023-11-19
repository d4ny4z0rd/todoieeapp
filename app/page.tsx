import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ListChecks } from "lucide-react";

export default function Home() {
	const { userId } = auth();

	if (userId) redirect("/todos");

	return (
		<main className="flex flex-col h-screen items-center justify-center gap-14">
			<div className="flex items-center gap-4">
				<ListChecks size={60} />
				<span className="tracking-tight text-5xl lg:text-7xl">Todoiee</span>
			</div>
			<p className="text-center max-w-prose lg:text-2xl">
				Meet Todoiee, your go-to app for seamless task management. Prioritize,
				organize, and conquer your todos with its intuitive interface and smart
				features, all in the palm of your hand.
			</p>
			<Button asChild size={"lg"} variant={"ghost"}>
				<Link href={"/todos"} className="lg:text-lg">
					Try Todoiee
				</Link>
			</Button>
		</main>
	);
}
