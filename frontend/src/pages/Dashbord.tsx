import { Link, Route, Routes } from "react-router-dom";
import CreateEmployeeForm from "../components/Layouts/Admin/CreateEmployeeForm";
import CreateJourneyForm from "../components/Layouts/Admin/CreateJourneyForm";
import JourneyList from "../components/Layouts/Admin/JourneyList";
import Login from './Login'

const Dashboard = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Painel Administrativo Eva</h2>
   
      <nav className="mb-4">
        <ul className="flex space-x-6">
          <li>
            <Link to="/dash/employees" className="text-blue-500 hover:underline">Criar Colaborador</Link>
          </li>
          <li>
            <Link to="/dash/journeys/create" className="text-blue-500 hover:underline">Criar Jornada</Link>
          </li>
          <li>
            <Link to="/dash/journeys" className="text-blue-500 hover:underline">Listar Jornadas</Link>
          </li>
          <li>
            <Link to="/" className="text-blue-500 hover:underline">Sair</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="employees" element={<CreateEmployeeForm />} />
        <Route path="journeys/create" element={<CreateJourneyForm />} />
        <Route path="journeys" element={<JourneyList />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
