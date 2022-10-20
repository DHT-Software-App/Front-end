import { Provider } from "react-redux";
import { store } from "./store/store";
import { Sign } from "./views/Sign";
import { Employees } from "./views/Employees";
import { Dashboard } from "./views/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { Main } from "./views/Main";
import { NewPassword } from "views/NewPassword";
import { PrivateRoute } from "routes/PrivateRoute";
import { ForgotPassword } from "views/ForgotPassword";
import { Customers } from "views/Customers";
import { Clients } from "views/Clients";
import { InsuranceCompanies } from "views/InsuranceCompanies";
import { Error } from "views/Error";
import { Appointments } from "views/Appointments";
import { Jobs } from "views/Jobs";
import { Documents } from "views/Documents";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          {/* protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Navigate to="/" />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/clients_reference" element={<Clients />} />
            <Route path="/insurance_companies" element={<InsuranceCompanies />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/documents" element={<Documents />} />
          </Route>

          {/* public routes */}
          <Route path="/new/password/:token" element={<NewPassword />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="*" element={<Error code={404} description="This page is not available." title="Not found" />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
