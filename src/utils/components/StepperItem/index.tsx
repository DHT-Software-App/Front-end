import { BadgeCheckIcon as Unchecked } from "@heroicons/react/outline";

import { BadgeCheckIcon as Checked } from "@heroicons/react/solid";

import { Loading } from "utils/components/Loading";

export interface StepperItemProps {
	loading?: boolean;
	checked?: boolean;
	invalid?: boolean;
	title: string;
	description: string;
}

export const StepperItem = ({
	loading = false,
	checked = false,
	invalid = false,
	title,
	description,
}: StepperItemProps) => {
	return (
		<div className="flex gap-x-4">
			{loading ? (
				<Loading width="48px" />
			) : checked ? (
				<Checked
					className={`${
						invalid ? "text-red-500" : "text-blue"
					} h-12 w-12 flex-shrink-0`}
					aria-hidden="true"
				/>
			) : (
				<Unchecked
					className="text-slate-400 h-12 w-12 flex-shrink-0"
					aria-hidden="true"
				/>
			)}
			<div>
				<h3
					className={`${
						checked
							? invalid
								? "text-red-400"
								: "text-blue"
							: "text-slate-400"
					} font-bold text-lg`}
				>
					{title}
				</h3>
				<p
					className={`${
						checked ? "text-slate-700" : "text-slate-400"
					} text-base font-semibold tracking-wide`}
				>
					{description}
				</p>
			</div>
		</div>
	);
};
