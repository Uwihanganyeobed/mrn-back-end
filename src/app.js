import express from "express";
import bookRoutes from './routes/bookRoutes.js'
import authRoutes from './routes/userRoutes.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
//health check route
app.get("/", (req, res) => {
  res.send("Welcome to the Book Management APIs");
});
// Routes
app.use('/auth/',authRoutes)
app.use('/books/',bookRoutes)

export default app