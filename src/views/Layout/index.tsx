import { me_auth_request } from "actions/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Footer } from "layouts/Footer";
import { Header } from "layouts/Header";
import { SideBar } from "layouts/SideBar";

export const Layout = () => {
	const { auth: token } = useSelector(({ auth }: any) => auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			dispatch(me_auth_request(token));
		}
	}, [token]);

	return (
		<div className="flex w-full font-sans text-gray-900 bg-gray-50">
			<div className="flex flex-col flex-grow min-w-0 max-h-screen overflow-auto">
				<Header />
				<SideBar />
				<Outlet />
				<Footer />
			</div>
		</div>
	);
};
