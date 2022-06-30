

// store
import { store } from "store/store";

// React Router
import { Routes, Route, Navigate } from "react-router-dom";
import { Sign } from 'views/Sign';
import { ForgotPassword } from 'views/ForgotPassword';
import { ResetPassword } from 'views/ResetPassword';
import { Provider } from 'react-redux';
import { PrivateRoute } from 'routes/PrivateRoute';
import { Dashboard } from 'views/Dashboard';
import { Employees } from 'views/Employees';
import { Customers } from 'views/Customers';
import { CustomersReference } from 'views/CustomersReference';
import { InsuranceCompanies } from 'views/InsuranceCompanies';
import { Main } from 'views/Main';
import { Error } from "views/Error";

function App() {

  return (
    <div className="h-screen">
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
            <Route path="/customers_reference" element={<CustomersReference />} />
            <Route path="/insurance_companies" element={<InsuranceCompanies />} />
          </Route>

          {/* public routes */}
          <Route path="/reset/password" element={<ResetPassword />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Not Found  */}
          <Route
            path="*"
            element={
              <Error title="not found" description="The page you was looking for was not found on this server" code={404} />
            }
          />

        </Routes>
      </Provider>
    </div>

  );
}

export default App;
