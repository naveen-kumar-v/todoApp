import mongoose from "mongoose";
import 'dotenv/config';

export const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected succesfully"))
    .catch((err) => {
      console.log("Error : ", err)
      process.exit();
    })
} 
