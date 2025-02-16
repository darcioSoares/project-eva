import { useState } from "react";
import axios from "axios";

const CreateEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3000/employees", formData, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },       
      });
  
      console.log("Resposta do servidor:", response.data.status);
      alert("Colaborador cadastrado com sucesso!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
      });
      
    } catch (error) {
      console.error("Erro ao enviar dados:", error.response ? error.response.data : error.message);
      alert(`${error.response.data.error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Criar Colaborador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nome</label>
          <input
            required
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">E-mail</label>
          <input
            required
            type="email"
            name="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Telefone</label>
          <input         
            required
            type="tel"
            name="phone"
            placeholder="+5511999999999"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Cargo</label>
          <input
            required
            type="text"
            name="position"
            placeholder="Software Engineer"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Criar Colaborador
        </button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
