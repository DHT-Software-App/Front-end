import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { SignView } from "./views/Sign";
import { EmployeesView } from "./views/Employees";
import { DashboardView } from "./views/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./views/Layout";
import { NewAccountView } from "views/NewAccount";
import { ProtectedRoute } from "routes/ProtectedRoute";
import { ProfileView } from "views/Profile";
import { RestoreByEmailView } from "views/RestoreByEmail";

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Routes>
					{/* protected routes */}
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Layout />
							</ProtectedRoute>
						}
					>
						<Route index element={<DashboardView />} />
						<Route path="/dashboard" element={<Navigate to="/" />} />
						<Route path="/employees" element={<EmployeesView />} />
						<Route path="/profile/:profileId" element={<ProfileView />} />
						<Route path="/restore/send" element={<RestoreByEmailView />} />
					</Route>

					{/* public routes */}
					<Route path="/sign" element={<SignView />} />
					<Route path="/new/password/:token" element={<NewAccountView />} />
				</Routes>
			</Provider>
		</div>
	);
}

export default App;
