import { LogIn } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  // const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(BASE_URL + "/login", { email, password }, { withCredentials: true })
      console.log(res)
      // navigate(`/${role}`)

      console.log({
        email,
        password,

      });
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-50 justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold ml-2">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div>
            <label className="block text-base font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div> */}


          <div>
            <label className="block text-base font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
