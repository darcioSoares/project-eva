import { useEffect, useState } from "react";
import axios from "axios";

const JourneyList = () => {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await axios.get("http://localhost:3000/journeys");
        setJourneys(response.data); 
      } catch (err) {
        console.error("Erro ao buscar jornadas:", err);
        setError("Erro ao carregar as jornadas");
      } finally {
        setLoading(false);
      }
    };

    fetchJourneys();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Jornadas</h2>
      {journeys.length === 0 ? (
        <p className="text-center text-gray-600">Nenhuma jornada encontrada.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Atividade</th>
                <th className="border p-2">Descrição</th>
                <th className="border p-2">E-mail</th>
                <th className="border p-2"> Início da Atividade </th>
                <th className="border p-2">Conclusão</th>
              </tr>
            </thead>
            <tbody>
            {journeys.map((journey) => (
              <tr key={journey._id} className="hover:bg-gray-50">
                <td className="border p-2">{journey.activity}</td>
                <td className="border p-2">{journey.description}</td>
                <td className="border p-2">{journey.email_employee}</td>
                <td className="border p-2">
                  {journey.startDate ? journey.startDate.substring(0, 10) : "Sem data"}
                </td>
                <td className="border p-2">
                  {journey.completedAt
                    ? journey.completedAt.substring(0, 10)
                    : "Aguardando"}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JourneyList;
