import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashbord";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = true;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de Login */}
        <Route path="/" element={<Login />} />

        <Route
          path="/dash/*"
          element={
            <Dashboard /> 
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
