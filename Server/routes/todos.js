import { Router } from 'express';
import { createTodo } from '../controllers/createTodo.js'
import { getTodo, getTodoById } from '../controllers/getTodo.js'
import { updateTodo } from '../controllers/updateTodo.js'
import { deleteTodo } from '../controllers/deleteTodo.js'
import { finishTodo } from '../controllers/finishTodo.js'
import { login } from '../controllers/login.js'
import { signUp } from '../controllers/signUp.js'

//post todo request
let TodoRoute = Router();

TodoRoute.post("/login", login);
TodoRoute.post("/signup", signUp);
TodoRoute.post("/createTodo", createTodo);
TodoRoute.get("/getTodos", getTodo);
TodoRoute.get("/getTodos/:id", getTodoById);
TodoRoute.put("/updateTodo/:id", updateTodo);
TodoRoute.put("/finishTodo/:id", finishTodo);
TodoRoute.delete("/deleteTodo/:id", deleteTodo);

export default TodoRoute;