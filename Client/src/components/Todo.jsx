import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Trash2, SquarePen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name").split(" ")[0] || "Guest";
  const [todos, setTodos] = useState([]);
  const [body, setBody] = useState({
    todoContent: "",
    userId,
  });
  const [edit, setEdit] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, []);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const headers = { "Content-Type": "application/json", userId: userId };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBody((prevValue) => ({
      ...prevValue,
      [name]: value,
      userId,
    }));
  };

  //create Todo
  const createTodo = async () => {
    try {
      const resp = await axios.post(`${baseUrl}/createTodo`, body, { headers });
      // console.log(resp.data.data);
      toast.success(resp.data.message);
      resetValues();
      getTodos();
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  //update Todo
  const updateTodo = async () => {
    console.log(`${baseUrl}/updateTodo/${edit}`);
    try {
      const resp = await axios.put(`${baseUrl}/updateTodo/${edit._id}`, body, {
        headers,
      });
      console.log(resp.data.data);
      toast.success(resp.data.message);
      resetValues();
      getTodos();
      setEdit(null);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  //getTodos
  const getTodos = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/getTodos`, { headers });
      // console.log(resp.data.data);
      setTodos(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //deleteTodo
  const deleteTodo = async (id) => {
    try {
      const resp = await axios.delete(`${baseUrl}/deleteTodo/${id}`, {
        headers,
      });
      toast.success(resp.data.message);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  //mark as completed
  const markAsCompleted = async (id) => {
    try {
      const resp = await axios.put(
        `${baseUrl}/finishTodo/${id}`,
        { finished: !todos.find((todo) => todo._id === id).finished },
        {
          headers,
        }
      );
      toast.success(resp.data.message);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const resetValues = () => {
    setBody({
      todoContent: "",
      userId,
    });
  };
  const handleEdit = (todo) => {
    setEdit(todo);
    setBody({
      todoContent: todo.todoContent,
    });
  };

  const isEmpty = body.todoContent === "";

  const formatTime = (time) => {
    return format(time, "hh:mm aa, dd/MMM/yyyy", {
      timezone: "Asia/kolkata",
    });
  };

  const isSame = () => {
    if (edit) {
      return edit.todoContent === body.todoContent;
    }
    return false; // If edit is null, it's not the same
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <div className="bg-gradient-to-tl from-[rgb(7,31,53)] via-[#0e426c] to-[#071f35] h-screen flex md:justify-center justify-start items-center relative flex-col">
      <div className="absolute top-4 w-full text-white font-bold sm:text-xl flex gap-2 items-center justify-between p-2 px-6 md:px-12 rounded-lg text-lg">
        <p>
          Hello,{" "}
          <span className="bg-gradient-to-r from-[#3cadf4] via-[#f0f8ff] to-[#3cadf4] text-transparent bg-clip-text capitalize">
            {name}
          </span>
        </p>
        <button
          className=" transition-all text-white font-semibold flex gap-2 items-center hover:bg-[#154c5a] p-2 px-6 rounded-lg"
          onClick={handleLogout}
        >
          <LogOut size={20} color="#ffffff" />
          <p className="text-lg sm:text-xl">Logout</p>
        </button>
      </div>
      <div className="text-white bg-[#073642] px-8 py-4 md:mt-12 rounded-lg border-2 border-[#839496] flex flex-col justify-start items-center gap-4  w-[21rem] md:w-[30rem] mt-28">
        <h1 className="text-center font-bold text-2xl">Todo App</h1>

        {/* Create todo */}
        <div className="flex items-center flex-col gap-4 mt-4 pb-2">
          <textarea
            name="todoContent"
            id="todoContent"
            cols="30"
            rows="3"
            maxLength={100}
            value={body.todoContent}
            placeholder="Add a todo..."
            className="bg-[rgba(255,255,255,0.1)] rounded focus:outline-none px-1.5 py-0.5 h-auto w-[17rem] md:w-[25.5rem] border-2 border-transparent focus:border-[#0a4f82] resize-none"
            onChange={onChange}
          ></textarea>

          {/* buttons */}
          <div className="flex gap-4 w-full">
            {edit ? (
              <>
                <button
                  className="transition-all 
                  bg-gradient-to-t from-[#f00000] to-[#ff2323] 
                  hover:bg-gradient-to-t hover:from-[#d70000] hover:to-[#f00000]
                  active:bg-gradient-to-t active:from-[#b10303] active:to-[#d70000]
                  px-3.5 text-white py-1 rounded font-semibold w-full disabled:opacity-80
                              disabled:pointer-events-none"
                  onClick={() => {
                    setEdit(null);
                    resetValues();
                  }}
                  disabled={isEmpty}
                >
                  Cancel
                </button>

                <button
                  className="transition-all bg-gradient-to-t from-[#21df67] to-[#22c55e]
                  hover:bg-gradient-to-t hover:from-[#259e52] hover:to-[#16a34a]
                  active:bg-gradient-to-t active:from-[#15803c] active:to-[#166533]
                  disabled:bg-gradient-to-t disabled:from-[#dcfce8] disabled:to-[#dcfce8]
                  disabled:text-[#4ade81] text-[#052e14]
                  px-3.5 py-1 rounded font-semibold active:bg-green-600 w-full disabled:opacity-80
                              disabled:pointer-events-none"
                  onClick={updateTodo}
                  disabled={isSame()}
                >
                  Update Todo
                </button>
              </>
            ) : (
              <>
                <button
                  className="transition-all bg-gradient-to-t from-[#21df67] to-[#22c55e] px-3.5 py-1 rounded font-semibold text-[#052e14] 
                  hover:bg-gradient-to-t hover:from-[#259e52] hover:to-[#16a34a]
                  active:bg-gradient-to-t active:from-[#15803c] active:to-[#166533]
                  w-full disabled:bg-gradient-to-t disabled:from-[#dcfce8] disabled:to-[#dcfce8] disabled:text-[#4ade81] disabled:opacity-80
                              disabled:pointer-events-none"
                  onClick={createTodo}
                  disabled={isEmpty}
                >
                  Add Todo
                </button>
              </>
            )}
          </div>
        </div>

        <div className="w-full flex gap-2 items-center justify-center">
          <p className="h-[2px] bg-gray-300 flex-1"></p>
          <p className="">My todos</p>
          <p className="h-0.5 bg-gray-300 flex-1"></p>
        </div>

        {/* display todos */}
        {todos.length ? (
          <div
            className={`w-full flex flex-col gap-2 max-h-64 overflow-y-auto ${
              edit &&
              "backdrop-blur-4xl bg-[rgba(255,255,255,0.1)] pointer-events-none"
            }`}
          >
            {todos.map((todo) => {
              return (
                <div
                  key={todo._id}
                  className={`w-full bg-[rgba(255,255,255,0.1)] p-2 rounded relative group ${
                    todo.finished ? "opacity-80" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center me-4 mb-4">
                    <input
                      id="checkbox"
                      type="checkbox"
                      checked={todo.finished}
                      className={`w-5 h-5 rounded cursor-pointer ${
                        todo.finished
                          ? "bg-green-600 border-transparent"
                          : "bg-transparent border-green-600"
                      }`}
                      onChange={() => {
                        markAsCompleted(todo._id);
                      }}
                    />
                    <p
                      // htmlFor="checkbox"
                      className={`ms-2 text-sm md:text-[0.95rem] max-w-[75%] pb-1 font-medium text-gray-900 dark:text-gray-300 ${
                        todo.finished && "line-through"
                      }`}
                    >
                      {todo.todoContent}
                    </p>
                  </div>

                  <p className="text-[0.75rem] font-medium italic text-gray-100 mt-1  pt-0.5 absolute right-4 bottom-1">
                    {todo.finished ? (
                      `Completed At : ${formatTime(todo?.completedAt)}`
                    ) : (
                      <>
                        {todo.createdAt === todo.updatedAt
                          ? `Created At : ${formatTime(todo.createdAt)}`
                          : `Updated At : ${formatTime(todo.updatedAt)}`}
                      </>
                    )}
                  </p>

                  <div className="absolute hidden gap-3 items-center right-2 top-2 group-hover:flex">
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="hover:scale-110 "
                    >
                      <Trash2 color="#fff" strokeWidth={1.5} size={20} />
                    </button>
                    <button
                      onClick={() => handleEdit(todo)}
                      className="hover:scale-110 "
                    >
                      <SquarePen size={18} color="#ffffff" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 font-semibold">No todos to show...</div>
        )}
      </div>
    </div>
  );
};

export default Todo;
