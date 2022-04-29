import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "hooks/useAuth";
import { Avatar } from "components/Avatar";

export const Header = () => {
	const { signout } = useAuth();
	return (
		<header className="flex justify-between items-center shadow-sm shadow-neutral-300  px-12 py-3  w-full bg-white">
			<div>
				<input
					type="search"
					placeholder="Search..."
					className="text-sm placeholder-slate-400  font-normal shadow-inner shadow-slate-100 rounded-md outline-none pl-6 pr-4 py-2 w-64"
					style={{
						border: "1px solid rgb(232 232 232)",
					}}
				/>
			</div>
			<div className="flex items-center gap-x-8">
				<div>
					<FontAwesomeIcon
						icon={faBars}
						className="text-xl text-slate-400 hover:text-slate-700"
					/>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faBell}
						className="text-xl text-slate-400 hover:text-slate-700"
					/>
				</div>
				<div className="flex space-x-4">
					<div className="flex-shrink-0">
						<Avatar
							src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
							alt=""
							className="w-10 h-10 object-cover rounded-full"
						/>
					</div>
					<div className="flex flex-col items-end justify-center">
						<span className="text-sm font-semibold text-slate-700">
							Luis Miguel
						</span>
						<span className="text-xs text-slate-400">Admin</span>
					</div>
				</div>
			</div>
		</header>
	);
};
