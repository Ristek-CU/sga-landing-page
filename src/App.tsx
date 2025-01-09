import { useState } from "react";
import sgaLogo from "./assets/logo.png";

function App() {
	const [count, setCount] = useState(0);

	return (
		<main className="flex flex-col items-center justify-center w-full min-h-screen gap-4 text-white bg-blue-800 ">
			<h1 className="text-2xl font-bold">SGA LANDING PAGE</h1>
			<img src={sgaLogo} alt="SGA Logo" className="size-52" />
			<div className="flex flex-col items-center justify-center space-y-4 text-xl">
				<p>A COUNTER FOR SOME REASON: {count}</p>
				<button
					className="p-2 border border-white bg-emerald-900"
					onClick={() => setCount((prev) => prev + 1)}
				>
					Add
				</button>
			</div>
		</main>
	);
}

export default App;
