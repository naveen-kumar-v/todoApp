import Todo from '../models/Todo.js'

export const finishTodo = async (req, res) => {

  const { id } = req.params;
  const { finished } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { finished, completedAt: Date.now() }
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