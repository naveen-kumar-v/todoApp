import { Router } from 'express';
import { createTodo } from '../controllers/createTodo.js'
import { getTodo, getTodoById } from '../controllers/getTodo.js'
import { updateTodo } from '../controllers/updateTodo.js'
import { deleteTodo } from '../controllers/deleteTodo.js'

//post todo request
let TodoRoute = Router();

TodoRoute.post("/createTodo", createTodo);
TodoRoute.get("/getTodos", getTodo);
TodoRoute.get("/getTodos/:id", getTodoById);
TodoRoute.put("/updateTodo/:id", updateTodo);
TodoRoute.delete("/deleteTodo/:id", deleteTodo);

export default TodoRoute;