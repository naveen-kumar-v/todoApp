import Todo from '../models/Todo.js'

export const getTodo = async (req, res) => {
  try {
    let userId = req.headers.userid;
    // console.log(req.headers.userid);
    const todos = await Todo.find({ userId })
    res.status(200).json({
      success: true,
      message: "All todos fetched.",
      data: todos,
    })
  }
  catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: err.message
    });
  }
}

export const getTodoById = async (req, res) => {
  try {
    let id = req.params.id;
    let { userId } = req.body;

    const todo = await Todo.findById({ _id: id, userId: userId });

    //if no todos found for the given id
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `No todo found for the given Id ${id}`
      })
    }

    //if todo found
    res.status(200).json({
      success: true,
      message: `Todo with id ${id} is found.`,
      data: todo
    })
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}