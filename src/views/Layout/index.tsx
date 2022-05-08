import { Outlet } from "react-router-dom";
import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";
import { SideBar } from "../../layouts/SideBar";

export const Layout = () => {
	return (
		<div className="flex w-full font-sans text-gray-900 bg-gray-50">
			<div>
				<SideBar />
			</div>
			<div className="flex flex-col flex-grow min-w-0 max-h-screen overflow-auto">
				<Header />
				<Outlet />
				<Footer />
			</div>
		</div>
	);
};
