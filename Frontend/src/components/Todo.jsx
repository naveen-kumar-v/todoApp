import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import CustomButton from "./CustomButton.jsx";
import { Trash2, SquarePen } from "lucide-react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [body, setBody] = useState({
    title: "",
    description: "",
  });
  const [edit, setEdit] = useState(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const headers = { "Content-Type": "application/json" };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setBody((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  //create Todo
  const createTodo = async () => {
    try {
      const resp = await axios.post(`${baseUrl}/createTodo`, body, { headers });
      console.log(resp.data.data);
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
    console.log(body);
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
  useEffect(() => {
    getTodos();
  }, []);

  const resetValues = () => {
    setBody({
      title: "",
      description: "",
    });
  };
  const handleEdit = (todo) => {
    setEdit(todo);
    setBody({
      title: todo.title,
      description: todo.description,
    });
  };

  const isEmpty = body.title === "" || body.description === "";

  const formatTime = (time) => {
    return format(time, "hh:mm aa, dd/MMM/yyyy", {
      timezone: "Asia/kolkata",
    });
  };

  const isSame = () => {
    if (edit) {
      return edit.title === body.title && edit.description === body.description;
    }
    return false; // If edit is null, it's not the same
  };

  return (
    <div className="bg-[#071f35] w-screen h-screen flex justify-center items-center ">
      <div className="text-white bg-[#073642] px-8 py-6 rounded-lg border-2 border-[#839496] flex flex-col justify-start items-center gap-4">
        <h1 className="text-center font-bold">Todo App</h1>

        {/* Create todo */}
        <div className="flex items-center flex-col gap-4 mt-4 border-b-2 pb-4 border-gray-400">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="bg-[rgba(255,255,255,0.1)] rounded focus:outline-none focus:border-none px-1.5 py-0.5 h-auto w-[24rem]"
            maxLength={20}
            value={body.title}
            onChange={onChange}
          />

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="2"
            maxLength={50}
            value={body.description}
            placeholder="Description"
            className="bg-[rgba(255,255,255,0.1)] rounded focus:outline-none focus:border-none px-1.5 py-0.5 h-auto w-[24rem]"
            onChange={onChange}
          ></textarea>

          {/* buttons */}
          <div className="flex gap-4 w-full">
            {edit ? (
              <>
                <CustomButton
                  onClick={() => {
                    setEdit(null);
                    resetValues();
                  }}
                  bgColor={`red`}
                  text="Cancel"
                  isEmpty={false}
                />
                <CustomButton
                  onClick={updateTodo}
                  bgColor={`green`}
                  text="Update Todo"
                  isEmpty={isSame()}
                />
              </>
            ) : (
              <>
                <CustomButton
                  onClick={resetValues}
                  bgColor={`blue`}
                  text="Clear"
                  isEmpty={isEmpty}
                />
                <CustomButton
                  onClick={createTodo}
                  bgColor={`green`}
                  text="Add Todo"
                  isEmpty={isEmpty}
                />
              </>
            )}
          </div>
        </div>

        {/* display todos */}
        {todos.length ? (
          <div
            className={`w-full flex flex-col gap-2 max-h-48 overflow-y-auto ${
              edit &&
              "backdrop-blur-4xl bg-[rgba(255,255,255,0.1)] pointer-events-none"
            }`}
          >
            {todos.map((todo) => {
              return (
                <div
                  key={todo._id}
                  className="w-full max-w-96 bg-[rgba(255,255,255,0.1)] p-2 rounded relative group"
                >
                  <h1 className="text-orange-600 text-[1.3rem] font-semibold">
                    {todo.title}
                  </h1>
                  <div className="leading-[1.35rem] text-[0.95rem] max-w-80 pb-1 mb-4 border-b-[1px] border-gray-500">
                    {todo.description}
                  </div>

                  {todo.createdAt !== todo.updatedAt ? (
                    <p className="text-[0.6rem] font-medium italic text-gray-400 mt-1  pt-0.5 absolute right-4 bottom-1">
                      Updated At : {formatTime(todo.updatedAt)}
                    </p>
                  ) : (
                    <p className="text-[0.6rem] font-medium italic text-gray-400 mt-1  pt-0.5 absolute right-4 bottom-1">
                      Created At : {formatTime(todo.createdAt)}
                    </p>
                  )}

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
