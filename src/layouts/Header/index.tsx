import { useAuth } from "hooks/useAuth";
import { Avatar } from "components/Avatar";
import { ProfileCollapse } from "components/ProfileCollapse";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import { useSelector } from "react-redux";
import { Employee } from "types/Employee";

/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import {
	BellIcon,
	MenuIcon,
	XIcon,
	ViewGridIcon,
} from "@heroicons/react/outline";
import { Logo } from "components/Logo";

export const Header = () => {
	const { signout } = useAuth();
	const {
		employee: authEmployee,
		loading,
	}: { employee: Employee; loading: boolean } = useSelector(
		({ auth }: any) => auth
	);

	return authEmployee ? (
		<Disclosure as="nav" className="bg-slate-50 ">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-blue focus:outline-none focus:ring-2 focus:ring-inset focus:to-slate-800">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex-shrink-0 flex items-center">
									<Logo className="block sm:hidden h-8 w-auto" />
								</div>
								<div className="hidden sm:block sm:ml-6">
									<div className="flex space-x-4">
										<input
											type="search"
											placeholder="Search"
											className="text-sm shadow-sm placeholder-slate-500 bg-slate-100 font-normal rounded-md outline-none pl-6 pr-6 py-3 w-full min-w-fit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
										/>
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center gap-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<button
									type="button"
									className="hidden sm:block  p-1 rounded-full text-slate-400 hover:text-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
								>
									<span className="sr-only">View more</span>
									<ViewGridIcon className="h-6 w-6" aria-hidden="true" />
								</button>

								<button
									type="button"
									className="p-1 rounded-full text-slate-400 hover:text-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
								>
									<span className="sr-only">View notifications</span>
									<BellIcon className="h-6 w-6" aria-hidden="true" />
								</button>

								{/* Profile dropdown */}
								<Menu as="div" className="ml-3 relative">
									<div>
										<Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white">
											<span className="sr-only">Open user menu</span>

											<Avatar
												src={authEmployee.user?.profile?.url || undefined}
												alt=""
												className="w-8 h-8 rounded-full"
											/>
										</Menu.Button>
									</div>

									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												<div className="px-4 py-2 flex flex-col justify-center">
													<span className="text-sm font-medium text-slate-800">
														{authEmployee.user?.profile?.nickname ||
															`${authEmployee.firstname} ${authEmployee.lastname}`}
													</span>
													<span className="text-xs text-slate-500 mt-1">
														{authEmployee.role?.title}
													</span>
												</div>
											</Menu.Item>

											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={`block text-sm px-4 py-2 ${
															active
																? "bg-slate-50 text-blue-light"
																: "text-slate-700"
														}`}
													>
														Your Profile
													</a>
												)}
											</Menu.Item>

											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={`block text-sm px-4 py-2 ${
															active
																? "bg-slate-50 text-blue-light"
																: "text-slate-700"
														}`}
													>
														Settings
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={`block text-sm px-4 py-2 ${
															active
																? "bg-slate-50 text-blue-light"
																: "text-slate-700"
														}`}
													>
														Sign out
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							<Disclosure.Button
								as="a"
								href={`item.href`}
								className="first:block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-100 hover:text-blue focus:text-blue"
								aria-current={false ? "page" : undefined}
							>
								Dashboard
							</Disclosure.Button>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	) : (
		<>Loading</>
	);
};
