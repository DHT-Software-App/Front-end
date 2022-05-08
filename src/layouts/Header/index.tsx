import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "hooks/useAuth";
import { Avatar } from "components/Avatar";
import { ProfileCollapse } from "components/ProfileCollapse";
import { Menu, Transition } from "@headlessui/react";

export const Header = () => {
	const { signout } = useAuth();
	// #f7f7f7
	return (
		<header className="flex justify-between items-center shadow-sm shadow-neutral-300 w-full bg-white">
			<div className="ml-12">
				<input
					type="search"
					placeholder="Search..."
					className="text-sm placeholder-slate-400 bg-neutral-100 font-normal  rounded-md outline-none pl-6 pr-6 py-3 w-64"
				/>
			</div>
			<div className="flex items-center gap-x-8">
				<div>
					<FontAwesomeIcon
						icon={faBars}
						className="text-lg text-slate-500 hover:text-slate-700"
					/>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faBell}
						className="text-lg text-slate-500 hover:text-slate-700"
					/>
				</div>

				<Menu as="div" className="relative z-50">
					<Menu.Button>
						<div className="flex space-x-6 py-3 px-6 hover:cursor-pointer hover:bg-zinc-100">
							<div className="flex-shrink-0">
								<Avatar
									src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
									alt=""
									className="w-10 h-10 object-cover rounded-full"
								/>
							</div>
							<div className="flex flex-col items-end justify-center">
								<span className="text-sm font-medium text-slate-800">
									Luis Miguel
								</span>
								<span className="text-xs text-slate-500 mt-1">Admin</span>
							</div>
						</div>
					</Menu.Button>

					<Transition
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Menu.Items className="absolute right-0 mt-2 rounded-md bg-white border-zinc-200 shadow-lg border ">
							<Menu.Item>
								<ProfileCollapse />
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</header>
	);
};
