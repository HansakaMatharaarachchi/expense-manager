import { Edit, Trash2 } from "lucide-react";
import { Expense } from "../interfaces";

interface ExpenseCardProps {
	expense: Expense;
}

const ExpenseCard = ({ expense }: ExpenseCardProps) => {
	return (
		<div className="bg-white shadow-md rounded-lg border border-gray-200 p-4 w-80 relative group">
			<div className="flex justify-between items-center mb-2">
				<span className="text-sm text-gray-500">{expense.date}</span>
				<div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<button className="text-blue-500 hover:text-blue-700">
						<Edit size={20} />
					</button>
					<button className="text-red-500 hover:text-red-700">
						<Trash2 size={20} />
					</button>
				</div>
			</div>

			<div className="mb-2">
				<p className="text-gray-700 font-medium truncate">
					{expense.description}
				</p>
				<p className="text-gray-500 text-sm">{expense.category}</p>
			</div>

			<div className="text-right">
				<span className="text-xl font-bold text-green-600">
					{expense.amount.toLocaleString()} LKR
				</span>
			</div>

			<div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
		</div>
	);
};

export default ExpenseCard;
