import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
  
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    }
   
  },
);

const Product = mongoose.model("user", user);
export default Product
