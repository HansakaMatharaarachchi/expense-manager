import { ExpenseCategory } from "../constants";
import ExpenseCard from "../components/ExpenseCard";
import { useGetExpensesQuery } from "../services/expenseApi";
import { useNavigate, useParams } from "react-router-dom";

const ExpenseContainer = () => {
	const { category = null } = useParams();
	const navigate = useNavigate();

	const {
		data: expenses = [],
		isExpensesLoading,
		isExpensesError,
	} = useGetExpensesQuery(category, {
		refetchOnMountOrArgChange: true,
	});

	return (
		<div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
			<div className="flex justify-between items-center mb-6">
				<div className="relative w-64">
					<select
						onChange={(e) => {
							const category = e.target.value;

							if (category) {
								navigate(`/expenses/${category}`);
							}
						}}
						value={category ?? ""}
						className="appearance-none w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-gray-600"
					>
						<option value="">Select a Category</option>
						{Object.values(ExpenseCategory).map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
						<svg
							className="fill-current h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
						</svg>
					</div>
				</div>

				<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
					Create Expense
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{expenses.map((expense) => (
					<ExpenseCard key={expense.id} expense={expense} />
				))}
			</div>
		</div>
	);
};

export default ExpenseContainer;
