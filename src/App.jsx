import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Layout/ProtectedRoute";
import Layout from "./Layout/Layout";
import DashboardScreen from "./features/dashboard/screens/DashboardScreen";
import PartnerListScreen from "./features/dashboard/screens/PartnerListScreen";
import AddEmployeScreen from "./features/dashboard/screens/AddEmployeScreen";
import WithdrawRequestScreen from "./features/dashboard/screens/WithdrawRequestScreen";
import AttendaceScreen from "./features/dashboard/screens/AttendaceScreen";
import Login from "./features/auth/screens/LoginScreen";
import PaymentIssuse from "./features/verification/screens/PaymentIssuse";
import TrackingEmployeeDashboard from "./features/tracking/screens/TrackingEmployeeDashboard";
import RideTracking from "./features/tracking/screens/RideTracking";
import CallCenterDashboard from "./features/support/screens/CallCenterDashboard";
import CallcentereTickets from "./features/support/screens/CallcentereTickets";
import CallcentereLiveChat from "./features/support/screens/CallcentereLiveChat";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
          <Route element={<Layout />}>
            <Route path="/withdraws" element={<WithdrawRequestScreen />} />
          </Route>
        </Route>
        <Route
          element={
            <ProtectedRoute allowedRoles={["manager", "verificationTeam"]} />
          }
        >
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/partner-list" element={<PartnerListScreen />} />
            <Route path="/employe-list" element={<AddEmployeScreen />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["verificationTeam"]} />}>
          <Route element={<Layout />}>
            <Route path="/withdraws" element={<WithdrawRequestScreen />} />
            <Route path="/payment-issuse" element={<PaymentIssuse />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["monitoring"]} />}>
          <Route element={<Layout />}>
            <Route
              path="/tracking-employee"
              element={<TrackingEmployeeDashboard />}
            />
            <Route path="/ride-tracking" element={<RideTracking />} />
          </Route>
        </Route>

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                "verificationTeam",
                "manager",
                "monitoring",
                "support",
              ]}
            />
          }
        >
          <Route element={<Layout />}>
            <Route path="/attendace" element={<AttendaceScreen />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["support"]} />}>
          <Route element={<Layout />}>
            {/* <Route path="/call-employee" element={<CallCenterDashboard />} /> */}
            {/* <Route path="/tickets" element={<CallcentereTickets />} /> */}
            <Route path="/live-chat" element={<CallcentereLiveChat />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
