import { expenseApi } from "./services/expenseApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		[expenseApi.reducerPath]: expenseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(expenseApi.middleware),
});

setupListeners(store.dispatch);
