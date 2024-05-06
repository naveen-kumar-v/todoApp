import Todo from '../models/Todo.js'

export const createTodo = async (req, res) => {
  try {
    // Extract title and desc from the request body
    const { todoContent, userId } = req.body;

    // Create a new todo object and insert it into the DB
    const newTodo = await Todo.create({ todoContent, userId });

    // Send a JSON response with success flag
    res.status(200).json({
      success: true,
      data: newTodo,
      message: "Todo created successfully."
    });
  }
  catch (err) {
    console.log("error:", err);

    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: err.message
    });
  }
};