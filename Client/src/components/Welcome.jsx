import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      navigate("/todos");
    }
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-tl from-[#071f35] via-[#0e426c] to-[#071f35] px-10">
      <div className="p-16 px-10 md:p-20 bg-[rgba(7,31,53,0.5)] rounded-xl border-2 border-[#3cadf460] flex justify-center items-center flex-col gap-8">
        <h1 className="text-2xl md:text-4xl font-semibold text-[#80c9f9] ">
          Welcome to Todo App
        </h1>
        <button
          className="bg-gradient-to-l from-[#1393e4] to-[#0674c3] font-semibold px-16 py-1 rounded-lg text-base md:text-lg text-[#071f35]"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Welcome;
