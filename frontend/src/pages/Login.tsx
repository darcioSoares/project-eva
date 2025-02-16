import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../../src/components/Utility/Eye";
import image from "../assets/people-as6hd9.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("teste@email.com");
  const [password, setPassword] = useState("123456");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const eventEye = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", password);
 
    navigate("/dash");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="md:w-1/2">
          <img src={image} alt="Login Illustration" className="w-full h-full object-cover" />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">Senha</label>
              <div className="flex items-center">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Eye event={eventEye} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
