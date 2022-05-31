import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { SignView } from "./views/Sign";
import { EmployeesView } from "./views/Employees";
import { DashboardView } from "./views/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./views/Layout";
import { NewPasswordView } from "views/NewPassword";
import { ProtectedRoute } from "routes/ProtectedRoute";
import { ProfileView } from "views/Profile";
import { ForgotPasswordView } from "views/ForgotPassword";

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
					</Route>

					{/* public routes */}
					<Route path="/new/password/:token" element={<NewPasswordView />} />
					<Route path="/sign" element={<SignView />} />
					<Route path="/forgot-password" element={<ForgotPasswordView />} />
				</Routes>
			</Provider>
		</div>
	);
}

export default App;
