import Todo from '../models/Todo.js'

export const updateTodo = async (req, res) => {

  const { id } = req.params;
  const { todoContent } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { todoContent, updatedAt: Date.now() }
    )

    res.status(200).json({
      success: true,
      message: "Todo updated.",
      data: todo
    })
  }

  catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Failed to update Todo."
    })
  }
}