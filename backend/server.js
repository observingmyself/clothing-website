import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoute from "./routes/contactRoute.js";
import { checkoutController } from "./controllers/checkoutController.js";
import path from 'path'

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/contact",contactRoute)
app.use("/api/v1/checkout",checkoutController)

// --------------------------deployment
const _dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(_dirname1,"/client/build")));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(_dirname1,"client","build","index.html"))
})

}else{
  app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
  });
}
// --------------------------deployment

//rest api



//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
      .white
  );
});
