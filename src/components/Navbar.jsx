import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className=" bg-gray-800 py-4 text-xl font-semibold flex justify-between items-center px-16 border-b-4 border-gray-200 w-full text-white">
      <div className="transition-all  hover:text-teal-400 cursor-pointer ">
        Logo
      </div>

      {menuOpen ? (
        <div
          className={`h-screen fixed top-0 right-0 bg-[rgba(30,47,63,0.7)] backdrop-blur-[20px] w-[30vw] flex justify-start flex-col items-center gap-8 p-16 slide-left `}
        >
          <div
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <X />
          </div>
          <p className="transition-all  hover:text-teal-400 cursor-pointer">
            Home
          </p>
          <p className="transition-all  hover:text-teal-400 cursor-pointer">
            About
          </p>
          <p className="transition-all  hover:text-teal-400 cursor-pointer">
            Contact
          </p>
          <p className="transition-all  hover:text-teal-400 cursor-pointer">
            Api
          </p>
          <button
            className={`hidden md:block transition-all  hover:text-teal-400 cursor-pointer`}
          >
            Login
          </button>
        </div>
      ) : (
        <div
          className={`hidden md:flex gap-5 w-[30%] justify-between items-center `}
        >
          <p className="transition-all  hover:text-teal-400 cursor-pointer">
            Home
          </p>
          <p className="transition-all  hover:text-teal-400 cursor-pointer">
            About
          </p>
          <p className="transition-all  hover:text-teal-400 cursor-pointer">
            Contact
          </p>
          <p className="transition-all  hover:text-teal-400 cursor-pointer">
            Api
          </p>
        </div>
      )}

      <div
        className={`hidden md:block transition-all  hover:text-teal-400 cursor-pointer`}
      >
        Login
      </div>
      <div
        className="md:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
