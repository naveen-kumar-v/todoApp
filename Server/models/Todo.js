import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {

    todoContent: {
      type: String,
      required: true,
      maxLength: 150,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    finished: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true
    }
  }
)

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;