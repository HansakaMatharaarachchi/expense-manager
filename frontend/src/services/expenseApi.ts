import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EXPENSE_API_URL } from "../constants";
import { Expense } from "../interfaces";

export const expenseApi = createApi({
	reducerPath: "expenseApi",
	tagTypes: ["Expense"],
	baseQuery: fetchBaseQuery({ baseUrl: EXPENSE_API_URL }),
	endpoints: (builder) => ({
		getExpenses: builder.query<Expense[], string | null>({
			query: (category) => ({
				url: category ? `?category=${category}` : "",
			}),
			transformResponse: (response: { data: Expense[] }) => {
				return response.data;
			},
			providesTags: ["Expense"],
		}),
		createExpense: builder.mutation({
			query: (body) => ({
				url: "",
				method: "POST",
				body,
			}),
			transformResponse: (response: { data: Expense }) => {
				return response.data;
			},
			invalidatesTags: ["Expense"],
		}),
		updateExpense: builder.mutation({
			query: ({ id, ...body }) => ({
				url: `${id}/`,
				method: "PATCH",
				body,
			}),
			transformResponse: (response: { data: Expense }) => {
				return response.data;
			},
			invalidatesTags: ["Expense"],
		}),
		deleteExpense: builder.mutation({
			query: (id) => ({
				url: `${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: ["Expense"],
		}),
	}),
});

export const {
	useGetExpensesQuery,
	useCreateExpenseMutation,
	useUpdateExpenseMutation,
	useDeleteExpenseMutation,
} = expenseApi;
