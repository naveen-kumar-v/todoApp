import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Auth = () => {
  const [body, setBody] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  // const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const headers = { "Content-Type": "application/json" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const allfieldsFilled =
    body.email &&
    validateEmail(body.email) &&
    body.password &&
    body.password.length >= 8;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = activeTab === "login" ? "/login" : "/signup";
      const resp = await axios.post(`${baseUrl}${url}`, body, { headers });
      localStorage.setItem("userId", resp.data.data.id);
      localStorage.setItem("name", resp.data.data.name);
      toast.success(resp.data.message);
      navigate("/todos");
    } catch (err) {
      console.error(err.response);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-tl from-[#071f35] via-[#0e426c] to-[#071f35] w-screen h-screen flex justify-center items-start md:items-center pt-20 md:p-4 ">
      <div className="text-white bg-[rgba(7,31,53,0.3)] px-8 md:px-20 py-10 rounded-lg border-2 border-[#839496af] flex flex-col justify-start items-center gap-4">
        <div className="flex w-full justify-evenly items-center bg-[#1b4b57] p-1 rounded-xl mb-2">
          <button
            className={` rounded-lg py-2 flex-1 transition-all ${
              activeTab !== "login"
                ? "opacity-60 bg-[#1b4b57] border-transparent"
                : "bg-[#073642] font-bold"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={` rounded-lg py-2 flex-1 transition-all ${
              activeTab !== "signup"
                ? "opacity-60 bg-[#1b4b57] "
                : " bg-[#073642] font-bold"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="flex justify-center items-center gap-4 flex-col"
        >
          {activeTab === "signup" && (
            <div className="flex w-full justify-between items-center">
              <label htmlFor="name" name="name" className="font-bold">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Bhupendra Jogi"
                className="rounded p-1 border-2 focus:border-green-500 text-black focus:outline-0"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="flex w-full justify-between items-center">
            <label htmlFor="email" name="email" className="font-bold">
              Email
            </label>
            <input
              type="text"
              name="email"
              required
              placeholder="abc@xyz.com"
              className="rounded p-1 border-2 focus:border-green-500 text-black focus:outline-0 "
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full justify-between items-center gap-4 relative">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              required
              className="rounded p-1 border-2 focus:border-green-500 text-black focus:outline-0"
              onChange={handleChange}
            />
            <div
              className="absolute right-2 cursor-pointer bg-white"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? (
                <EyeOff size={20} color="#5c5c5c" />
              ) : (
                <Eye size={20} color="#5c5c5c" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`bg-green-600 rounded w-full py-1 font-bold mt-2 ${
              !allfieldsFilled ? "opacity-60" : "opacity-100"
            }`}
            onClick={handleFormSubmit}
            disabled={!allfieldsFilled}
          >
            {activeTab === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};
