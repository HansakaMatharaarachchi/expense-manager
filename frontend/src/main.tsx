import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					{routes.map((route, index) => (
						<Route key={index} path={route.path} element={route.element} />
					))}
				</Routes>
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
