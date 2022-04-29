import { Link } from "react-router-dom";
const allowedModules = {
	views: [
		"Dashboard",
		"Employees",
		"Documents",
		"Jobs",
		"Customers",
		"Customer References",
		"Insurance Companies",
		"Appointments",
	],
};

const MenuItem = ({ display }: { display: string }) => {
	return (
		<li>
			<Link
				to={`localhost:300/${display}`}
				className="flex gap-x-6 items-start py-3 px-6 hover:bg-blue hover:font-medium"
			>
				<img
					src="http://cdn.onlinewebfonts.com/svg/img_233159.png"
					className="w-5 h-5 fill-current"
				/>
				<span>{display}</span>
			</Link>
		</li>
	);
};

export const Menu = () => {
	const { views } = allowedModules;

	return (
		<ul className="flex flex-col gap-y-2">
			{views.map((module, index) => (
				<MenuItem key={index} display={module} />
			))}
		</ul>
	);
};
