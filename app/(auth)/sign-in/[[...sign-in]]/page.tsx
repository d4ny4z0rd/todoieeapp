import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Todoiee - Sign-in",
	description: "The todo app",
};

export default function Page() {
	return (
		<div className="flex h-screen items-center justify-center">
			<SignIn appearance={{ variables: { colorPrimary: "black" } }} />
		</div>
	);
}
