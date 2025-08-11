import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "./styles/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactGA from "react-ga4";
import { TabProvider } from "./contexts/TabContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<TabProvider>
				<App />
			</TabProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);

ReactGA.initialize("G-CNL04DEEQN");
