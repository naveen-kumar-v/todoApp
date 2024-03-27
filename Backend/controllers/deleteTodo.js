import Todo from '../models/Todo.js';

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete({ _id: id })

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete Todo",
      data: todo
    })
  }
}