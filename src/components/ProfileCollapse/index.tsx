import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faImagePortrait,
	faCogs,
	faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "components/Avatar";

export const ProfileCollapse = () => {
	return (
		<div className="flex flex-col justify-between  w-screen max-w-md">
			<div className="flex items-center gap-x-4">
				<Avatar
					src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
					alt=""
					className="w-32 h-32 object-cover rounded-tl-md rounded-br-md"
				/>

				<div className="flex flex-wrap">
					<h1 className="flex-auto text-base font-semibold text-slate-900">
						Classic Utility Jacket
					</h1>
					<div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
						In stock
					</div>
				</div>
			</div>

			<div className="flex space-x-2 justify-end py-4 px-6">
				<button className="border-2 border-blue-light text-blue-light uppercase text-xs font-semibold px-4 py-2 rounded-sm whitespace-nowrap space-x-2">
					<FontAwesomeIcon icon={faCogs} />
					<span>Settings</span>
				</button>
				<button className="bg-blue-dark text-white uppercase text-xs font-semibold px-4 py-2 rounded-sm whitespace-nowrap space-x-2">
					<FontAwesomeIcon icon={faSignOut} />
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
};
