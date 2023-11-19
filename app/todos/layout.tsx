import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<main className="lg:max-w-[900px] lg:px-16 mx-auto py-8 shadow-xl min-h-screen flex flex-col px-8">
				{children}
			</main>
		</>
	);
}
