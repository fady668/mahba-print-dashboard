import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Notfound from "./Pages/Notfound";
import ProtectedRoute from "./Componants/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import Logout from "./Pages/Logout";
import Main from "./Pages/Main";
import Clients from "./Pages/Clients";
import Invoises from "./Pages/Invoises";
import ReceivedCash from "./Pages/ReceivedCash";
import Additionals from "./Pages/Additionals";
import Kashf from "./Pages/Kashf";
import Stat from "./Pages/Stat";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Main />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/invoises/:id" element={<Invoises />} />
          <Route path="/receivedcash/:id" element={<ReceivedCash />} />
          <Route path="/additionals/:id" element={<Additionals />} />
          <Route path="/kashf" element={<Kashf />} />
          <Route path="/stat" element={<Stat />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
