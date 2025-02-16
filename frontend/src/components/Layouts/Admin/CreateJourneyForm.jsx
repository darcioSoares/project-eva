import { useState, useEffect } from "react";
import axios from "axios";

const CreateJourneyForm = () => {
  const [formData, setFormData] = useState({
    activity: "",
    description: "",
    employeeId: "",
    email_employee: "",
    startDate: "",
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        setEmployees(response.data);
      } catch (err) {
        console.error("Erro ao buscar colaboradores:", err);
        setError("Erro ao carregar os colaboradores");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmployeeChange = (e) => {
    const selectedEmployee = employees.find(emp => emp._id === e.target.value);
    setFormData({
      ...formData,
      employeeId: e.target.value,
      email_employee: selectedEmployee ? selectedEmployee.email : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData.startDate,)
  
    const payload = {
      activity: formData.activity,
      description: formData.description,
      employeeId: formData.employeeId,
      email_employee: formData.email_employee,
      startDate: formData.startDate,
    };
  
    try {
      const response = await axios.post("http://localhost:3000/journeys", payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      alert("Jornada criada com sucesso!");
      console.log("Resposta do servidor:", response.data);
      
      setFormData({
        activity: "",
        description: "",
        employeeId: "",
        email_employee: "",
        startDate: "",
      });
  
    } catch (error) {
      console.error("Erro ao criar jornada:", error);
      alert("Erro ao cadastrar jornada.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Criar Jornada</h2>

      {loading ? (
        <p className="text-center text-gray-600">Carregando colaboradores...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-gray-700">Atividade</label>
        <select
          required
          name="activity"
          value={formData.activity}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >        <option value="">Selecione uma atividade</option>
                  <option value="Reunião">Reunião</option>
                  <option value="Treinamento">Treinamento</option>
                  <option value="Visita a Clientes">Visita a Clientes</option>
                  <option value="Apresentação de Projeto">Apresentação de Projeto</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

          <div>
            <label className="block text-gray-700">Descrição</label>
            <textarea
              maxLength="40"
              required
              name="description"
              placeholder="Descrição da atividade"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Colaborador</label>
            <select
              required
              name="employeeId"
              value={formData.employeeId}
              onChange={handleEmployeeChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Selecione um colaborador</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">E-mail do Colaborador</label>
            <input
              required
              type="email"
              name="email_employee"
              value={formData.email_employee}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700">Data de Início</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={(e) => {
                const selectedDateString = e.target.value; // Mantém a data como string YYYY-MM-DD
                const todayString = new Date().toISOString().split("T")[0]; // Data de hoje YYYY-MM-DD

                const today = new Date(todayString);
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1); // Define "ontem"

                if (selectedDateString >= yesterday.toISOString().split("T")[0]) {
                  // Se a data for válida, mantém exatamente o valor do input
                  setFormData({ ...formData, startDate: selectedDateString });
                } else {
                  alert("A data de início só pode ser hoje ou até um dia antes!");
                  e.target.value = ""; // Limpa o campo se for inválido
                }
              }}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Criar Jornada
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateJourneyForm;
