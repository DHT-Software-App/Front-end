import { Logo } from "components/Logo";
import { Menu } from "components/Menu";
import { useCan } from "hooks/useCan";
import { Link } from "react-router-dom";

export const SideBar = () => {
	const { can } = useCan();

	return (
		<aside className="w-64 h-screen bg-blue-dark text-sm text-gray py-4 font-normal flex flex-col justify-between ">
			<div className="flex justify-center">
				<Logo className="w-28" />
			</div>
			<Menu />
			<div>
				<ul>
					<li>
						<Link
							to={`localhost:300/`}
							className="flex gap-x-5 pl-6 items-start py-4 px-4 hover:bg-blue hover:font-medium"
						>
							<img
								src="http://cdn.onlinewebfonts.com/svg/img_233159.png"
								className="w-5 h-5 fill-current"
							/>
							<span>Logout</span>
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	);
};
