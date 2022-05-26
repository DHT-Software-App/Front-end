import { Logo } from "components/Logo";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {
	const [collapse, setCollapse] = useState(false);

	const toggleCollapse = () => {
		setCollapse(!collapse);
	};

	return (
		<aside
			className={`${
				collapse ? "w-20" : "w-72"
			} h-screen bg-blue-dark p-5 pt-8 relative duration-300`}
		>
			{/* <FontAwesomeIcon
				icon={faAngleLeft}
				className={`text-xs absolute cursor-pointer -right-3 top-9 w-3 h-3 p-2 shadow-sm rounded-full bg-white text-slate-500 ${
					collapse && "rotate-180"
				}`}
				onClick={toggleCollapse}
			/> */}

			<div className="flex items-center">
				<Logo className="w-28 hidden sm:block" />
			</div>

			<ul className="pt-3">
				<li
					className={`text-slate-100 text-sm flex items-center gap-x-4 cursor-pointer px-3 py-2 hover:bg-blue-light rounded-md mt-5 duration-100 ${
						collapse && "justify-center"
					}`}
				>
					{/* <FontAwesomeIcon icon={faUserTie} className="inline-block" /> */}
					<span className={`${collapse && "hidden"} origin-left duration-200`}>
						Employees
					</span>
				</li>

				<li
					className={`text-slate-100 text-sm flex items-center gap-x-4 cursor-pointer px-3 py-2 hover:bg-blue-light rounded-md mt-5 duration-100 ${
						collapse && "justify-center"
					}`}
				>
					{/* <FontAwesomeIcon icon={faTools} className="inline-block" /> */}
					<span className={`${collapse && "hidden"} origin-left duration-200`}>
						Jobs
					</span>
				</li>

				<li
					className={`text-slate-100 text-sm flex items-center gap-x-4 cursor-pointer px-3 py-2 hover:bg-blue-light rounded-md mt-5  duration-100 ${
						collapse && "justify-center"
					}`}
				>
					{/* <FontAwesomeIcon icon={faCalendar} className="inline-block" /> */}
					<span className={`${collapse && "hidden"} origin-left duration-200`}>
						Calendar
					</span>
				</li>
			</ul>
		</aside>
	);
};
